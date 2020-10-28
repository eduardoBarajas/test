import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import * as serviceWorker from './serviceWorker';
import {About, Home, Users, Splash, IndexClients, DashboardStore, ViewNotFound, LogIn} from './views/views';
import { Footer, MapView} from './components/components';
import NavigationBar from './components/shared/NavigationBar';
import React, {Component, useState} from 'react'; 
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './assets/js/theme';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import IndexStore from './views/stores';


const App = () => {
	const [showSplash, setSplash] = useState(false);
	return (
		(showSplash) ? 
		<Splash onLoadingComplete={(loading_state: boolean) => { setSplash(loading_state)}}/> :
		<div>
			{/* A <Switch> looks through its children <Route>s and
				renders the first one that matches the current URL. */}
			<NavigationBar/>	
			<Switch>
				<Route path="/Clientes">
					<IndexClients/>
				</Route>
				<Route path="/Tiendas">
					<IndexStore/>
				</Route>
				<Route exact path="/">
					<LogIn />
				</Route>
				<Route path="*">
					<ViewNotFound />
				</Route>
			</Switch>	
		</div>
	)
}

ReactDOM.render(
  <React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			<Router>
				<CssBaseline />
				<App/>
			</Router>
  		</ThemeProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();