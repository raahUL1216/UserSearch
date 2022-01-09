import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Parser from 'html-react-parser';
import './show-search-result.css';

const ShowSearchResult = () => {
	const location = useLocation();
	const [searchSuggestions, setsearchSuggestions] = useState([]);

	useEffect(() => {
		setsearchSuggestions(location.state);
		console.log(location.state);
	}, [location]);

	const getUserItems = (items) => {
		const item = items.reduce((items, item) => {
			if (items.length > 0) {
				items = items + ", " + item;
			} else {
				items = item;
			}
			return items;
		}, '');

		return Parser(`<span> ${item} </span>`);
	}

	return (
		<div className='show-search-results-container'>
			<h2 className='search-page-title'>User search result page</h2>
			<ul className='user-suggestion-list'>
				{
					searchSuggestions.map((userSuggestion) => {
						return (
							<li key={userSuggestion.id}>
								{/* user id field markup */}
								<div className='user-id' >
									<span className='field-name'>UseId: </span>{Parser(userSuggestion.id)}
								</div>

								{/* user name field markup */}
								<div className='user-name'>
									<span className='field-name'>Name: </span>{Parser(userSuggestion.name)}
								</div>

								{/* search found in items field or not */}
								<div className='item-search-container'>
									<span className='field-name'>Items: </span>{getUserItems(userSuggestion.items)}
								</div>

								{/* user address field markup */}
								<div className='user-address'>
									<span className='field-name'>Address: </span>{Parser(userSuggestion.address)}
								</div>

								{/* user pincode field markup */}
								<div className='user-pincode'>
									<span className='field-name'>Pincode: </span>{Parser(userSuggestion.pincode)}
								</div>
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}

export default ShowSearchResult;