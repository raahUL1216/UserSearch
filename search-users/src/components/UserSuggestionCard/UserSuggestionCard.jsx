import React from 'react'
import { useHistory } from 'react-router-dom';
import Parser from 'html-react-parser';
import './user-suggestion-card.css'

const UserSuggestionCard = (props) => {
	const history = useHistory();

	const handleSuggestionClick = (event, suggestion) => {
		history.push({
			pathname: '/user',
			state: props.suggestion
		});
	}

	const handleSuggestionKeyPress = (event, userId) => {
		const keyPressed = (event.keyCode ? event.keyCode : event.which);

		if (keyPressed === 13) { //Enter keycode
			history.push({
				pathname: '/user',
				state: props.suggestion
			});
		}
	}

	return (
		<li key={props.suggestion.id}
			tabIndex="0"
			className='suggestion-card'
			onClick={(event) => handleSuggestionClick(event, props.suggestion)}
			onKeyPress={(event) => handleSuggestionKeyPress(event, props.suggestion)}
			onMouseOver={(event) => { props.highlightUserSuggestion(event) }}
			onFocus={(event) => { props.highlightUserSuggestion(event) }}>

			{/* user id field markup */}
			<div className='user-id'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.id)}
			</div>

			{/* user name field markup */}
			<div className='user-name'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.name)}
			</div>

			{/* search found in items field or not */}
			<div className='item-search-container'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{
					props.suggestion.itemSearch &&
					<ul className='item-search-text'>
						<li>
							{props.suggestion.itemSearch}
						</li>
					</ul>
				}
			</div>

			{/* user address field markup */}
			<div className='user-address'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.address)}
			</div>

			{/* user pincode field markup */}
			<div className='user-pincode'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.pincode)}
			</div>
		</li>
	)
}

export default UserSuggestionCard
