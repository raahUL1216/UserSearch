import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { EventKeyCode } from '../../constants/EventKeyCodes';
import { RiCloseLine } from 'react-icons/ri';
import './search-input.css';

const SearchInput = (props) => {
	const history = useHistory();

	// redirect to show user search page
	const showUserSearchesPage = (event) => {
		if (props.searchText) {
			if (event.type === 'keydown') {
				const keyPressed = event.which || event.keyCode || 0;

				if (keyPressed === EventKeyCode.Enter) {
					history.push(`/searches/${props.searchText}`);
				}
			} else {
				history.push(`/searches/${props.searchText}`);
			}
		}
	}

	const clearUserSearch = (event) => {
		if (event.type === 'keydown') {
			const keyPressed = event.which || event.keyCode || 0;

			if (keyPressed === EventKeyCode.Enter) {
				props.setSearchText('');
				props.setSearchSuggestions([]);
			}
		} else {
			props.setSearchText('');
			props.setSearchSuggestions([]);
		}
	}

	return (
		<div className='search-input-wrapper'>
			<FaSearch className='search-input-icon'
				tabIndex={0}
				onClick={showUserSearchesPage}
				onKeyDown={showUserSearchesPage}
				data-testid='search-input-icon'
			/>

			<input type="text"
				className='search-input'
				placeholder="Search users by ID, address, name, items."
				value={props.searchText}
				onChange={(event) => { props.searchUser(event.target.value) }}
				onKeyDown={showUserSearchesPage}
				data-testid='search-input'
				name="searchText"
				autoFocus
			/>

			<RiCloseLine className='clear-input-icon'
				tabIndex={0}
				onClick={clearUserSearch}
				onKeyDown={clearUserSearch}
				data-testid='clear-input-icon'
			/>
		</div>
	)
}

export default SearchInput
