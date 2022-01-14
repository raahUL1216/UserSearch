import React from 'react'
import { useHistory } from 'react-router-dom'
import { EventKeyCode } from '../../constants/EventKeyCodes'
import { FaSearch } from "react-icons/fa";
import { RiCloseLine } from 'react-icons/ri'
import './search-input.css'

const SearchInput = (props) => {
	const history = useHistory();

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

	const showUserSearchesPage = async (event, isKeyboardEvent) => {
		const keyPressed = event.which || event.keyCode || 0;

		if (props.searchText) {
			if (isKeyboardEvent) {
				if (keyPressed === EventKeyCode.Enter) {
					history.push({
						pathname: '/searches',
						state: props.searchText
					});
				}
			} else {
				history.push({
					pathname: '/searches',
					state: props.searchText
				});
			}
		}
	}

	return (
		<div className='search-input-wrapper'>
			<FaSearch className='search-input-icon'
				tabIndex={0}
				onClick={(event) => showSuggestions(event, false)}
				onKeyDown={(event) => showSuggestions(event, true)} />

			<input type="text"
				className='search-input'
				placeholder="Search users by ID, address, name, items."
				value={props.searchText}
				onChange={(event) => { props.startSearch(event.target.value) }}
				onKeyDown={(event) => showUserSearchesPage(event, true)}
				name="searchText"
				autoFocus
			/>

			<RiCloseLine className='clear-input-icon'
				tabIndex={0}
				onClick={(event) => props.clearSuggestions(event, false)}
				onKeyDown={(event) => props.clearSuggestions(event, true)}
			/>
		</div>
	)
}

export default SearchInput
