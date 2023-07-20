export const useSpeech = (text = "nothing to say") => {
	const utterance = ref()
	const speak = ref()

	onMounted(async () => {
		utterance.value = new SpeechSynthesisUtterance(text)
		utterance.value.lang = "en-US"
		utterance.value.voice = window.speechSynthesis.getVoices()[0]
		utterance.value.rate = 0.8

		speak.value = () => {
			window.speechSynthesis.speak(utterance.value)
		}
	})

	return { utterance, speak }
}
