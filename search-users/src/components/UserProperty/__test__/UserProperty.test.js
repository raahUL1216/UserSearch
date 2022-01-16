
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProperty from '../UserProperty';
import { userProperty } from '../../../testing/mock_responses/mockResponses';

describe('Show User Property', () => {
	it('should show user property', () => {
		render(
			<UserProperty
				propertyClass={userProperty.name}
				propertyName={userProperty.name}
				propertyValue={userProperty.value}
			/>
		);

		const diplayedPropertyElement = screen.getByText(userProperty.value);
		expect(diplayedPropertyElement).toBeInTheDocument();
	});
})