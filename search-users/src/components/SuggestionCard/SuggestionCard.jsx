import React from 'react';
import { useHistory } from 'react-router-dom';
import { EventKeyCode } from '../../constants/EventKeyCodes';
import UserProperty from '../UserProperty/UserProperty';
import './suggestion-card.css';

const SuggestionCard = (props) => {
	console.log(props.suggestion);

	console.log(Object.keys(props.suggestion));
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
			{
				/* display properties except items and highlights */
				Object.keys(props.suggestion).map((property, index) => {
					if (property !== 'items') {
						return (
							<UserProperty
								key={'field-' + index}
								propertyClass={property}
								propertyName={property}
								propertyValue={props.suggestion[property]} />
						)
					} else {
						return (
							<React.Fragment key={'field-' + index}></React.Fragment>
						)
					}
				})
			}
		</li>
	)
}

export default SuggestionCard
