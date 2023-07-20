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
				console.log("received something in sbb-admin", event)
				latest.value = event.payload
			})
			.subscribe()

		sendSBB.value = (sbb: Object) => {
			console.log("sent via sendSBB in sbb-admin", sbb)
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
