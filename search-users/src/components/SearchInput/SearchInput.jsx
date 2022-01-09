import React from 'react'
import { useHistory } from 'react-router-dom'
import './search-input.css'
import { FaSearch } from "react-icons/fa";
import { RiCloseLine } from 'react-icons/ri'

const SearchInput = (props) => {
	const history = useHistory();

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

			history.push({
				pathname: '/searches',
				state: props.searchSuggestions
			});
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
						onChange={(event) => { props.searchUsers(event, event.target.value) }}
						onKeyDown={(event) => showSeachResultsPage(event)}
						name="searchTerm"
						autoFocus
					/>
				</div>

				<span className='clear-icon'
					tabIndex={0}
					onClick={(event) => props.clearUserSuggestions(event, false)}
					onKeyDown={(event) => props.clearUserSuggestions(event, true)}>
					<RiCloseLine />
				</span>
			</div>
		</React.Fragment>
	)
}

export default SearchInput
