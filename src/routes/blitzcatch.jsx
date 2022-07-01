import React from 'react';
import { db } from '../firebase/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';

export default function Blitzcatch() {
	const [data, setData] = React.useState([]);
	const [passCheck, setPassCheck] = React.useState({});
	const messagesCollectionRef = collection(db, 'messages');

	// get all messages
	React.useEffect(() => {
		const getMessages = async () => {
			const data = await getDocs(messagesCollectionRef);
			setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getMessages();
	}, [messagesCollectionRef]);

	// password test and unlock
	const passTest = async (id, locked) => {
		const docRef = doc(db, 'messages', id);
		const docSnap = await getDoc(docRef);
		const docData = docSnap.data();
		if (passCheck[id] === docData.messagePassword) {
			await updateDoc(docRef, { locked: !locked, isShown: false });
			setPassCheck({ ...passCheck, [id]: '' });
		} else {
			alert('Wrong password!');
			return;
		}
	};

	// delete message
	const deleteMessage = async (id, demo) => {
		const docRef = doc(db, 'messages', id);
		if (!demo) {
			await deleteDoc(docRef);
			return;
		} else if (demo) {
			alert('Cannot delete demo content');
			return;
		} else {
			alert('Wrong password!');
			return;
		}
	};

	// show content
	const toggleContent = async (id, isShown) => {
		const docRef = doc(db, 'messages', id);
		await updateDoc(docRef, { isShown: !isShown });
	};

	// display messages
	const messageList = data.map((message) => {
		return (
			<div key={message.id}>
				<h2>{message.messageTitle}</h2>
				<p>{message.isShown && message.messageContent}</p>

				<label htmlFor='messagePassword'>Password: </label>
				<input
					type='password'
					id={message.id}
					name={message.id}
					onChange={(e) =>
						setPassCheck({ ...passCheck, [message.id]: e.target.value })
					}
					value={passCheck[message.id] || ''}
				/>
				<button onClick={() => passTest(message.id, message.locked)}>
					{message.locked ? 'Unlock' : 'Lock'}
				</button>
				{!message.locked && (
					<div>
						<button onClick={() => toggleContent(message.id, message.isShown)}>
							{' '}
							{message.isShown ? 'Hide' : 'Show'} content
						</button>

						<button onClick={() => deleteMessage(message.id, message.demo)}>
							Delete
						</button>
					</div>
				)}
			</div>
		);
	});

	return (
		<main style={{ padding: '1rem 0' }}>
			<h2>Blitzcatch</h2>
			{messageList}
		</main>
	);
}
