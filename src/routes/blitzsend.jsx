import React from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Blitzsend() {
	const [inputData, setInputData] = React.useState({
		messageTitle: '',
		messageAuthor: '',
		messagePassword: '',
		messageContent: '',
		isShown: false,
		testKey: '',
		locked: true,
	});

	const messagesCollectionRef = collection(db, 'messages');
	const sendMessage = async () => {
		await addDoc(messagesCollectionRef, inputData);
	};
	const inputs = [];
	for (let input in inputData) {
		if (input.slice(0, 7) === 'message') inputs.push(input);
	}
	const inputField = inputs.map((input) => {
		return (
			<div className='container input' key={input}>
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
		if (inputData.messageTitle.trim() === '') {
			alert('Please enter message title');
			return;
		} else if (inputData.messageAuthor.trim() === '') {
			alert('Please enter message author');
			return;
		} else if (inputData.messagePassword.trim() === '') {
			alert('Please enter a password');
			return;
		} else if (inputData.messageContent.trim() === '') {
			alert('Please enter message content');
			return;
		} else {
			sendMessage();
		}
	};
	return (
		<main>
			<header>
				<h2>Blitzsend</h2>
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
