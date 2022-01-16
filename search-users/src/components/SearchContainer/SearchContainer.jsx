import React, { useState, useCallback, useEffect, useRef } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import SuggestionCards from '../SuggestionCards/SuggestionCards'
import { Constants } from '../../constants/Constants'
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup'
import './search-container.css'

const SearchContainer = () => {
	// variable to unsubscribe getUsers API
	let getUsersSubscription = useRef(true);

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

						// set suggestions only if component is not unmounted
						if (getUsersSubscription.current) {
							setSearchSuggestions(result);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	const debounceSearch = function (fn) {
		let timer;

		return function (...args) {
			// store search text & 
			// avoid calling API(by clearing timer) if next keypress was registered before 300ms(Constants.searchDelay)
			setSearchText(args[0]);
			clearTimeout(timer);

			timer = setTimeout(() => {
				// call API to search user as delay between subsequent keypress is more than 300ms
				fn.apply(this, args);
			}, Constants.searchDelay);
		};
	}

	// debounce search 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const searchUser = useCallback(debounceSearch(getUsers), []);

	return (
		<div className='search-container'>
			<SearchInput
				searchText={searchText}
				searchUser={searchUser}
				setSearchText={setSearchText}
				setSearchSuggestions={setSearchSuggestions}
			/>

			<SuggestionCards
				searchText={searchText}
				searchSuggestions={searchSuggestions}
			/>
		</div>
	)
}

export default SearchContainer
