import { useLocation } from 'react-router-dom';

export default function Blitzcatch() {
	const location = useLocation();
	const messageList = location.state;
	return (
		<main style={{ padding: '1rem 0' }}>
			<h2>Blitzcatch</h2>
			<button onClick={messageList}>Click!</button>
		</main>
	);
}
