import React from 'react'
import { useHistory } from 'react-router-dom'
import { EventKeyCode } from '../../constants/EventKeyCodes'
import { FaSearch } from "react-icons/fa";
import { RiCloseLine } from 'react-icons/ri'
import './search-input.css'

const SearchInput = (props) => {
	const history = useHistory();

	// when enter key is pressed on search icon or clicked, redirect to show user search page
	const showSuggestions = (event, isKeyboardEvent) => {
		if (isKeyboardEvent) {
			const keyPressed = event.which || event.keyCode || 0;

			if (keyPressed === EventKeyCode.Enter) {
				showUserSearchesPage(event);
			}
		} else {
			showUserSearchesPage(event, isKeyboardEvent);
		}
	}

	// when enter key is pressed in input, redirect to show user search page
	const showUserSearchesPage = (event, isKeyboardEvent) => {
		const keyPressed = event.which || event.keyCode || 0;

		if (props.searchText) {
			if (isKeyboardEvent) {
				if (keyPressed === EventKeyCode.Enter) {
					history.push(`/searches/${props.searchText}`);
				}
			} else {
				history.push(`/searches/${props.searchText}`);
			}
		}
	}

	return (
		<div className='search-input-wrapper'>
			<FaSearch className='search-input-icon'
				tabIndex={0}
				onClick={(event) => showSuggestions(event, false)}
				onKeyDown={(event) => showSuggestions(event, true)}
				data-testid='search-input-icon'
			/>

			<input type="text"
				className='search-input'
				placeholder="Search users by ID, address, name, items."
				value={props.searchText}
				onChange={(event) => { props.startSearch(event.target.value) }}
				onKeyDown={(event) => showUserSearchesPage(event, true)}
				data-testid="search-input"
				name="searchText"
				autoFocus
			/>

			<RiCloseLine className='clear-input-icon'
				tabIndex={0}
				onClick={(event) => props.clearSuggestions(event, false)}
				onKeyDown={(event) => props.clearSuggestions(event, true)}
				data-testid='clear-input-icon'
			/>
		</div>
	)
}

export default SearchInput
