'use strict';

let datepicker = document.getElementById("flatpickr");

datepicker.flatpickr({
	inline: true, // show the calendar inline
});

console.log(datepicker.value())