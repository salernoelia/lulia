<template>
	<div>
		<div>sbb admin</div>
		<button @click="timetableSend()">send the timetable</button>
		<button @click="send({ at: 'Olten', from: 'Zürich Hauptbahnhof', to: 'Bern', platform: 3, type: 'passthrough', time: 10 })">send a single payload</button>
		<div>
			<pre>latest info sent over server: {{ lat }}</pre>
			<div v-for="entry in timetable">
				train {{ entry.name }} from {{ entry.from }} to {{ entry.to }} at {{ entry.at }} on platform {{ entry.platform }} at time {{ entry.time }} with type {{ entry.type }}
			</div>
		</div>
	</div>
</template>

<script setup>
const { send, latest } = useSBB()

//send timetable
const timetable = [
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Bern", platform: 1, time: 5, name: "Interregio 85", type: "arrival" },
	{ at: "Bern", from: "Zürich Hauptbahnhof", to: "Olten", platform: 7, time: 10, name: "Interregio 21", type: "passthrough" },
	{ at: "Olten", from: "Bern", to: "Zürich Hauptbahnhof", platform: 5, time: 15, name: "Interregio 60", type: "departure" },
	{ at: "Zürich Hauptbahnhof", from: "Olten", to: "Bern", platform: 3, time: 20, name: "Interregio 40", type: "passthrough" },
	{ at: "Bern", from: "Zürich Hauptbahnhof", to: "Olten", platform: 8, time: 25, name: "Interregio 11", type: "arrival" },
	{ at: "Zürich Hauptbahnhof", from: "Bern", to: "Olten", platform: 2, time: 30, name: "Interregio 90", type: "arrival" },
	{ at: "Olten", from: "Zürich Hauptbahnhof", to: "Bern", platform: 9, time: 35, name: "Interregio 5", type: "departure" },
	{ at: "Zürich Hauptbahnhof", from: "Bern", to: "Olten", platform: 4, time: 40, name: "Interregio 18", type: "departure" },
	{ at: "Olten", from: "Bern", to: "Zürich Hauptbahnhof", platform: 6, time: 45, name: "Interregio 33", type: "departure" },
	{ at: "Bern", from: "Olten", to: "Zürich Hauptbahnhof", platform: 10, time: 50, name: "Interregio 7", type: "passthrough" },
]
const timetableSend = () => {
	timetable.forEach((entry) => {
		setTimeout(() => {
			send.value(entry)
		}, entry.time * 1000)
	})
}
</script>
