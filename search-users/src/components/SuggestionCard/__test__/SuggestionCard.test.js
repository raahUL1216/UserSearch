
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SuggestionCard from '../SuggestionCard';
import ShowUserPage from '../../../pages/ShowUserPage/ShowUserPage';
import { userSearchResponse } from '../../../testing/mock_responses/mockResponses';
import { clickOn, focusElement, pressEnterOn } from '../../../testing/CommonTestFunctions';

const index = 0;
const suggestion = userSearchResponse ? userSearchResponse[0] : [];
const mockedHighlightSuggestion = jest.fn();

const MockSuggestionCardContainer = () => {
	return (
		<Router>
			<SuggestionCard
				key={index}
				suggestion={suggestion}
				highlightSuggestion={mockedHighlightSuggestion}
				index={index}
			/>
			<Switch>
				<Route path="/user">
					<ShowUserPage />
				</Route>
			</Switch>
		</Router>
	)
}

describe('Suggestion card', () => {
	it('should render suggestion card', () => {
		render(
			<SuggestionCard
				key={index}
				suggestion={suggestion}
				highlightSuggestion={mockedHighlightSuggestion}
				index={index}
			/>
		);

		const suggestionCardElement = screen.getByTestId('suggestion-' + index);
		expect(suggestionCardElement).toBeInTheDocument();
	});

	describe('Show User Page', () => {
		it('should show user page when clicked on suggestion', async () => {
			render(<MockSuggestionCardContainer />);

			const suggestionElement = screen.getByTestId('suggestion-0');
			expect(suggestionElement).toBeInTheDocument();
			clickOn(suggestionElement);

			const userPageContainer = await screen.findByTestId('show-user-page');
			expect(userPageContainer).toBeInTheDocument();
		});

		it('should show user page when pressed enter key is pressed on focused suggestion', async () => {
			render(<MockSuggestionCardContainer />);

			const suggestionElement = screen.getByTestId('suggestion-0');
			expect(suggestionElement).toBeInTheDocument();
			focusElement(suggestionElement);
			pressEnterOn(suggestionElement);

			const userPageContainer = await screen.findByTestId('show-user-page');
			expect(userPageContainer).toBeInTheDocument();
		});
	})
})