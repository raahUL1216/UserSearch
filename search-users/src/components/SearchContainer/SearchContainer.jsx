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
		console.log('search users');

		const searchTerm = event.target.value?.trim();

		setUserSearchDetails({
			...userSearch,
			searchText: searchTerm,
		})

		// TODO call api to get the results
		getUsers(searchTerm);
	}

	const getUsers = async (searchTerm) => {
		const searchAPIURI = Constants.searchAPI + "search-users/" + searchTerm,
			headers = Constants.headers;

		await fetch(searchAPIURI, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(res => res.json())
			.then(
				(result) => {
					setUserSearchDetails({
						...userSearch,
						searchSuggestions: result
					});
				},
				(error) => {
					console.log(error);
				});
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
				showUserPage={showUserPage}
			/>
		</div>
	)
}

export default SearchContainer
