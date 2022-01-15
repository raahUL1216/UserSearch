
import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import SuggestionCards from './SuggestionCards';

describe('Search suggestions', () => {
	it('should show search suggestions on user search', async () => {
		const searchText = 'john',
			searchSuggestions = [{ "id": "323-s2-112", "name": "John Michael", "items": ["Refrigerator"], "address": "1st Cross, 9th Main, abc Apartement", "pincode": "5xx012", "highlights": [{ "score": 6.977623462677002, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Michael", "type": "text" }] }] }, { "id": "123-s2-546", "name": "John Jacobs", "items": ["bucket", "bottle"], "address": "1st Cross, 9th Main, abc Apartment", "pincode": "5xx012", "highlights": [{ "score": 6.9937334060668945, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Jacobs", "type": "text" }] }] }];

		render(<SuggestionCards searchText={searchText} searchSuggestions={searchSuggestions} />);

		const suggestionList = screen.getByTestId('suggestion-list');
		expect(suggestionList).toBeInTheDocument();

		suggestionList.childNodes.forEach((suggestionElement, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(suggestionElement).toHaveAttribute('data-testid', currentElementAttribute);
		});
	});

	it('should highlight suggestion on mouse hover', async () => {
		const searchText = 'john',
			searchSuggestions = [{ "id": "323-s2-112", "name": "John Michael", "items": ["Refrigerator"], "address": "1st Cross, 9th Main, abc Apartement", "pincode": "5xx012", "highlights": [{ "score": 6.977623462677002, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Michael", "type": "text" }] }] }, { "id": "123-s2-546", "name": "John Jacobs", "items": ["bucket", "bottle"], "address": "1st Cross, 9th Main, abc Apartment", "pincode": "5xx012", "highlights": [{ "score": 6.9937334060668945, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Jacobs", "type": "text" }] }] }];

		render(<SuggestionCards searchText={searchText} searchSuggestions={searchSuggestions} />);

		const suggestionList = screen.getByTestId('suggestion-list');
		expect(suggestionList).toBeInTheDocument();

		suggestionList.childNodes.forEach((suggestionElement, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(suggestionElement).toHaveAttribute('data-testid', currentElementAttribute);
		});

		fireEvent.mouseOver(screen.getByTestId('suggestion-0'));

		expect(screen.getByTestId('suggestion-0')).toHaveClass('selected-suggestion');
	});

	it('should highlight suggestion on focus', async () => {
		const searchText = 'john',
			searchSuggestions = [{ "id": "323-s2-112", "name": "John Michael", "items": ["Refrigerator"], "address": "1st Cross, 9th Main, abc Apartement", "pincode": "5xx012", "highlights": [{ "score": 6.977623462677002, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Michael", "type": "text" }] }] }, { "id": "123-s2-546", "name": "John Jacobs", "items": ["bucket", "bottle"], "address": "1st Cross, 9th Main, abc Apartment", "pincode": "5xx012", "highlights": [{ "score": 6.9937334060668945, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Jacobs", "type": "text" }] }] }];

		render(<SuggestionCards searchText={searchText} searchSuggestions={searchSuggestions} />);

		const suggestionList = screen.getByTestId('suggestion-list');
		expect(suggestionList).toBeInTheDocument();

		suggestionList.childNodes.forEach((suggestionElement, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(suggestionElement).toHaveAttribute('data-testid', currentElementAttribute);
		});

		fireEvent.focus(screen.getByTestId('suggestion-0'));

		expect(screen.getByTestId('suggestion-0')).toHaveClass('selected-suggestion');
	});

	it('should show user page when clicked on suggestion', async () => {
		const searchText = 'john',
			searchSuggestions = [{ "id": "323-s2-112", "name": "John Michael", "items": ["Refrigerator"], "address": "1st Cross, 9th Main, abc Apartement", "pincode": "5xx012", "highlights": [{ "score": 6.977623462677002, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Michael", "type": "text" }] }] }, { "id": "123-s2-546", "name": "John Jacobs", "items": ["bucket", "bottle"], "address": "1st Cross, 9th Main, abc Apartment", "pincode": "5xx012", "highlights": [{ "score": 6.9937334060668945, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Jacobs", "type": "text" }] }] }];

		render(<SuggestionCards searchText={searchText} searchSuggestions={searchSuggestions} />);

		const suggestionList = screen.getByTestId('suggestion-list');
		expect(suggestionList).toBeInTheDocument();

		suggestionList.childNodes.forEach((suggestionElement, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(suggestionElement).toHaveAttribute('data-testid', currentElementAttribute);
		});

		fireEvent.click(screen.getByTestId('suggestion-0'));

		expect(screen.getByTestId('show-user-page')).toBeInTheDocument();
	});

	it('should show user page when pressed enter key on suggestion', async () => {
		const searchText = 'john',
			searchSuggestions = [{ "id": "323-s2-112", "name": "John Michael", "items": ["Refrigerator"], "address": "1st Cross, 9th Main, abc Apartement", "pincode": "5xx012", "highlights": [{ "score": 6.977623462677002, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Michael", "type": "text" }] }] }, { "id": "123-s2-546", "name": "John Jacobs", "items": ["bucket", "bottle"], "address": "1st Cross, 9th Main, abc Apartment", "pincode": "5xx012", "highlights": [{ "score": 6.9937334060668945, "path": "name", "texts": [{ "value": "John", "type": "hit" }, { "value": " Jacobs", "type": "text" }] }] }];

		render(<SuggestionCards searchText={searchText} searchSuggestions={searchSuggestions} />);

		const suggestionList = screen.getByTestId('suggestion-list');
		expect(suggestionList).toBeInTheDocument();

		suggestionList.childNodes.forEach((suggestionElement, index) => {
			const currentElementAttribute = 'suggestion-' + index;
			expect(suggestionElement).toHaveAttribute('data-testid', currentElementAttribute);
		});

		fireEvent.keyPress(screen.getByTestId('suggestion-0'), { key: 'Enter', charCode: 13 });

		expect(screen.getByTestId('show-user-page')).toBeInTheDocument();
	});
});