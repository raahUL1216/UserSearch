import React from 'react'
import UserSuggestionCard from '../UserSuggestionCard/UserSuggestionCard'
import './user-suggestion-cards.css'

const UserSuggestionCards = (props) => {
	const highlightUserSuggestion = (event) => {
		// remove active class from all listed user suggestion
		const userSuggestionElements = document.querySelectorAll("#searchResults .suggestion-card");
		[].forEach.call(userSuggestionElements, function (ele) {
			ele.classList.remove("active-user");
		});

		const currentElement = event.target;

		// highlight focused user
		if (!currentElement.classList.contains('active-user')) {
			currentElement.classList.add('active-user');
		}
	}

	const handleSuggestionClick = (event) => {
		console.log('redirect to user page');
	}

	return (
		props.searchSuggestions.length > 0 &&

		<ul id='searchResults' className='suggestion-container'>
			{props.searchSuggestions.map((userSuggestion, index) => {
				return (
					<UserSuggestionCard
						key={userSuggestion.id}
						suggestion={userSuggestion}
						index={index}
						highlightUserSuggestion={highlightUserSuggestion}
						handleSuggestionClick={handleSuggestionClick}
						setUserSearchDetails={props.setUserSearchDetails}
					/>
				)
			})}
		</ul>
	)
}

export default UserSuggestionCards
