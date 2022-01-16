import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import ShowUserSearchesPage from './pages/ShowUserSearchesPage/ShowUserSearchesPage';
import ShowUserPage from './pages/ShowUserPage/ShowUserPage';
import SearchContainer from './components/SearchContainer/SearchContainer';

function App() {
	return (
		<Router>
			<Switch>

				{/* user search page */}
				<Route exact path="/">
					<SearchContainer />
				</Route>
				{/* user search results page */}
				<Route path="/searches/:searchText">
					<ShowUserSearchesPage />
				</Route>

				{/* user details page */}
				<Route path="/user">
					<ShowUserPage />
				</Route>

			</Switch>
		</Router>
	);
}

export default App;
