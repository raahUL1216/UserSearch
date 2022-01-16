import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchContainer from '../SearchContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { userSearchResponse } from '../../../testing/mock_responses/mockResponses';
import { changeInput, clickOn, pressEnterOn } from '../../../testing/CommonTestFunctions';
import ShowUserSearchesPage from '../../../pages/ShowUserSearchesPage/ShowUserSearchesPage';

const searchText = 'john',
	inputPlaceholder = 'Search users by ID, address, name, items.';

// intercept fetch api call and resolve static response
beforeEach(() => {
	jest.spyOn(global, 'fetch').mockResolvedValue({
		json: jest.fn().mockResolvedValue(userSearchResponse)
	})
});

// clear mock
afterEach(() => {
	jest.restoreAllMocks();
});

const MockSearchContainer = () => {
	return (
		<Router>
			<SearchContainer />
			<Switch>
				<Route path="/searches/:searchText">
					<ShowUserSearchesPage />
				</Route>
			</Switch>
		</Router>
	)
}

describe('User Search', () => {
	describe('User Search', () => {
		it('should be able to type in input element', () => {
			render(<SearchContainer />);

			const inputElement = screen.getByPlaceholderText(inputPlaceholder);

			changeInput(inputElement, searchText);
			expect(inputElement.value).toBe(searchText);
		});
	})

	describe('Show Search Suggestions', () => {
		it('should show search suggestions on input value change', async () => {
			render(<SearchContainer />);

			changeInput(screen.getByPlaceholderText(inputPlaceholder), searchText);

			const suggestionListElement = await screen.findByTestId("suggestion-list");
			expect(suggestionListElement).toBeInTheDocument();
			expect(suggestionListElement.childNodes.length).toBe(2);

			suggestionListElement.childNodes.forEach((element, index) => {
				const currentTestIdValue = 'suggestion-' + index;
				expect(element).toHaveAttribute('data-testid', currentTestIdValue);
			});
		});
	});

	describe('Show Search Result Page', () => {
		it('should show search results page when clicked on search icon', async () => {
			render(<MockSearchContainer />);

			changeInput(screen.getByPlaceholderText(inputPlaceholder), searchText);
			clickOn(screen.getByTestId('search-input-icon'));

			const showSearchesContainer = await screen.findByTestId("show-search-results");
			expect(showSearchesContainer).toBeInTheDocument();

			showSearchesContainer.childNodes.forEach((element, index) => {
				const currentTestIdValue = 'suggestion-' + index;
				expect(element).toHaveAttribute('data-testid', currentTestIdValue);
			});
		});

		it('should show search results page when enter key is registered on search icon', async () => {
			render(<MockSearchContainer />);

			changeInput(screen.getByPlaceholderText(inputPlaceholder), searchText);
			pressEnterOn(screen.getByTestId('search-input-icon'));

			const showSearchesContainer = await screen.findByTestId("show-search-results");
			expect(showSearchesContainer).toBeInTheDocument();

			showSearchesContainer.childNodes.forEach((element, index) => {
				const currentTestIdValue = 'suggestion-' + index;
				expect(element).toHaveAttribute('data-testid', currentTestIdValue);
			});
		});
	});

	describe('Clear Search Input', () => {
		it('should clear search input on close icon click', async () => {
			render(<SearchContainer />);

			changeInput(screen.getByPlaceholderText(inputPlaceholder), searchText);
			clickOn(screen.getByTestId('clear-input-icon'));

			const inputElement = await screen.findByTestId('search-input');
			expect(inputElement.value).toBe('');
		});

		it('should clear search input when enter key is registered on close icon', async () => {
			render(<SearchContainer />);

			changeInput(screen.getByPlaceholderText(inputPlaceholder), searchText);
			pressEnterOn(screen.getByTestId('clear-input-icon'));

			const inputElement = await screen.findByTestId('search-input');
			expect(inputElement.value).toBe('');
		});
	});
});