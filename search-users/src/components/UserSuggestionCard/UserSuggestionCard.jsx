import React from 'react'
import './user-suggestion-card.css'

const UserSuggestionCard = (props) => {

	return (
		<li key={props.suggestion.id}
			className='suggestion-card'
			// activeClassName="active-link"
			onClick={(event) => props.handleSuggestionClick(event)}
			onKeyUp={(event) => props.handleSuggestionKeyPress(event, props.suggestion.id)}
			onMouseOver={(event) => { props.highlightUser(event) }}>
			<div className='user-id'>{props.suggestion.id}</div>
			<div className='user-name'>{props.suggestion.name}</div>
			{/* <div>{ props.suggestion.name }</div> */}
			<div className='user-address'>{props.suggestion.address}</div>
		</li>
	)
}

export default UserSuggestionCard
