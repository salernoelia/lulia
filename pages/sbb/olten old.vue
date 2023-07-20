<template>
	<div flex flex-row w-screen h-screen overflow-hidden>
		<Console :values="{ durchsage }" />
		<button @click="speak()">speak</button>
		<div flex flex-col w-100vw>
			<template v-for="n in 8">
				<input w-200% ml--50% class="zug" :class="'zug-' + n" type="range" step="0.01" :value="n % 2 === 0 || n === 7 ? 0 : 50" />
				<div class="perron" bg-gray h-50px>gleis {{ n }}</div>
			</template>
		</div>
	</div>
</template>

<script setup>
const { info } = useSBB()
const route = useRoute()
const stationName = route.params.slug

const utterance = ref()
onMounted(() => {
	voices.value = window.speechSynthesis.getVoices()
	utterance.value = new SpeechSynthesisUtterance(durchsage.value)
	utterance.value.lang = "en-US"
	utterance.value.voice = window.speechSynthesis.getVoices()[0]
	utterance.value.rate = 0.8
})

const speak = () => {
	window.speechSynthesis.speak(utterance.value)
}

watch(info, () => {
	if (toLowerCase(info.value.at) === stationName) {
		switch (info.value.type) {
			case "passthrough":
				durchsage.value = `Attention: Passthrough of the ${info.value.name} from ${info.value.from} to ${info.value.to} at platform ${info.value.platform}`
				utterance.value.text = durchsage.value
				durchfahren()
			case "arrival":
				durchsage.value = `Arrival of the ${info.value.name} from ${info.value.from} to ${info.value.to} at platform ${info.value.platform}`
				utterance.value.text = durchsage.value
				einfahren()
			case "departure":
				durchsage.value = `Departure of the ${info.value.name} from ${info.value.from} to ${info.value.to} at platform ${info.value.platform}`
				utterance.value.text = durchsage.value
				abfahren()
		}
	}
})

const abfahren = () => {
	speak()
	useAnime({ targets: ".zug-1", value: 100, duration: 20000, delay: 5000, easing: "easeInQuad" })
}

const einfahren = () => {
	speak()
	useAnime({ targets: ".zug-8", value: 50, duration: 20000, easing: "easeOutQuad" })
}

const durchfahren = () => {
	speak()
	useAnime({ targets: ".zug-8", value: 100, duration: 20000, easing: "linear" })
}

onKeyStroke(["a", "A"], (e) => {
	e.preventDefault()
	abfahren()
})

onKeyStroke(["e", "E"], (e) => {
	e.preventDefault()
	einfahren()
})

onKeyStroke(["d", "D"], (e) => {
	e.preventDefault()
	durchfahren()
})
</script>
