import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blitzsend from './routes/blitzsend';
import Blitzcatch from './routes/blitzcatch';
import About from './routes/about';
import Home from './routes/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route path='blitzsend' element={<Blitzsend />} />
				<Route path='blitzcatch' element={<Blitzcatch />} />
				<Route path='about' element={<About />} />
				<Route path='/' element={<Home />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
