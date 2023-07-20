<template>
	<div>
		<div class="train-screen">
			<!-- <div class="train-screen__element">
				<h1 class="train-screen__element--title">Zug</h1>
				<h1 class="train-screen__element--time">Abfahrt</h1>
				<h1 class="train-screen__element--locations">Strecke</h1>
				<h1 class="train-screen__element--rail">Gleis</h1>
				<h1 class="train-screen__element--notice">Hinweis</h1>
			</div> -->
			<div v-for="entry in timetable" class="train-screen__element">
				<!-- <h1 :style="[IR ? `background-color: #fff; color: #000;` : `background-color: #ff0000; color: #fff;`]" class="train-screen__element--title">IR 3</h1> -->
				<h1 :style="{ 'background-color': IR ? 'red' : 'white', color: IR ? 'white' : 'black' }" class="train-screen__element--title">{{ entry.name }}</h1>
				<h1 class="train-screen__element--time">19:{{ entry.time }}</h1>
				<h1 class="train-screen__element--locations">{{ entry.from }} - {{ entry.to }}</h1>
				<h1 class="train-screen__element--rail">{{ entry.platform }}</h1>
				<h1 class="train-screen__element--notice">-</h1>
			</div>
		</div>
	</div>
</template>

<script setup>
const IR = ref(true)
const timetable = [
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
</script>

<style lang="scss" scoped>
h1 {
	margin: 0;
}
.train-screen {
	display: flex;
	flex-direction: column;
	color: white;
	width: 80vw;
	height: 80vh;
	background-color: #26325c;
	border: 5px solid #18203e;
}

.train-screen__element {
	border-bottom: white solid 1px;
	padding-bottom: 10px;
	padding-top: 10px;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	flex-direction: row;
	justify-content: left;
	gap: 40px;

	height: 50px;
}
.train-screen__element--title {
	margin: 0;
	width: 80px;
}
</style>
