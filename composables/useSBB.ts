import type { RealtimeChannel } from "@supabase/supabase-js"

export const useSBB = () => {
	const supabase = useSupabaseClient()
	let channel: RealtimeChannel
	let EVENT = "SBB"
	const send = ref()
	const latest = ref({ from: "Zurich Main Station", to: "Bern", at: "Olten", platform: "8" })

	onMounted(() => {
		channel = supabase.channel("sbb", {
			config: {
				broadcast: {
					self: true,
				},
			},
		})

		channel
			.on("broadcast", { event: EVENT }, (event) => {
				latest.value = event.payload
			})
			.subscribe()

		send.value = (sbb: Object) => {
			return channel.send({
				type: "broadcast",
				event: EVENT,
				payload: sbb,
			})
		}
	})

	onUnmounted(() => {
		supabase.removeChannel(channel)
	})

	return { send, latest }
}
