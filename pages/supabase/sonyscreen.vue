<template>
	<div w-screen h-screen overflow-hidden relative>
		<div bg-black w-50px aspect-1 rounded-full fixed transition-all duration-200 :style="style">mouse cursor</div>
		<Console :values="{ x, y, width, height }"></Console>
	</div>
</template>

<script setup>
const { x, y, width, height } = useScreenParty("sony")
const style = computed(() => {
	return {
		left: (x.value / width.value) * 100 + "%",
		top: (y.value / height.value) * 100 + "%",
		transform: `translate(-${25}px, -${25}px)`,
	}
})
</script>
