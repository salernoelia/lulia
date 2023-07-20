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
