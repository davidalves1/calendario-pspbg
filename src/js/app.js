'use strict';

let datepicker = document.querySelector("#flatpickr");
let datepicker_nav = document.querySelector("#flatpickr-nav");

datepicker.flatpickr({
	locale: 'pt',
	inline: true, // show the calendar inline
	defaultDate: new Date()
});

datepicker_nav.flatpickr({
	locale: 'pt',
	defaultDate: new Date()
});

var ajax = function(url, method, data, callback) { 
	
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			callback({
				status: xhr.status,
				response: xhr.responseText
			});
		}
	};

	xhr.onerror = function (e) {
		callback({
			status: xhr.statusText,
			response: xhr.statusText
		});
	};

	xhr.send(data);
};

ajax('https://api.github.com/users/davidalves1', 'GET', {}, function(data) {
	if (data.status !== 200)
		console.log('Error ' + data.status);
	else
		console.log('Sucesso!');
});