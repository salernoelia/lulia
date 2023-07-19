<template>
	<div w-screen h-screen>
		<Console :values="{ x, y }" />
		<iframe w-100px h-100px src="http://localhost:3000/me" />
		<button @click="show()">test</button>
		<!-- <div bg-black fixed :style="{ transform: `translate(${playerX}px, ${y}px)`}">test</div> -->
	</div>
</template>

<script setup>
const { x, y } = useMouse()
const playerX = computed(() => x.value)
const testElement = ref(null)
onMounted(() => {
	const { element } = useElementByPoint({ x: x, y: y, document: document.querySelector("iframe").contentWindow.document })
	testElement.value = element
})

onKeyStroke(["w", "W", "ArrowUp"], (e) => {
	e.preventDefault()
	console.log(testElement.value)
})

const show = () => {
	console.log(testElement.value)
}
</script>
