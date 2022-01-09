import React from 'react'
import './search-input.css'
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai'

const SearchInput = (props) => {
	const showUserSuggestions = (event, isKeyboardEvent) => {
		if (isKeyboardEvent) {
			const keyPressed = (event.keyCode ? event.keyCode : event.which);

			if (keyPressed === 13) { //Enter keycode
				showSeachResultsPage(event);
			}
		} else {
			showSeachResultsPage(event);
		}
	}

	const showSeachResultsPage = (event) => {
		const keyPressed = (event?.keyCode ? event?.which : event?.key);

		if (keyPressed === 13) { //Enter keycode
			props.searchUsers(event, props.searchText);
			console.log('redirect to show search results');
		}
	}

	return (
		<React.Fragment>
			<div className='input-search-container'>
				<div className="search-icon"
					tabIndex={0}
					onClick={(event) => showUserSuggestions(event, false)}
					onKeyDown={(event) => showUserSuggestions(event, true)}>
					<FaSearch />
				</div>

				<div className='input-container'>
					<input type="text"
						className='input-search'
						placeholder="Search users by ID, address, name, items."
						value={props.searchText}
						onChange={(event) => { props.searchUsers(event, props.searchText) }}
						onKeyDown={(event) => showSeachResultsPage(event)}
						name="searchTerm"
						autoFocus
					/>
				</div>

				<span className='clear-icon'
					tabIndex={0}
					onClick={(event) => props.clearUserSuggestions(event)}
					onKeyDown={(event) => props.clearUserSuggestions(event)}>
					<AiOutlineClose />
				</span>
			</div>
		</React.Fragment>
	)
}

export default SearchInput
