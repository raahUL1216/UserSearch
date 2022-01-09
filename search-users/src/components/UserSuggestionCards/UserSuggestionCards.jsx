import React from 'react'
import UserSuggestionCard from '../UserSuggestionCard/UserSuggestionCard'
import './user-suggestion-cards.css'

const UserSuggestionCards = (props) => {
	const highlightUserSuggestion = (event) => {
		// remove active class from all listed user suggestion
		const userSuggestionElements = document.querySelectorAll("#searchResults .suggestion-card");
		[].forEach.call(userSuggestionElements, function (ele) {
			ele.classList.remove("selected-suggestion");
		});

		const currentElement = event.target;

		// highlight focused user
		if (!currentElement.classList.contains('selected-suggestion')) {
			currentElement.classList.add('selected-suggestion');
		}

		currentElement.focus();
	}

	return (
		<React.Fragment>
			{
				props.searchSuggestions.length > 0 &&

				<ul id='searchResults' className='suggestion-container'>
					{props.searchSuggestions.map((userSuggestion, index) => {
						return (
							<UserSuggestionCard
								key={userSuggestion.id}
								suggestion={userSuggestion}
								index={index}
								highlightUserSuggestion={highlightUserSuggestion}
								setUserSearchDetails={props.setUserSearchDetails}
							/>
						)
					})}
				</ul>
			}
			{
				props.searchSuggestions.length === 0 &&
				props.searchText.length > 0 &&

				<ul id='searchResults' className='suggestion-container no-user-found'>
					<div className='no-user-found-message'>No user found</div>
				</ul>
			}

		</React.Fragment>
	)
}

export default UserSuggestionCards
