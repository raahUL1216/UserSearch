import React from 'react'
import './search-input.css'

const SearchInput = (props) => {
	const showSeachResultsPage = (event) => {
		const keyPressed = (event.keyCode ? event.keyCode : event.which);

		if (keyPressed === 13) { //Enter keycode
			props.searchUsers(event);
			console.log('redirect to show search results')
		}
	}

	return (
		<React.Fragment>
			<input type="text"
				className='search-input'
				placeholder="Search users by ID, address,name"
				value={props.searchText}
				onChange={props.searchUsers}
				onKeyDown={showSeachResultsPage}
				name="searchTerm"
				autoFocus="autofocus"
			/>
			<span className="search-icon">
				<span className="glass"></span>
				<span className="handle"></span>
			</span>
		</React.Fragment>
	)
}

export default SearchInput
