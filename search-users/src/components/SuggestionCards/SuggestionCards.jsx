import React from 'react'
import SuggestionCard from './SuggestionCard/SuggestionCard'
import './suggestion-cards.css'

const SuggestionCards = (props) => {
	const userNotFound = () => {
		return (
			props.searchText.length > 0 &&
			props.searchSuggestions.length === 0
		);
	}

	const highlightSuggestion = (event) => {
		// remove active class from all listed user suggestion
		const suggestionElements = document.querySelectorAll("#userSearchResults .suggestion-card");

		suggestionElements.forEach((suggestionElement) => {
			suggestionElement.classList.remove("selected-suggestion");
		});

		const currentElement = event.target;

		// highlight focused suggestion
		if (!currentElement.classList.contains('selected-suggestion')) {
			currentElement.classList.add('selected-suggestion');
		}

		currentElement.focus();
	}

	return (
		<React.Fragment>
			{
				props.searchSuggestions.length > 0 &&

				<ul id='userSearchResults' className={"suggestion-container " + (userNotFound() ? "no-user" : "")}>
					{
						userNotFound()
							? <li>No user found</li>
							: props.searchSuggestions.map((suggestion) => {
								return (
									<SuggestionCard
										key={suggestion.id}
										suggestion={suggestion}
										highlightSuggestion={highlightSuggestion}
									/>
								)
							})
					}
				</ul>
			}
		</React.Fragment>
	)
}

export default SuggestionCards
