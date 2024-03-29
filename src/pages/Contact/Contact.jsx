import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { sendContactMessage } from '../../utils/api';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import Card from '../../components/Card/Card';
import styles from './Contact.module.scss';
import '../../styles/buttons.scss';
import useWindowDimensions from '../../customHook/useWindowDimensions';

const Contact = () => {
	useRedirectLoggedOutUser('/login');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const { height } = useWindowDimensions();

	let rows;

	if (height <= 768) {
		rows = 5;
	} else {
		rows = 10;
	}

	const contactMessage = {
		subject,
		message,
	};

	const sendEmail = async (e) => {
		e.preventDefault();
		try {
			const response = await sendContactMessage(contactMessage);
			setSubject('');
			setMessage('');

			toast.success(response.message);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div className={styles.contact}>
			<Card cardClass="contact">
				<h3>Contact Us</h3>
				<p>
					Feel free to contact us by submitting the form below and we will get
					back to you as soon as possible.
				</p>
				<div>
					<form onSubmit={sendEmail}>
						<div className={styles.contact__info}>
							<label>Subject</label>
							<input
								type="text"
								name="subject"
								placeholder="Subject"
								required
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
							/>
							<label>Message</label>
							<textarea
								name="message"
								placeholder="Write your message..."
								required
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								cols={30}
								rows={rows}
							/>
						</div>
					</form>
					<button type="submit" onClick={sendEmail} className="primary-button">
						Send message
					</button>
				</div>
			</Card>
		</div>
	);
};

export default Contact;
