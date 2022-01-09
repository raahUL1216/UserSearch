import React from 'react'
import Parser from 'html-react-parser';
import './user-suggestion-card.css'

const UserSuggestionCard = (props) => {
	return (
		<li key={props.suggestion.id}
			tabIndex="0"
			className='suggestion-card'
			// activeClassName="active-link"
			onClick={(event) => props.handleSuggestionClick(event)}
			onKeyPress={(event) => props.handleSuggestionKeyPress(event, props.suggestion.id)}
			onMouseOver={(event) => { props.highlightUser(event) }}
			onFocus={(event) => { props.highlightUser(event) }}
		>
			<div className='user-id'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.id)}
			</div>

			<div className='user-name'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.name)}
			</div>

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
			<div className='user-address'
				onMouseOver={(event) => { event.stopPropagation(); }}>
				{Parser(props.suggestion.address)}
			</div>
		</li>
	)
}

export default UserSuggestionCard
