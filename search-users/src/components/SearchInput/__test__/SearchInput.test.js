import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchInput from '../SearchInput';

const inputPlaceholder = 'Search users by ID, address, name, items.';

describe('User Input', () => {
	it('should render input element', () => {
		render(<SearchInput />);
		const inputElement = screen.getByPlaceholderText(inputPlaceholder);

		expect(inputElement).toBeInTheDocument();
	});
});