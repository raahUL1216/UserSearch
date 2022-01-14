import React from 'react'
import Parser from 'html-react-parser';
import './user-property.css'

const UserProperty = (props) => {
	return (
		<React.Fragment>
			{
				props.propertyValue &&

				<div className={props.propertyClass}
					onMouseOver={(event) => { event.stopPropagation(); }}>
					{Parser(props.propertyValue)}
				</div>
			}
		</React.Fragment>
	)
}

export default UserProperty
