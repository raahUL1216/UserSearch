import React, { useState, useCallback, useEffect, useRef } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import SuggestionCards from '../SuggestionCards/SuggestionCards'
import { Constants } from '../../constants/Constants'
import { EventKeyCode } from '../../constants/EventKeyCodes'
import '../../styles/user-search-styles.css'
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup'

const SearchContainer = () => {
	// variable to unsubscribe getUsers
	let getUsersSubscription = useRef(true);

	// state for input search term and user search suggestions
	const [searchText, setSearchText] = useState('');
	const [searchSuggestions, setSearchSuggestions] = useState([]);

	useEffect(() => {
		getUsersSubscription.current = true;

		if (!searchText) {
			setSearchSuggestions([]);
		}
		// cancel subscription of getUsers
		return () => (getUsersSubscription.current = false)
	}, [searchText]);

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

						if (result.length > 0 && getUsersSubscription.current) {
							setSearchSuggestions(result);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	const startUserSearch = function (fn) {
		let timer;

		return function () {
			let context = this,
				args = arguments;

			// store search text & 
			// avoid calling API(by clearing timer) if next keypress was registered before 300ms(Constants.searchDelay)
			setSearchText(args[0]);
			clearTimeout(timer);

			timer = setTimeout(() => {
				// call API to search user as delay between subsequent keypress is more than 300ms
				fn.apply(context, args);
			}, Constants.searchDelay);
		};
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearch = useCallback(startUserSearch(getUsers), []);

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
			/>
		</div>
	)
}

export default SearchContainer
