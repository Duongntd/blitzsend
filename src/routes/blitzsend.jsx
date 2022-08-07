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

	const onFocus = (event) => {
		event.target.placeholder = '';
		event.target.previousElementSibling.classList.add('focusing');
	};
	const onBlur = (event, index) => {
		event.target.placeholder = inputs[index].slice(7);
		event.target.previousElementSibling.classList.remove('focusing');
	};
	const inputField = inputs.map((input, index) => {
		return (
			<div className='input-container' key={input}>
				<label className='input-label' htmlFor={input}>
					{input.slice(7)}
				</label>
				<input
					type={input === 'messagePassword' ? 'password' : 'text'}
					id={input}
					name={input}
					className='input-box'
					placeholder={input.slice(7)}
					value={inputData.input}
					onChange={(event) => {
						setInputData({ ...inputData, [input]: event.target.value });
					}}
					onFocus={(event) => onFocus(event)}
					onBlur={(event) => onBlur(event, index)}
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
			<section className='form-section'>
				<form
					className='form-container'
					onSubmit={(event) => handleSubmit(event)}>
					<div className='file-type-sel'>
						<span>Text</span>
						<span>Image</span>
						<span>File</span>
					</div>
					<div className='flex'>
						<div className='input-container'>{inputField}</div>
						<label htmlFor=''>
							Set timer
							<input type='text' />
						</label>
					</div>
					<button>Submit</button>
				</form>
			</section>
		</main>
	);
}
