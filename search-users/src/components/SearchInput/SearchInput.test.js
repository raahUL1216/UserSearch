

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';

const searchText = 'john';
const { debounceSearch, setSearchSuggestions, clearSuggestions } = jest.fn();

describe('Search input', () => {
	it('should clear search input on cross icon click', async () => {
		render(<SearchInput
			searchText={searchText}
			startSearch={debounceSearch}
			setSearchSuggestions={setSearchSuggestions}
			clearSuggestions={clearSuggestions}
		/>);

		fireEvent.change(screen.getByTestId("search-input"), { target: { value: searchText } })
		fireEvent.click(screen.getByTestId('clear-input-icon'));

		expect(screen.getByTestId("search-input").value).toBe('');
	});

	it('should clear search input through enter keypress', async () => {
		render(<SearchInput
			searchText={searchText}
			startSearch={debounceSearch}
			setSearchSuggestions={setSearchSuggestions}
			clearSuggestions={clearSuggestions}
		/>);

		fireEvent.change(screen.getByTestId("search-input"), { target: { value: searchText } })
		fireEvent.keyPress(screen.getByTestId('clear-input-icon'), { key: 'Enter', charCode: 13 });

		expect(screen.getByTestId("search-input").value).toBe('');
	});

	it('should show search results page when clicked on search icon', async () => {
		render(<SearchInput
			searchText={searchText}
			startSearch={debounceSearch}
			setSearchSuggestions={setSearchSuggestions}
			clearSuggestions={clearSuggestions}
		/>);

		fireEvent.change(screen.getByTestId("search-input"), { target: { value: searchText } })
		fireEvent.click(screen.getByTestId('search-input-icon'));

		const showSearchesContainer = screen.getByTestId("show-search-results");
		expect(showSearchesContainer).toBeInTheDocument();

		showSearchesContainer.childNodes.forEach((element, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(element).toHaveAttribute('data-testid', currentElementAttribute);
		});
	});

	it('should show search results page when enter keypress is registered on search icon', async () => {
		render(<SearchInput
			searchText={searchText}
			startSearch={debounceSearch}
			setSearchSuggestions={setSearchSuggestions}
			clearSuggestions={clearSuggestions}
		/>);

		fireEvent.change(screen.getByTestId("search-input"), { target: { value: searchText } })
		fireEvent.keyPress(screen.getByTestId('search-input-icon'), { key: 'Enter', charCode: 13 });

		const showSearchesContainer = screen.getByTestId("show-search-results");
		expect(showSearchesContainer).toBeInTheDocument();

		showSearchesContainer.childNodes.forEach((element, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(element).toHaveAttribute('data-testid', currentElementAttribute);
		});
	});
});