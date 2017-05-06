'use strict';

const datepicker = document.querySelector("#flatpickr");
const datepicker_nav = document.querySelector("#flatpickr-nav");

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
	disableMobile: "true",
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
	const config = {
		method: 'get',
		mode: 'cors',
		header: new Headers({'Content-Type': 'application/json'})
	}

	fetch(`http://api-pspbg.azurewebsites.net/v1/events/${date}`, config)
		.then(response => response.json())
		.then(events => showEvents(events, date))
		.catch(err => noEvents());
}

function showEvents(events, date) {
	let table = `
		<table class="mt-2 striped">
			<thead>
				<tr>
					<th data-field="time">Hora</th>
					<th data-field="description">Descrição</th>
				</tr>
			</thead>
			<tbody>
	`;

	events.forEach(function(item, key) {
		let time = formatTime(item.date);

		table += `
			<tr>
				<td>${time}</td>
				<td>${item.description}</td>
			</tr>
		`;
	});

	table += `</tbody></table>`;

	if (0 === events.length)
		noEvents();
	else
		document.querySelector('#lista-eventos').innerHTML = table;
}

function formatTime(date) {
	const time_zone = new Date().getTimezoneOffset() / 60;

	const new_date = new Date(date);

	// Passa o time_zone local `-03:00` ou `-02:00` (horário de verão)  
	let hora = new_date.getHours() + time_zone;
	hora = 1 === hora.toString().length ? '0' + hora : hora;

	let minuto = new_date.getMinutes();
	minuto = 1 === minuto.toString().length ? '0' + minuto : minuto;

	let segundo = new_date.getSeconds();
	segundo = 1 === segundo.toString().length ? '0' + segundo : segundo;

	return `${hora}:${minuto}`;
}

const noEvents = () => {
	document.querySelector('#lista-eventos').innerHTML = `<div class="center-align mt-10"><h5>Nenhum evento para esta data</h5></div>`;
}