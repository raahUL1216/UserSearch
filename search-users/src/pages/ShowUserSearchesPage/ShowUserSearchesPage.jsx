import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Constants } from '../../constants/Constants';
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup';
import UserProperty from '../../components/UserProperty/UserProperty';
import './show-user-searches-page.css';

const ShowUserSearchesPage = () => {
	// get search text from url params/
	const { searchText } = useParams();
	const [searchSuggestions, setSearchSuggestions] = useState([]);

	useEffect(() => {
		// flag to unsubscibe fetch users API
		let isSubscribed = true;

		if (!searchText) {
			setSearchSuggestions([]);
		}

		const searchAPIURI = `${Constants.searchAPI}search-users/?searchTerm=${searchText}`,
			headers = Constants.headers;

		const fetchUsers = async () => {
			await fetch(searchAPIURI, { headers })
				.then(res => res.json())
				.then(
					(result) => {
						result = prepareUserSearchMarkup(result);

						result = result.map((user) => {
							delete user['itemSearch'];
							delete user['highlights'];

							return user;
						})

						if (result.length > 0 && isSubscribed) {
							setSearchSuggestions(result);
						}
					},
					(error) => {
						console.log(error);
					});
		}

		if (searchText) {
			fetchUsers(searchText);
		}

		// cancel subscription to fetchUsers API
		return () => {
			isSubscribed = false;
		}
	}, [searchText]);

	return (
		<div className='show-search-results-container'>
			<h2 className='search-page-title'>User search result page</h2>
			<ul className='user-suggestion-list'
				data-testid='show-search-results'>
				{
					/* iterate in suggestions */
					searchSuggestions?.map((suggestion, suggestionIndex) => {
						return (
							<li key={'suggestion-item-' + suggestion.id}
								data-testid={'suggestion-' + suggestionIndex}
							>
								{
									/* display every property */
									Object.keys(suggestion).map((property, index) => {
										return (
											<div key={'field-' + index}>
												<span className='field-name'> {property + ': '} </span>
												<UserProperty
													propertyClass={property}
													propertyName={property}
													propertyValue={
														property !== 'items' ? suggestion[property] : suggestion[property].join(', ')
													} />
											</div>
										)
									})
								}
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}

export default ShowUserSearchesPage;