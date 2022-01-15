import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Constants } from '../../constants/Constants';
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup';
import UserProperty from '../../components/UserProperty/UserProperty';
import './show-user-searches.css';

const ShowUserSearches = () => {
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

						// update the prepared markup
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
		<div className='show-search-results-container'
			data-testid='show-search-results'>
			<h2 className='search-page-title'>User search result page</h2>
			<ul className='user-suggestion-list'>
				{
					searchSuggestions?.map((suggestion, index) => {
						return (
							<li key={suggestion.id}
								data-testid={'suggestion-' + index}>
								<div>
									<span className='field-name'>UseId: </span>
									<UserProperty
										propertyClass='id'
										propertyName='id'
										propertyValue={suggestion.id}
									/>
								</div>

								<div>
									<span className='field-name'>Name: </span>
									<UserProperty
										propertyClass='name'
										propertyName='name'
										propertyValue={suggestion.name}
									/>
								</div>

								<div>
									<span className='field-name'>Items: </span>
									<UserProperty
										propertyClass='items'
										propertyName='items'
										propertyValue={suggestion.items?.join(', ')}
									/>
								</div>

								<div>
									<span className='field-name'>Address: </span>
									<UserProperty
										propertyClass='address'
										propertyName='address'
										propertyValue={suggestion.address}
									/>
								</div>

								<div>
									<span className='field-name'>Pincode: </span>
									<UserProperty
										propertyClass='pincode'
										propertyName='pincode'
										propertyValue={suggestion.pincode}
									/>
								</div>
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}

export default ShowUserSearches;