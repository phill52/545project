const timeElapsed = (shifts) => {
	let totalMilliseconds = 0;
	for (let shift of shifts) {
		if (shift.end) {
			totalMilliseconds += shift.end - shift.start;
		} else {
			totalMilliseconds += Date.now() - shift.start;
		}
	}
	let totalMinutes = Math.floor(totalMilliseconds / 60000);
	let hours = Math.floor(totalMinutes / 60);
	let minutes = totalMinutes % 60;
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	return `${hours} hours, ${minutes} minutes`;
};

const totalPay = (shifts, payrate) => {
	//calculates the total pay for the project
	let total = 0;
	for (let shift of shifts) {
		if (shift.end) {
			total += shift.end - shift.start;
		} else {
			total += Date.now() - shift.start;
		}
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
	if (hour === 0) {
		hour = 12;
	}
	let period = hour > 12 ? "AM" : "PM";
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

function generateRandomId() {
	// Use the current time in milliseconds for the first part of the ID
	const timePart = new Date().getTime();

	// Generate a crypto-random number for the second part of the ID
	const randomPart = window.crypto.getRandomValues(new Uint32Array(1))[0];

	// Combine the time and random parts to create the ID
	const combinedNumber = timePart + randomPart;

	// Ensure the number is within the safe integer range
	return combinedNumber % Number.MAX_SAFE_INTEGER;
}

export {
	timeElapsed,
	totalPay,
	formatDateTime,
	hoursDifference,
	hoursDifference2,
	generateRandomId,
};
