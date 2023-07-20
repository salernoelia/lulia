<template>
	<div>
		<div>sbb admin</div>
		<button @click="timetableSetup()">send the initiation timetable</button>
		<button @click="timetableTimer()">start sending time specific entries from the timetable</button>
		<button @click="send({ phase: 'event', at: 'Olten', from: 'Zürich Main Station', to: 'Bern', platform: 3, type: 'passthrough', time: 10, name: 'Interregio 22' })">send a single payload</button>
		<div>
			<pre>latest info sent over server: {{ latest }}</pre>
			<pre>{{ entry }}</pre>
		</div>
	</div>
</template>

<script setup>
const { send, latest } = useSBB()

//send timetable
const timetable = [
	{ at: "Olten", from: "Zürich Main Station", to: "Bern", platform: 1, time: 5, name: "Interregio 85", type: "arrival" },
	{ at: "Bern", from: "Zürich Main Station", to: "Olten", platform: 7, time: 10, name: "Interregio 21", type: "passthrough" },
	{ at: "Olten", from: "Bern", to: "Zürich Main Station", platform: 5, time: 15, name: "Interregio 60", type: "departure" },
	{ at: "Zürich Main Station", from: "Olten", to: "Bern", platform: 3, time: 20, name: "Interregio 40", type: "passthrough" },
	{ at: "Bern", from: "Zürich Main Station", to: "Olten", platform: 8, time: 25, name: "Interregio 11", type: "arrival" },
	{ at: "Zürich Main Station", from: "Bern", to: "Olten", platform: 2, time: 30, name: "Interregio 90", type: "arrival" },
	{ at: "Olten", from: "Zürich Main Station", to: "Bern", platform: 9, time: 35, name: "Interregio 5", type: "departure" },
	{ at: "Zürich Main Station", from: "Bern", to: "Olten", platform: 4, time: 40, name: "Interregio 18", type: "departure" },
	{ at: "Olten", from: "Bern", to: "Zürich Main Station", platform: 6, time: 45, name: "Interregio 33", type: "departure" },
	{ at: "Bern", from: "Olten", to: "Zürich Main Station", platform: 10, time: 50, name: "Interregio 7", type: "passthrough" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Bern", platform: 1, time: 5, name: "IR85", type: "arrival" },
	{ at: "Bern", from: "Zürich Hauptbahnhof", to: "Olten", platform: 7, time: 10, name: "IR21", type: "passthrough" },
	{ at: "Olten", from: "Bern", to: "Zürich Hauptbahnhof", platform: 5, time: 15, name: "IR60", type: "departure" },
	{ at: "Zürich Hauptbahnhof", from: "Olten", to: "Bern", platform: 3, time: 20, name: "IR40", type: "passthrough" },
	{ at: "Bern", from: "Zürich Hauptbahnhof", to: "Olten", platform: 8, time: 25, name: "IR11", type: "arrival" },
	{ at: "Zürich Hauptbahnhof", from: "Bern", to: "Olten", platform: 2, time: 30, name: "IR90", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Bern", platform: 9, time: 35, name: "IR5", type: "departure" },
	{ at: "Zürich Hauptbahnhof", from: "Bern", to: "Olten", platform: 4, time: 40, name: "IR18", type: "departure" },
	{ at: "Olten", from: "Bern", to: "Zürich Hauptbahnhof", platform: 6, time: 45, name: "IR33", type: "departure" },
	{ at: "Bern", from: "Olten", to: "Zürich Hauptbahnhof", platform: 10, time: 50, name: "IR7", type: "passthrough" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Aarau", platform: 3, time: 55, name: "IR32", type: "departure" },
	{ at: "Aarau", from: "Zürich Hauptbahnhof", to: "Olten", platform: 2, time: 60, name: "IR75", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Schaffhausen", platform: 6, time: 65, name: "IR18", type: "departure" },
	{ at: "Schaffhausen", from: "Zürich Hauptbahnhof", to: "Olten", platform: 1, time: 70, name: "IR50", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Baden", platform: 4, time: 75, name: "IR67", type: "departure" },
	{ at: "Baden", from: "Zürich Hauptbahnhof", to: "Olten", platform: 8, time: 80, name: "IR12", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Bülach", platform: 5, time: 85, name: "IR44", type: "departure" },
	{ at: "Bülach", from: "Zürich Hauptbahnhof", to: "Olten", platform: 3, time: 90, name: "IR51", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Wollishofen", platform: 1, time: 95, name: "IR22", type: "departure" },
	{ at: "Wollishofen", from: "Zürich Hauptbahnhof", to: "Olten", platform: 6, time: 100, name: "IR13", type: "arrival" },
	{ at: "Olten", from: "Bern", to: "Aarau", platform: 2, time: 105, name: "IR91", type: "departure" },
	{ at: "Aarau", from: "Bern", to: "Olten", platform: 7, time: 110, name: "IR59", type: "arrival" },
	{ at: "Olten", from: "Bern", to: "Schaffhausen", platform: 4, time: 115, name: "IR30", type: "departure" },
	{ at: "Schaffhausen", from: "Bern", to: "Olten", platform: 1, time: 120, name: "IR66", type: "arrival" },
	{ at: "Olten", from: "Bern", to: "Baden", platform: 6, time: 125, name: "IR77", type: "departure" },
	{ at: "Baden", from: "Bern", to: "Olten", platform: 3, time: 130, name: "IR28", type: "arrival" },
	{ at: "Olten", from: "Bern", to: "Bülach", platform: 9, time: 135, name: "IR39", type: "departure" },
	{ at: "Bülach", from: "Bern", to: "Olten", platform: 2, time: 140, name: "IR75", type: "arrival" },
	{ at: "Olten", from: "Bern", to: "Wollishofen", platform: 5, time: 145, name: "IR50", type: "departure" },
	{ at: "Wollishofen", from: "Bern", to: "Olten", platform: 10, time: 150, name: "IR14", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Biel", platform: 4, time: 155, name: "IR55", type: "departure" },
	{ at: "Biel", from: "Zürich Hauptbahnhof", to: "Olten", platform: 9, time: 160, name: "IR88", type: "arrival" },
]

const timetableSetup = () => {
	send.value({ phase: "setup", timetable: timetable })
}

const timetableTimer = () => {
	timetable.forEach((entry) => {
		setTimeout(() => {
			send.value({ phase: "event", ...entry })
		}, entry.time * 1000)
	})
}
</script>
