import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ContactCard from '../../components/Cards/ContactCard/ContactCard';
import { sendContactMessage } from '../../utils/api';
import styles from './Contact.module.scss';
import '../../styles/buttons.scss';

const Contact = () => {
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

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
			toast.error(error.message);
		}
	};
	return (
		<div className={styles.contact}>
			<ContactCard>
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
								rows={10}
							/>
						</div>
					</form>
					<button className="primary-button">Send message</button>
				</div>
			</ContactCard>
		</div>
	);
};

export default Contact;
