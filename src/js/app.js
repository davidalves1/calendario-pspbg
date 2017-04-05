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

let ajax = function(config, callback) { 
	
	const xhr = new XMLHttpRequest();
	
	xhr.open(config.method, config.url, true);
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
			status: xhr.status,
			response: xhr.statusText
		});
	};

	xhr.send(config.data);
};

const config = {
	url: 'https://api.github.com/users/davidalves1',
	method: 'GET',
	data: {}
}

ajax(config, function(data) {
	if (200 !== data.status)
		console.log(`Error - status: ${data.status}, response: ${data.response}`);
	else
		console.log('Sucesso!');
});

let result = [
	{
		id: 1,
		date: '2017-03-01T19:00:00',
		description: 'Missa de Cinzas - Pe. Luismar'
	},
	{
		id: 2,
		date: '2017-03-05T19:00:00',
		description: 'Missa de Quaresma - Pe. Malvino \n\n A única área que eu acho, que vai exigir muita atenção nossa, e aí eu já aventei a hipótese de até criar um ministério. É na área de... Na área... Eu diria assim, como uma espécie de analogia com o que acontece na área agrícola.'
	}
];

let table = `
	<table class="mt-2">
		<thead>
			<tr>
				<th data-field="time">Hora</th>
				<th data-field="description">Descrição</th>
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

function formatTime(date) {
	let new_date = new Date(date);

	let hora = new_date.getHours();
	hora = 1 === hora.toString().length ? '0' + hora : hora;

	let minuto = new_date.getMinutes();
	minuto = 1 === minuto.toString().length ? '0' + minuto : minuto;

	let segundo = new_date.getSeconds();
	segundo = 1 === segundo.toString().length ? '0' + segundo : segundo;

	return `${hora}:${minuto}`;
}

document.querySelector('#lista-eventos').innerHTML = table;