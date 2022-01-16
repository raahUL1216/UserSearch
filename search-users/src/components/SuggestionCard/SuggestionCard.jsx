import React from 'react';
import { useHistory } from 'react-router-dom';
import { EventKeyCode } from '../../constants/EventKeyCodes';
import UserProperty from '../UserProperty/UserProperty';
import './suggestion-card.css';

const SuggestionCard = (props) => {
	const history = useHistory();

	// show user on mouse click and when enter key is pressed on suggestion
	const showUser = (event) => {
		if (event.type === 'keydown') {
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
			onKeyDown={showUser}
			onClick={showUser}
			onMouseOver={(event) => { props.highlightSuggestion(event) }}
			onFocus={(event) => { props.highlightSuggestion(event) }}
			data-testid={'suggestion-' + props.index}>

			{/* user field markups  */}
			<UserProperty
				propertyClass='id'
				propertyName='id'
				propertyValue={props.suggestion.id}
			/>

			<UserProperty
				propertyClass='name'
				propertyName='name'
				propertyValue={props.suggestion.name}
			/>

			<UserProperty
				propertyClass='item-search-text'
				propertyName='item_search'
				propertyValue={props.suggestion.item_search}
			/>

			<UserProperty
				propertyClass='address'
				propertyName='address'
				propertyValue={props.suggestion.address}
			/>

			<UserProperty
				propertyClass='pincode'
				propertyName='pincode'
				propertyValue={props.suggestion.pincode}
			/>
		</li>
	)
}

export default SuggestionCard
