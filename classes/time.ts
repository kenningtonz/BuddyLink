type time = {
	hour: number;
	minute: number;
};

function timeToString(time: time) {
	const isAM = time.hour < 12;
	return `${time.hour % 12}:${time.minute.toString().padStart(2, "0")} ${
		isAM ? "AM" : "PM"
	}`;
}

export { time, timeToString };
