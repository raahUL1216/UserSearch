import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import UserSuggestionCards from '../UserSuggestionCards/UserSuggestionCards'
import { Constants } from '../../common/Constants'

const SearchContainer = () => {
	const history = useHistory();

	// state for input search terma and user search suggestions
	const [userSearch, setUserSearchDetails] = useState({
		searchText: '',
		searchSuggestions: []
	})

	const searchUsers = async (event, searchText) => {
		const searchTerm = event.target?.value?.trim() || searchText;

		setUserSearchDetails({
			...userSearch,
			searchText: searchTerm,
		})

		// back end api to search users
		await getUsers(searchTerm);
	}

	const getUsers = async (searchTerm) => {
		const searchAPIURI = Constants.searchAPI + "search-users/?searchTerm=" + searchTerm,
			headers = Constants.headers;

		if (searchTerm) {
			await fetch(searchAPIURI, { headers })
				.then(res => res.json())
				.then(
					(result) => {
						result = prepareMarkpupData(result);

						// Update the prepared markup
						if (result.length > 0) {
							setUserSearchDetails({
								...userSearch,
								searchText: searchTerm,
								searchSuggestions: result
							});
						}
					},
					(error) => {
						console.log(error);
					});
		} else {
			// when input is empty, remove suggestions
			setUserSearchDetails({
				...userSearch,
				searchText: '',
				searchSuggestions: []
			});
		}
	}

	const prepareMarkpupData = (result) => {
		result.forEach(suggestion => {
			Object.keys(suggestion).forEach(fieldName => {
				suggestion.highlights.forEach((highlight) => {
					// prepare mark up for fields other than items
					if (fieldName !== 'items' && highlight.path === fieldName) {
						let texts = highlight.texts;
						let replacements = texts.map(text => {
							const matchedValue = `<span class="word-found"> ${text.value} </span>`;

							if (text.type === "hit") {
								return matchedValue;
							} else {
								return text.value;
							}
						}).join("");

						let originals = texts.map(text => {
							return text.value;
						}).join("");

						suggestion[fieldName] = suggestion[fieldName].replace(originals, replacements)
					} else if (fieldName === 'items' && highlight.path === fieldName) {
						// prepare mark up for field items
						let texts = highlight.texts;
						let itemField = texts.reduce((acc, text) => {
							if (text.type === 'hit') {
								acc = `"${text.value}" found in items.`;
							} else {
								acc = '';
							}
							return acc;
						}, '');

						suggestion['itemSearch'] = itemField;
					}
				});
			});
		});

		return result;
	}

	const clearUserSuggestions = (event) => {
		const keyPressed = (event?.keyCode ? event?.which : event?.key);

		if (keyPressed === 13) { //Enter keycode
			setUserSearchDetails({
				...userSearch,
				searchText: '',
				searchSuggestions: []
			})
		}
	}

	const showUserPage = (event) => {
		const keyPressed = (event.keyCode ? event.keyCode : event.which);

		if (keyPressed === 13) { //Enter keycode
			history.push({
				pathname: '/searches',
				state: userSearch.searchSuggestions
			});
		}
	}

	return (
		<div>
			<SearchInput
				searchText={userSearch.searchText}
				searchUsers={searchUsers}
				searchSuggestions={userSearch.searchSuggestions}
				clearUserSuggestions={clearUserSuggestions}
			/>
			<UserSuggestionCards
				searchSuggestions={userSearch.searchSuggestions}
				setUserSearchDetails={setUserSearchDetails}
				showUserPage={showUserPage}
			/>
		</div>
	)
}

export default SearchContainer
