import './App.css';
import { Outlet, Link } from 'react-router-dom';
import React from 'react';

function App() {
	const [messageList, setMessageList] = React.useState([]);

	const handleSubmit = (event, inputData) => {
		event.preventDefault();
		setMessageList((previousMessages) => [...previousMessages, inputData]);
	};
	return (
		<div>
			<h1>Bookkeeper</h1>
			<nav
				style={{
					borderBottom: 'solid 1px',
					paddingBottom: '1rem',
				}}>
				<Link to='/blitzsend' state={handleSubmit}>
					Blitzsend
				</Link>{' '}
				|{' '}
				<Link to='/blitzcatch' state={messageList}>
					Blitzcatch
				</Link>
			</nav>
			<Outlet />
		</div>
	);
}

export default App;
