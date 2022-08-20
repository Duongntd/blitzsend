import './App.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { HeaderSimple } from './components/Header.tsx';

function App() {
	return (
		<div>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<HeaderSimple
					links={[
						{ link: '/', label: 'Home' },
						{ link: '/blitzsend', label: 'Blitzsend' },
						{ link: '/blitzcatch', label: 'Blitzcatch' },
						{ link: '/about', label: 'About' },
					]}></HeaderSimple>
				<Outlet />
			</MantineProvider>
		</div>
	);
}

export default App;
