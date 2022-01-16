import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import UserProperty from '../../components/UserProperty/UserProperty';
import './show-user-page.css';

const ShowUserPage = () => {
	const location = useLocation();
	const [user, setUser] = useState({});

	useEffect(() => {
		let user = location.state;
		delete user['item_search'];

		setUser(user);
	}, [location]);

	return (
		<div className='show-user-container'
			data-testid='show-user-page'>
			<h2 className='user-page-title'>User search result page</h2>
			<ul className='user-container'>
				{
					/* display every property */
					Object.keys(user).map((property, index) => {
						return (
							<li key={'field-' + index}>
								<span className='field-name'> {property + ': '} </span>
								<UserProperty
									propertyClass={property}
									propertyName={property}
									propertyValue={
										property !== 'items' ? user[property] : user[property].join(', ')
									} />
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

export default ShowUserPage;