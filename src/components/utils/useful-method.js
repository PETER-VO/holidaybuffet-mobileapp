// Formatted Date and Time
export const formattedDateAndTime = (dateSeconds) => {
	let date = new Date(dateSeconds * 1000);
	let hours = date.getHours();
	let minutes = '0' + date.getMinutes();
	let seconds = '0' + date.getSeconds();
	let formattedTime =
		hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	let formattedDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()}`;

	return `${formattedDate} - ${formattedTime}`;
};

export const formattedDate = (dateSeconds) => {
	let date = new Date(dateSeconds * 1000);

	let formattedDate = `${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()}`;

	return `${formattedDate}`;
};
