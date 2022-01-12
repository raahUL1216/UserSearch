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

	const showSeachResultsPage = async (event) => {
		const keyPressed = (event?.keyCode ? event?.which : event?.key);

		if (keyPressed === 13) { //Enter keycode
			await props.getUsers(props.searchText);

			history.push({
				pathname: '/searches',
				state: props.searchSuggestions
			});
		}
	}

	return (
		<div className='input-wrapper'>
			<FaSearch className='input-search-icon'
				tabIndex={0}
				onClick={(event) => showUserSuggestions(event, false)}
				onKeyDown={(event) => showUserSuggestions(event, true)} />

			<input type="text"
				className='input-search'
				placeholder="Search users by ID, address, name, items."
				value={props.searchText}
				onChange={(event) => { props.startSearch(event.target.value) }}
				onKeyDown={(event) => showSeachResultsPage(event)}
				name="searchTerm"
				autoFocus
			/>

			<RiCloseLine className='input-clear-icon'
				tabIndex={0}
				onClick={(event) => props.clearUserSuggestions(event, false)}
				onKeyDown={(event) => props.clearUserSuggestions(event, true)}
			/>
		</div>
	)
}

export default SearchInput
