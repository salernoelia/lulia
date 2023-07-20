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
