<template>
	<div flex flex-row w-screen h-screen overflow-hidden>
		<button @click="speak()">speak</button>
		<div flex flex-col w-100vw>
			<template v-for="n in 8">
				<input class="zug w-200% ml--50%" :class="'zug-' + n" type="range" step="0.01" :value="n % 2 === 0 || n === 7 ? 0 : 50" />
				<div class="perron" bg-gray h-50px>gleis {{ n }}</div>
			</template>
		</div>
	</div>
</template>

<script setup>
const { latest } = useSBB()
const route = useRoute()
const stationName = route.params.slug

//speech synthesis
const utterance = ref()
onMounted(() => {
	utterance.value = new SpeechSynthesisUtterance("nothing to say")
	utterance.value.lang = "en-US"
	utterance.value.voice = window.speechSynthesis.getVoices()[0]
	utterance.value.rate = 0.8
})
const speak = () => {
	window.speechSynthesis.speak(utterance.value)
}

watch(latest, () => {
	console.log(latest.value)
	if (latest.value.at.toLowerCase() === stationName) {
		switch (latest.value.type) {
			case "passthrough":
				utterance.value.text = `Attention: Passthrough of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
				speak()
				useAnime({ targets: ".zug-1", value: 100, duration: 20000, delay: 5000, easing: "easeInQuad" })
				return
			case "arrival":
				utterance.value.text = `Arrival of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
				speak()
				useAnime({ targets: ".zug-8", value: 50, duration: 20000, easing: "easeOutQuad" })
				return
			case "departure":
				utterance.value.text = `Departure of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
				speak()
				useAnime({ targets: ".zug-8", value: 100, duration: 20000, easing: "linear" })
			default:
				return
		}
	}
})
</script>
