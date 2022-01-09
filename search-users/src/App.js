import React from 'react';
import './App.css';
import {
	Switch,
	Route
} from "react-router-dom";
import SearchContainer from './components/SearchContainer/SearchContainer';
import ShowSearchResult from './components/ShowSearchResult/ShowSearchResult';
import ShowUser from './components/ShowUser/ShowUser';

function App() {
	return (
		<Switch>
			<Route path="/searches">
				<ShowSearchResult />
			</Route>
			<Route path="/user">
				<ShowUser />
			</Route>
			<Route path="/">
				<SearchContainer />
			</Route>
		</Switch>
	);
}

export default App;
