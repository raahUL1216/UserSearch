import React from 'react';
import { render, screen } from '@testing-library/react';
import SuggestionCards from '../SuggestionCards';
import { userSearchResponse } from '../../../testing/mock_responses/mockResponses';
import { focusElement, mouseOverElement } from '../../../testing/CommonTestFunctions';

const searchText = 'john';

const checkIfSuggestionCardsPresent = () => {
	const suggestionCardsContainer = screen.getByTestId('suggestion-list');
	expect(suggestionCardsContainer).toBeInTheDocument();

	suggestionCardsContainer.childNodes.forEach((element, index) => {
		const currentTestIdValue = 'suggestion-' + index;
		expect(element).toHaveAttribute('data-testid', currentTestIdValue);
	});
}

describe('Suggestion cards', () => {
	describe('Show Suggestions', () => {
		it('should render suggestions cards', () => {
			render(
				<SuggestionCards
					searchText={searchText}
					searchSuggestions={userSearchResponse}
				/>
			);

			checkIfSuggestionCardsPresent();
		});
	});

	describe('Hightlight Suggestion', () => {
		it('should highlight suggestion on mouse hover', async () => {
			render(
				<SuggestionCards
					searchText={searchText}
					searchSuggestions={userSearchResponse}
				/>
			);

			checkIfSuggestionCardsPresent();

			const suggestionCardElement = screen.getByTestId('suggestion-0');

			mouseOverElement(suggestionCardElement);
			expect(suggestionCardElement).toHaveClass('selected-suggestion');
		});

		it('should highlight suggestion on focus', () => {
			render(
				<SuggestionCards
					searchText={searchText}
					searchSuggestions={userSearchResponse}
				/>
			);

			const suggestionCardElement = screen.getByTestId('suggestion-0');

			focusElement(suggestionCardElement);
			expect(suggestionCardElement).toHaveClass('selected-suggestion');
		});
	});
});