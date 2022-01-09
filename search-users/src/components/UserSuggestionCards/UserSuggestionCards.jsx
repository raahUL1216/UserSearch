import React from 'react'
// import { ReactDOM } from 'react-dom'
import UserSuggestionCard from '../UserSuggestionCard/UserSuggestionCard'
import './user-suggestion-cards.css'

const UserSuggestionCards = (props) => {
	const highlightUser = (event) => {
		// remove active class from all listed user suggestion
		const userSuggestionElements = document.querySelectorAll("#searchResults .suggestion-card");
		[].forEach.call(userSuggestionElements, function (ele) {
			ele.classList.remove("active-user");
		});

		const currentElement = event.target;

		// highlight user
		if (!currentElement.classList.contains('active-user')) {
			currentElement.classList.add('active-user');
		}

		// focus hovered suggestion
		// ReactDOM.findDOMNode(this.refs.theDiv).focus();

		return false;
	}

	const handleSuggestionClick = (event) => {
		// redirect to user page
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
						highlightUser={highlightUser}
						handleSuggestionClick={handleSuggestionClick}
						setUserSearchDetails={props.setUserSearchDetails}
					/>
				)
			})}
		</ul>
	)
}

export default UserSuggestionCards
