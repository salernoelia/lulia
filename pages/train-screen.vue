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
			<div v-for="n in 14" class="train-screen__element">
				<!-- <h1 :style="[IR ? `background-color: #fff; color: #000;` : `background-color: #ff0000; color: #fff;`]" class="train-screen__element--title">IR 3</h1> -->
				<h1 :style="{ 'background-color': IR ? 'red' : 'white', color: IR ? 'white' : 'black' }" class="train-screen__element--title">IR 3</h1>
				<h1 class="train-screen__element--time">19:03</h1>
				<h1 class="train-screen__element--locations">Zürich HB - Bern</h1>
				<h1 class="train-screen__element--rail">23</h1>
				<h1 class="train-screen__element--notice">-</h1>
			</div>
		</div>
	</div>
</template>

<script setup>
const IR = ref(true)
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
