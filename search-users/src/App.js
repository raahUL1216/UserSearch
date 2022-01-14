import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import ShowUserSearches from './pages/ShowUserSearches/ShowUserSearches';
import ShowUser from './pages/ShowUser/ShowUser';
import SearchContainer from './components/SearchContainer/SearchContainer';

function App() {
	return (
		<Router>
			<Switch>
				{/* user search results page */}
				<Route path="/searches">
					<ShowUserSearches />
				</Route>

				{/* user details page */}
				<Route path="/user">
					<ShowUser />
				</Route>

				{/* user search page */}
				<Route path="/">
					<SearchContainer />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
