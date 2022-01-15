import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import SuggestionCards from '../SuggestionCards/SuggestionCards'
import { Constants } from '../../constants/Constants'
import { EventKeyCode } from '../../constants/EventKeyCodes'
import '../../styles/user-search-styles.css'
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup'

const SearchContainer = () => {
	const history = useHistory();

	// state for input search terma and user search suggestions
	const [searchText, setSearchText] = useState('');
	const [searchSuggestions, setSearchSuggestions] = useState([]);

	const clearSuggestions = (event, isKeyboardEvent) => {
		if (isKeyboardEvent) {
			const keyPressed = event.which || event.keyCode || 0;

			if (keyPressed === EventKeyCode.Enter) {
				setSearchText('');
				setSearchSuggestions([]);
			}
		} else {
			setSearchText('');
			setSearchSuggestions([]);
		}
	}

	const showUserPage = (event) => {
		const keyPressed = event.which || event.keyCode || 0;

		if (keyPressed === EventKeyCode.Enter) {
			//TODO
			history.push({
				pathname: '/searches',
				state: searchSuggestions
			});
		}
	}

	const getUsers = async (searchTerm) => {
		const searchAPIURI = `${Constants.searchAPI}search-users/?searchTerm=${searchTerm}`,
			headers = Constants.headers;

		console.log(searchAPIURI);

		if (searchTerm) {
			await fetch(searchAPIURI, { headers })
				.then(res => res.json())
				.then(
					(result) => {
						result = prepareUserSearchMarkup(result);

						// update the prepared markup
						if (result.length > 0) {
							setSearchSuggestions(result);
						}
					},
					(error) => {
						console.log(error);
					});
		} else {
			// when input is empty, remove suggestions
			setSearchSuggestions([]);
		}
	}

	const startSearch = function (fn) {
		let timer;

		return function () {
			let context = this,
				args = arguments;

			setSearchText(args[0]);

			clearTimeout(timer);

			timer = setTimeout(() => {
				fn.apply(context, args);
			}, Constants.searchDelay);
		};
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearch = useCallback(startSearch(getUsers), []);

	return (
		<div className='search-container'>
			<SearchInput
				searchText={searchText}
				startSearch={debounceSearch}
				setSearchSuggestions={setSearchSuggestions}
				clearSuggestions={clearSuggestions}
			/>

			<SuggestionCards
				searchText={searchText}
				searchSuggestions={searchSuggestions}
				showUserPage={showUserPage}
			/>
		</div>
	)
}

export default SearchContainer
