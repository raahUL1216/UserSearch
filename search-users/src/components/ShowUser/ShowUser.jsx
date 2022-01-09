import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Parser from 'html-react-parser';
import './show-user.css';

const ShowUser = () => {
	const location = useLocation();
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(location.state);
	}, [location]);

	const getUserItems = (items) => {
		const item = items?.reduce((items, item) => {
			if (items.length > 0) {
				items = items + ", " + item;
			} else {
				items = item;
			}
			return items;
		}, '') || '';

		return Parser(`<span> ${item} </span>`);
	}

	const getFieldValue = (field) => {
		if (field) {
			return Parser(field);
		} else {
			return '';
		}
	}

	return (
		<div className='show-user-container'>
			<h2 className='user-page-title'>User search result page</h2>
			<ul className='user-container'>
				{/* user id field markup */}
				<div className='user-id' >
					<span className='field-name'>UseId: </span>{getFieldValue(user.id)}
				</div>

				{/* user name field markup */}
				<div className='user-name'>
					<span className='field-name'>Name: </span>{getFieldValue(user.name)}
				</div>

				{/* search found in items field or not */}
				<div className='item-search-container'>
					<span className='field-name'>Items: </span>{getUserItems(user?.items)}
				</div>

				{/* user address field markup */}
				<div className='user-address'>
					<span className='field-name'>Address: </span>{getFieldValue(user.address)}
				</div>


				{/* user pincode field markup */}
				<div className='user-pincode'>
					<span className='field-name'>Pincode: </span>{getFieldValue(user.pincode)}
				</div>
			</ul>
		</div>
	)
}

export default ShowUser;