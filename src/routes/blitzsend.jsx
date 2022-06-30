import React from 'react';

export default function Blitzsend() {
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

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputData);
	};
	return (
		<main>
			<header>
				<h1>Blitzsend</h1>
			</header>
			<section className='form-input'>
				<form onSubmit={(event) => handleSubmit(event)}>
					<button>Submit</button>
				</form>
				{inputField}
			</section>
		</main>
	);
}
