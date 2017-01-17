'use strict';

let datepicker = document.querySelector("#flatpickr");
let datepicker_nav = document.querySelector("#flatpickr-nav");

datepicker.flatpickr({
	locale: 'pt',
	inline: true, // show the calendar inline
	altInput: true, 
	altFormat: 'd/m/Y'
});

datepicker_nav.flatpickr({
	locale: 'pt'
});

var ajax = function(url, method, callback, data) { 
	
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

function handleResponse(obj) {
	console.log(obj);
}

ajax('http://localhost:5000/api/eventos/error', 'GET', handleResponse, {});