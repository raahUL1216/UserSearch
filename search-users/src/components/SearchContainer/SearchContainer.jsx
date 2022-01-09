import React, { useState } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import UserSuggestionCards from '../UserSuggestionCards/UserSuggestionCards'
import { Constants } from '../../common/Constants'

const SearchContainer = () => {
	const [userSearch, setUserSearchDetails] = useState({
		searchText: '',
		searchSuggestions: []
	})

	const searchUsers = (event) => {
		const searchTerm = event.target.value?.trim();

		setUserSearchDetails({
			...userSearch,
			searchText: searchTerm,
		})

		// TODO call api to get the results
		getUsers(searchTerm);
	}

	const getUsers = async (searchTerm) => {
		const searchAPIURI = Constants.searchAPI + "search-users/?searchTerm=" + searchTerm,
			headers = Constants.headers;

		if (searchTerm) {
			await fetch(searchAPIURI, { headers })
				.then(res => res.json())
				.then(
					(result) => {
						result.forEach(suggestion => {
							Object.keys(suggestion).forEach(fieldName => {
								suggestion.highlights.forEach((highlight) => {
									if (fieldName !== 'items' && highlight.path === fieldName) {
										let texts = highlight.texts;
										let replacements = texts.map(text => {
											const matchedValue = `<strong> ${text.value} </strong>`;

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


	const showUserPage = (event) => {
		const keyPressed = (event.keyCode ? event.keyCode : event.which);

		if (keyPressed === 13) { //Enter keycode
			console.log('search users and redirect to show search results')
		}
	}

	return (
		<div>
			<SearchInput
				searchText={userSearch.searchText}
				searchUsers={searchUsers}
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
