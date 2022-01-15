import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchContainer from './SearchContainer';

describe('Search container', () => {
	it('search input state is changed when user types', () => {
		const searchText = 'john';
		render(<SearchContainer />);

		fireEvent.change(screen.getByTestId("search-input"), { target: { value: searchText } })

		expect(screen.getByTestId("search-input").value).toBe(searchText);
	});
});