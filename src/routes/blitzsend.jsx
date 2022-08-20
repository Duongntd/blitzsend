import React from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { Button } from '@mantine/core';

export default function Blitzsend() {
	const [inputData, setInputData] = React.useState({
		messageTitle: '',
		messageAuthor: '',
		messagePassword: '',
		messageContent: '',
		timer: 300000,
	});

	const messagesCollectionRef = collection(db, 'messages');
	const sendMessage = async () => {
		try {
			const thisDoc = await addDoc(messagesCollectionRef, inputData);
			const docRef = doc(db, 'messages', thisDoc.id);
			setTimeout(async () => {
				await deleteDoc(docRef);
			}, inputData.timer);
		} catch (err) {
			console.log(err);
		}
	};
	const inputs = [];
	for (let input in inputData) {
		if (input.slice(0, 7) === 'message') inputs.push(input);
	}

	const onFocus = (event) => {
		event.target.placeholder = '';
		event.target.previousElementSibling.classList.add('focusing');
	};
	const onBlur = (event, placeholder) => {
		event.target.placeholder = placeholder;
		event.target.previousElementSibling.classList.remove('focusing');
	};

	const autoFill = (event) => {
		event.preventDefault();
		setInputData((prev) => {
			return {
				...inputData,
				messageAuthor: prev.messageAuthor || 'admin',
				messagePassword: prev.messagePassword || 'admin',
				messageTitle: prev.messageTitle || 'admin',
			};
		});
	};

	const clearInputData = () => {
		setInputData({
			...inputData,
			messageTitle: '',
			messageAuthor: '',
			messagePassword: '',
			messageContent: '',
		});
	};
	const validateInput = () => {
		if (inputData.messageTitle.trim() === '') {
			alert('Please enter message title');
			return false;
		} else if (inputData.messageAuthor.trim() === '') {
			alert('Please enter message author');
			return false;
		} else if (inputData.messagePassword.trim() === '') {
			alert('Please enter a password');
			return false;
		} else if (inputData.messageContent.trim() === '') {
			alert('Please enter message content');
			return false;
		} else return true;
	};
	const handleSubmit = () => {
		if (validateInput()) {
			sendMessage();
			clearInputData();
		}
	};
	return (
		<main>
			<section className='form-section'>
				<form className='form-container'>
					<div className='file-type-sel'>
						<span>Text</span>
						<span>Image</span>
						<span>File</span>
					</div>
					<div className='flex'>
						<div className='input-container'>
							<div className='input-container'>
								<label className='input-label' htmlFor='title'>
									Title
								</label>
								<input
									type='text'
									id='title'
									name='title'
									className='input-box'
									placeholder='Title'
									value={inputData.messageTitle}
									onChange={(event) => {
										setInputData({
											...inputData,
											messageTitle: event.target.value,
										});
									}}
									onFocus={(event) => onFocus(event)}
									onBlur={(event) => onBlur(event, 'Title')}
								/>
							</div>
							<div className='input-container'>
								<label className='input-label' htmlFor='author'>
									Author
								</label>
								<input
									type='text'
									id='author'
									name='author'
									className='input-box'
									placeholder='Author'
									value={inputData.messageAuthor}
									onChange={(event) => {
										setInputData({
											...inputData,
											messageAuthor: event.target.value,
										});
									}}
									onFocus={(event) => onFocus(event)}
									onBlur={(event) => onBlur(event, 'Author')}
								/>
							</div>
							<div className='input-container'>
								<label className='input-label' htmlFor='password'>
									Password
								</label>
								<input
									type='password'
									id='password'
									name='password'
									className='input-box'
									placeholder='Password'
									value={inputData.messagePassword}
									onChange={(event) => {
										setInputData({
											...inputData,
											messagePassword: event.target.value,
										});
									}}
									onFocus={(event) => onFocus(event)}
									onBlur={(event) => onBlur(event, 'Password')}
								/>
							</div>
							<div className='input-container'>
								<label className='input-label' htmlFor='content'>
									Content
								</label>
								<input
									type='text'
									id='content'
									name='content'
									className='input-box'
									placeholder='Content'
									value={inputData.messageContent}
									onChange={(event) => {
										setInputData({
											...inputData,
											messageContent: event.target.value,
										});
									}}
									onFocus={(event) => onFocus(event)}
									onBlur={(event) => onBlur(event, 'Content')}
								/>
							</div>
							<Button onClick={(event) => autoFill(event)}>Auto fill</Button>
						</div>
						<label htmlFor='timer'>
							Set Timer
							<select
								name='timer'
								id='timer'
								value={inputData.timer}
								onChange={(event) =>
									setInputData({ ...inputData, timer: event.target.value })
								}>
								<option value='300000'>5 Mins</option>
								<option value='1800000'>30 Mins</option>
								<option value='3600000'>1 Hour</option>
							</select>
						</label>
					</div>
					<Button onClick={() => handleSubmit()}>Submit</Button>
				</form>
			</section>
		</main>
	);
}
