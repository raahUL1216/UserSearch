import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import UserProperty from '../../components/UserProperty/UserProperty';
import './show-user.css';

const ShowUser = () => {
	const location = useLocation();
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(location.state);
	}, [location]);

	return (
		<div className='show-user-container'>
			<h2 className='user-page-title'>User search result page</h2>
			<ul className='user-container'>
				<div>
					<span className='field-name'>UseId: </span>
					<UserProperty
						propertyClass='id'
						propertyValue={user.id}
					/>
				</div>

				<div>
					<span className='field-name'>Name: </span>
					<UserProperty
						propertyClass='name'
						propertyValue={user.name}
					/>
				</div>

				<div>
					<span className='field-name'>Items: </span>
					<UserProperty
						propertyClass='items'
						propertyValue={user.items?.join(', ')}
					/>
				</div>

				<div>
					<span className='field-name'>Address: </span>
					<UserProperty
						propertyClass='address'
						propertyValue={user.address}
					/>
				</div>

				<div>
					<span className='field-name'>Pincode: </span>
					<UserProperty
						propertyClass='pincode'
						propertyValue={user.pincode}
					/>
				</div>
			</ul>
		</div>
	)
}

export default ShowUser;