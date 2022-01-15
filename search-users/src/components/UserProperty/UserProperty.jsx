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
					{
						/* if property is itemSearch, then display the item search text in list, else display the property value */
						props?.propertyName !== 'itemSearch'
							? Parser(props.propertyValue)
							: <ul className='item-search-text-list'>
								<li>
									{props.propertyValue}
								</li>
							</ul>
					}
				</div>
			}
		</React.Fragment>
	)
}

export default UserProperty
