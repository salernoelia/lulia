import type { RealtimeChannel } from "@supabase/supabase-js"

export const useScreenParty = (screenName: String) => {
	const supabase = useSupabaseClient()
	let received: Function
	let MOUSE_EVENT: string
	let channel: RealtimeChannel
	let sendScreen = ref(Function)
	let x = ref(0)
	let y = ref(0)
	let width = ref(0)
	let height = ref(0)

	const style = computed(() => {
		return { transform: `translate(${x.value}px, ${y.value}px)` }
	})

	onMounted(() => {
		channel = supabase.channel("room_1", {
			config: {
				broadcast: {
					self: true,
				},
			},
		})
		MOUSE_EVENT = "cursor"

		channel
			.on("broadcast", { event: MOUSE_EVENT }, (event) => {
				// console.log("received something", event)
				if (event.payload.screenName === screenName) received(event.payload)
			})
			.subscribe()

		received = (payload) => {
			// console.log("received payload", payload)
			x.value = payload.x
			y.value = payload.y
			width.value = payload.width
			height.value = payload.height
		}

		sendScreen.value = (screen) => {
			// console.log("sent via sendScreen", screen)
			return channel.send({
				type: "broadcast",
				event: MOUSE_EVENT,
				payload: screen,
			})
		}
	})

	onUnmounted(() => {
		supabase.removeChannel(channel)
	})

	return { x, y, width, height, sendScreen, style }
}
