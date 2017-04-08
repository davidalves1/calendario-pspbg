'use strict';

let datepicker = document.querySelector("#flatpickr");
let datepicker_nav = document.querySelector("#flatpickr-nav");

datepicker.flatpickr({
	locale: 'pt',
	inline: true, // show the calendar inline
	defaultDate: new Date(),
	onReady: readyDate,
	onChange: changeDate
});

datepicker_nav.flatpickr({
	locale: 'pt',
	defaultDate: new Date(),
	onReady: readyDate,
	onChange: changeDate
});

function changeDate(selectedDates, dateStr) {
    return getEvents(dateStr);
}

function readyDate(selectedDates, dateStr) {
    return getEvents(dateStr);
}

function getEvents(date) {
	fetch('./events.json')
		.then(response => response.json())
		.then(events => showEvents(events, date))
		.catch(err => []);
}

function showEvents(events, date) {
	let result = events.filter((element) => {
		return element.date.indexOf(date) !== -1;
	})

	let table = `
		<table class="mt-2 striped">
			<thead>
				<tr>
					<th data-field="time" style="text-align: left;">Hora</th>
					<th data-field="description" style="text-align: left;">Descrição</th>
				</tr>
			</thead>
			<tbody>
	`;

	result.forEach(function(item, key) {
		let time = formatTime(item.date);

		table += `
			<tr>
				<td>${time}</td>
				<td>${item.description}</td>
			</tr>
		`;
	});

	table += `</tbody></table>`;

	document.querySelector('#lista-eventos').innerHTML = table;
}

function formatTime(date) {
	let time_zone = `-0${new Date().getTimezoneOffset() / 60}:00`;

	// Passa o time_zone local `-03:00` ou `-02:00` (horário de verão)  
	let new_date = new Date(`${date}${time_zone}`);

	let hora = new_date.getHours();
	hora = 1 === hora.toString().length ? '0' + hora : hora;

	let minuto = new_date.getMinutes();
	minuto = 1 === minuto.toString().length ? '0' + minuto : minuto;

	let segundo = new_date.getSeconds();
	segundo = 1 === segundo.toString().length ? '0' + segundo : segundo;

	return `${hora}:${minuto}`;
}