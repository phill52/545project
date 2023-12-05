const timeElapsed = (shifts) => {
	//calculates the time and returns it as hours and minutes
	let total = 0;
	for (let shift of shifts) {
		total += shift.end - shift.start;
	}
	total = Math.floor(total / 1000);
	total = Math.floor(total / 3600);
	let minutes = Math.floor((total / 60) % 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	total = `${total} hours, ${minutes} minutes`;
	return total;
};

const totalPay = (shifts, payrate) => {
	//calculates the total pay for the project
	let total = 0;
	for (let shift of shifts) {
		total += shift.end - shift.start;
	}
	total = Math.floor(total / 1000);
	total = Math.floor(total / 3600);
	total = total * payrate;
	return total;
};

const formatDateTime = (date) => {
	// Pad with a zero if the number is less than 10
	function pad(number) {
		return number < 10 ? "0" + number : number;
	}

	let month = pad(date.getMonth() + 1); // getMonth() returns months from 0-11
	let day = pad(date.getDate());
	let year = date.getFullYear();
	let hour = date.getHours() % 12;
	let minute = pad(date.getMinutes());
	let period = hour > 12 ? "PM" : "AM";
	return `${month}/${day}/${year} ${hour}:${minute} ${period}`;
};

const hoursDifference = (datetime1, datetime2) => {
	//outputs 6.2
	// Calculate difference in milliseconds
	let differenceInMilliseconds = Math.abs(datetime1 - datetime2);
	// Convert milliseconds to hours and round to two decimal places
	let differenceInHours = (
		differenceInMilliseconds /
		(1000 * 60 * 60)
	).toFixed(2);
	return `${differenceInHours} hours`;
};

const hoursDifference2 = (datetime1, datetime2) => {
	//outputs '6 hours, 12 minutes'
	// Calculate the absolute difference in milliseconds
	let differenceInMilliseconds = Math.abs(datetime1 - datetime2);

	// Convert milliseconds to minutes and hours
	let totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
	let hours = Math.floor(totalMinutes / 60);
	let minutes = totalMinutes % 60;

	return `${hours} hours, ${minutes} minutes`;
};

export {
	timeElapsed,
	totalPay,
	formatDateTime,
	hoursDifference,
	hoursDifference2,
};
