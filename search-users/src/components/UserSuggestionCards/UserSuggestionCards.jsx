import React from 'react'
import UserSuggestionCard from '../UserSuggestionCard/UserSuggestionCard'
import './user-suggestion-cards.css'

const UserSuggestionCards = (props) => {
	const highlightUser = (event) => {
		event.preventDefault();
		// remove active class from all listed user suggestion
		const userSuggestionElements = document.querySelectorAll("#searchResults");
		[].forEach.call(userSuggestionElements, function (ele) {
			ele.classList.remove("active-user");
		});

		const currentElement = event.target;

		// highlight user
		if (!currentElement.classList.contains('active-user')) {
			currentElement.classList.add('active-user');
		}
	}

	const handleSuggestionClick = (event) => {
		// redirect to user page
	}

	const handleSuggestionKeyPress = (event) => {
		const keyPressed = (event.keyCode ? event.keyCode : event.which);

		if (keyPressed === 13) { //Enter keycode
			console.log('search users and redirec to show search results')
		}
	}

	return (
		props.searchSuggestions.length > 0 &&

		<ul id='searchResults' className='suggestion-container term-list hidden'>
			{props.searchSuggestions.map((userSuggestion) => {
				return (
					<UserSuggestionCard
						key={userSuggestion.id}
						suggestion={userSuggestion}
						highlightUser={highlightUser}
						handleSuggestionClick={handleSuggestionClick}
						handleSuggestionKeyPress={handleSuggestionKeyPress}
					/>
				)
			})}
		</ul>
	)
}

export default UserSuggestionCards
