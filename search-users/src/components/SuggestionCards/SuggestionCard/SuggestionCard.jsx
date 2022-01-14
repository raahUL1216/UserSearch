import React from 'react'
import { useHistory } from 'react-router-dom';
import { EventKeyCode } from '../../../constants/EventKeyCodes';
import UserProperty from '../../UserProperty/UserProperty';
import './suggestion-card.css'

const SuggestionCard = (props) => {
	const history = useHistory();

	const showSuggestion = (event, isKeyboardEvent) => {
		if (isKeyboardEvent) {
			const keyPressed = event.which || event.keyCode || 0;

			if (keyPressed === EventKeyCode.Enter) {
				history.push({
					pathname: '/user',
					state: props.suggestion
				});
			}
		} else {
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
			onKeyPress={(event) => showSuggestion(event, true)}
			onClick={(event) => showSuggestion(event, false)}
			onMouseOver={(event) => { props.highlightSuggestion(event) }}
			onFocus={(event) => { props.highlightSuggestion(event) }}
		>
			{/* user field markups */}
			<UserProperty
				propertyClass='id'
				propertyValue={props.suggestion.id}
			/>

			<UserProperty
				propertyClass='name'
				propertyValue={props.suggestion.name}
			/>

			<UserProperty
				propertyClass='item-search-text'
				propertyValue={props.suggestion.itemSearch}
			/>

			<UserProperty
				propertyClass='address'
				propertyValue={props.suggestion.address}
			/>

			<UserProperty
				propertyClass='pincode'
				propertyValue={props.suggestion.pincode}
			/>
		</li>
	)
}

export default SuggestionCard
