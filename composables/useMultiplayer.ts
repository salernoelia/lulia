import type { RealtimeChannel } from "@supabase/supabase-js"

export const useMultiplayer = () => {
	const supabase = useSupabaseClient()
	let receivedCursorPosition: Function, MOUSE_EVENT: string
	let channel: RealtimeChannel
	let sendMousePosition = ref(Function)
	let sendScreen = ref(Function)
	let x = ref(0)
	let y = ref(0)
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
				console.log("received", event)
				// receivedCursorPosition(event)
			})
			.subscribe()

		receivedCursorPosition = ({ event, payload }) => {
			x.value = payload.x
			y.value = payload.y
		}

		sendMousePosition.value = (userId, x, y) => {
			console.log("sent via sendMousePosition", { userId, x, y })
			return channel.send({
				type: "broadcast",
				event: MOUSE_EVENT,
				payload: { userId, x, y },
			})
		}

		sendScreen.value = (screen) => {
			console.log("sent via sendScreen", screen)
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

	return { x, y, sendMousePosition, sendScreen }
}
