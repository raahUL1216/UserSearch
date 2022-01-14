import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import './show-user-searches.css';
import { Constants } from '../../constants/Constants';
import { prepareUserSearchMarkup } from '../../common/UserSearchMarkup';
import UserProperty from '../../components/UserProperty/UserProperty';

const ShowUserSearches = () => {
	const location = useLocation();
	const [searchSuggestions, setSearchSuggestions] = useState([]);

	const getUsers = useCallback(async (searchTerm) => {
		const searchAPIURI = `${Constants.searchAPI}search-users/?searchTerm=${searchTerm}`,
			headers = Constants.headers;

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
	}, []);

	useEffect(() => {
		// let isCanceled = false;
		const searchTerm = location.state;

		getUsers(searchTerm);
		// return {
		// 	promise: users,
		// 	cancel() {
		// 		isCanceled = true;
		// 	},
		// };
	}, [location.state, getUsers]);

	return (
		<div className='show-search-results-container'>
			<h2 className='search-page-title'>User search result page</h2>
			<ul className='user-suggestion-list'>
				{
					searchSuggestions?.map((suggestion) => {
						return (
							<li key={suggestion.id}>
								<div>
									<span className='field-name'>UseId: </span>
									<UserProperty
										propertyClass='id'
										propertyValue={suggestion.id}
									/>
								</div>

								<div>
									<span className='field-name'>Name: </span>
									<UserProperty
										propertyClass='name'
										propertyValue={suggestion.name}
									/>
								</div>

								<div>
									<span className='field-name'>Items: </span>
									<UserProperty
										propertyClass='items'
										propertyValue={suggestion.items?.join(', ')}
									/>
								</div>

								<div>
									<span className='field-name'>Address: </span>
									<UserProperty
										propertyClass='address'
										propertyValue={suggestion.address}
									/>
								</div>

								<div>
									<span className='field-name'>Pincode: </span>
									<UserProperty
										propertyClass='pincode'
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