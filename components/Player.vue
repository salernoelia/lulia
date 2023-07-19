<template>
	<div>
		<Console :values="{ x }" />
		<div class="player" :style="{ top: player.y + 'px', left: x + 'px' }" />
	</div>
</template>

<script setup>
const walking = useSound("/sounds/walk.mp3")
const player = reactive({
	x: 0,
	y: 0,
	speed: 10,
	direction: "right",
	sprite: "/sprites/stand.png",
	name: "Player1",
})

const test = ref(100)
const x = computed(() => test.value - 70)
const y = computed(() => player.y)
const { element } = useElementByPoint({ x, y })

onKeyStroke(["w", "W", "ArrowUp"], (e) => {
	e.preventDefault()
	player.y -= player.speed
	walking.play()
})

onKeyStroke(["d", "D", "ArrowRight"], (e) => {
	e.preventDefault()
	console.log(element.value)
	if (element.value?.className !== "gleis") test.value += player.speed
	walking.play()
})

onKeyStroke(["s", "S", "ArrowDown"], (e) => {
	e.preventDefault()
	player.y += player.speed
	walking.play()
})

onKeyStroke(["a", "A", "ArrowLeft"], (e) => {
	e.preventDefault()
	test.value -= player.speed
	walking.play()
})
</script>

<style scoped>
.player {
	background-color: black;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	position: absolute;
	transition: all 150ms;
}
</style>
