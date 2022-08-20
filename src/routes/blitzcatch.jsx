import React from 'react';
import { db } from '../firebase/firebase';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';

export default function Blitzcatch() {
	const [data, setData] = React.useState([]);
	const [passCheck, setPassCheck] = React.useState({});
	const messagesCollectionRef = collection(db, 'messages');

	// get all messages
	React.useEffect(() => {
		const getMessages = async () => {
			try {
				const data = await getDocs(messagesCollectionRef);
				setData(
					data.docs.map((doc) => ({
						...doc.data(),
						id: doc.id,
						isShown: false,
						locked: true,
					}))
				);
			} catch (err) {
				console.log('Error getting message: ', err);
			}
		};
		getMessages();
	}, []);

	// password test and unlock
	const passTest = (id) => {
		const thisDoc = data.find((doc) => doc.id === id);
		if (passCheck[id] === thisDoc.messagePassword) {
			setData(
				data.map((doc) => {
					if (doc.id === id) return { ...doc, locked: !doc.locked };
					else return doc;
				})
			);
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
			try {
				await deleteDoc(docRef);
				setData(data.filter((doc) => doc.id !== id));
			} catch (err) {
				console.log('Error deleting doc: ', err);
			}
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
	const toggleContent = (id) => {
		setData(
			data.map((doc) => {
				if (doc.id === id) return { ...doc, isShown: !doc.isShown };
				else return doc;
			})
		);
	};

	// display messages
	const messageList = data.map((message) => {
		let convertedTimer = message.timer / 60000;
		return (
			<div key={message.id}>
				<h2>{message.messageTitle}</h2>
				<p>{message.isShown && message.messageContent}</p>
				<p>Timer: {convertedTimer} Mins</p>

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
						<button onClick={() => toggleContent(message.id)}>
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

	return <main>{messageList}</main>;
}
