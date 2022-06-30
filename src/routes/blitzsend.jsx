import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Blitzsend() {
	const location = useLocation();
	const handleSubmit = location.state;
	const [inputData, setInputData] = React.useState({
		messageTitle: '',
		messageAuthor: '',
		messagePassword: '',
		messageContent: '',
	});

	const inputs = [];
	for (let input in inputData) {
		inputs.push(input);
	}
	const inputField = inputs.map((input) => {
		return (
			<div className='container input'>
				<label htmlFor={input}>{input.slice(7)}</label>
				<input
					type={input === 'messagePassword' ? 'password' : 'text'}
					id={input}
					name={input}
					value={inputData.input}
					onChange={(event) => {
						setInputData({ ...inputData, [input]: event.target.value });
					}}
				/>
			</div>
		);
	});

	return (
		<main>
			<header>
				<h1>Blitzsend</h1>
			</header>
			<section className='form-input'>
				<form onSubmit={(event) => handleSubmit(event, inputData)}>
					<button>Submit</button>
				</form>
				{inputField}
			</section>
		</main>
	);
}
