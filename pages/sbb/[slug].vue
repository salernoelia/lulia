<template>
	<div flex flex-row w-screen h-screen overflow-hidden>
		<div flex flex-col w-100vw>
			<template v-for="n in 10">
				<input class="zug w-200% ml--50%" :class="'zug-' + n" type="range" step="0.01" :value="0" />
				<div class="perron" bg-gray h-50px>platform {{ n }}</div>
			</template>
		</div>
	</div>
</template>

<script setup>
const { latest } = useSBB()
const route = useRoute()
const stationName = route.params.slug
const { $anime } = useNuxtApp()

//speech synthesis
const utterance = ref()
onMounted(async () => {
	const { data } = await useFetch("/api/timetable")
	watchEffect(() => {
		latest.value = data.value
	})

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
	if (latest.value.phase === "setup") {
		latest.value.timetable.forEach((entry) => {
			console.log(entry.at)
			if (entry.at.toLowerCase() === stationName && entry.type === "departure") $anime.set(".zug-" + entry.platform, { value: 50 })
			else $anime.set(".zug-" + entry.platform, { value: 0 })
		})
	} else {
		if (latest.value.phase === "event" && latest.value.at.toLowerCase() === stationName) {
			switch (latest.value.type) {
				case "passthrough":
					utterance.value.text = `Attention: Passthrough of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
					speak()
					$anime.set(".zug-" + latest.value.platform, { value: 0 })
					useAnime({ targets: ".zug-" + latest.value.platform, value: 100, duration: 5000, easing: "easeInQuad" })
					return
				case "arrival":
					utterance.value.text = `Arrival of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
					speak()
					$anime.set(".zug-" + latest.value.platform, { value: 0 })
					useAnime({ targets: ".zug-" + latest.value.platform, value: 50, duration: 5000, easing: "easeOutQuad" })
					return
				case "departure":
					utterance.value.text = `Departure of the ${latest.value.name} from ${latest.value.from} to ${latest.value.to} at platform ${latest.value.platform}`
					speak()
					$anime.set(".zug-" + latest.value.platform, { value: 50 })
					useAnime({ targets: ".zug-" + latest.value.platform, value: 100, duration: 5000, easing: "linear" })
				default:
					return
			}
		}
	}
})
</script>
