import './App.css';
import { Outlet, Link } from 'react-router-dom';
import React from 'react';

function App() {
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav>
				<Link to='/blitzsend'>Blitzsend</Link> |{' '}
				<Link to='/blitzcatch'>Blitzcatch</Link>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
