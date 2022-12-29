export const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const shortenText = (text, n) => {
	if (text.length > n) {
		const shortenedText = text.substring(0, n).concat('...');
		return shortenedText;
	}
	return text;
};

export const formatTotalStoreValue = (value) => {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
