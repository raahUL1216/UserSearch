import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import UserSuggestionCards from '../UserSuggestionCards/UserSuggestionCards'
import { Constants } from '../../common/Constants'
import './search-container.css'

const SearchContainer = () => {
	const history = useHistory();
	const waitTime = Constants.searchDelay;

	// state for input search terma and user search suggestions
	const [userSearch, setUserSearchDetails] = useState({
		searchText: '',
		searchSuggestions: []
	})

	const startSearch = function (fn, searchWaitTime) {
		let timer;

		return function () {
			let context = this,
				args = arguments;

			// console.log(args);

			setUserSearchDetails((prevState) => {
				return {
					...prevState,
					searchText: args[0],
				}
			});

			clearTimeout(timer);

			timer = setTimeout(() => {
				fn.apply(context, args);
			}, searchWaitTime);
		};
	}

	const getUsers = async (searchTerm) => {
		// console.log('in getUsers: ' + searchTerm);
		const searchAPIURI = `${Constants.searchAPI}search-users/?searchTerm=${searchTerm}`,
			headers = Constants.headers;

		console.log(searchAPIURI);

		if (searchTerm) {
			await fetch(searchAPIURI, { headers })
				.then(res => res.json())
				.then(
					(result) => {
						result = prepareMarkpupData(result);

						// update the prepared markup
						if (result.length > 0) {
							setUserSearchDetails((prevState) => {
								return {
									...prevState,
									searchSuggestions: result
								}
							});
						}
					},
					(error) => {
						console.log(error);
					});
		} else {
			// when input is empty, remove suggestions
			setUserSearchDetails((prevState) => {
				return {
					...prevState,
					searchSuggestions: []
				}
			});
		}
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearch = useCallback(startSearch(getUsers, waitTime), []);

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

	const clearUserSuggestions = (event, isKeyboardEvent) => {
		if (isKeyboardEvent) {
			const keyPressed = (event?.keyCode ? event?.which : event?.key);

			if (keyPressed === 13) { //Enter keycode
				setUserSearchDetails({
					...userSearch,
					searchText: '',
					searchSuggestions: []
				})
			}
		} else {
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
		<div className='main-container'>
			<SearchInput
				searchText={userSearch.searchText}
				startSearch={debounceSearch}
				getUsers={getUsers}
				searchSuggestions={userSearch.searchSuggestions}
				clearUserSuggestions={clearUserSuggestions}
			/>
			<UserSuggestionCards
				searchText={userSearch.searchText}
				searchSuggestions={userSearch.searchSuggestions}
				setUserSearchDetails={setUserSearchDetails}
				showUserPage={showUserPage}
			/>
		</div>
	)
}

export default SearchContainer
