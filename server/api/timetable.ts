export default defineEventHandler((event) => {
	return {
		phase: "setup",
		timetable: [
			{ at: "Olten", from: "Zürich Main Station", to: "Bern", platform: 1, time: 5, name: "IR85", type: "arrival" },
			{ at: "Bern", from: "Zürich Main Station", to: "Olten", platform: 7, time: 10, name: "IR21", type: "passthrough" },
			{ at: "Olten", from: "Bern", to: "Zürich Main Station", platform: 5, time: 15, name: "IR60", type: "departure" },
			{ at: "Zürich Main Station", from: "Olten", to: "Bern", platform: 3, time: 20, name: "IR40", type: "passthrough" },
			{ at: "Bern", from: "Zürich Main Station", to: "Olten", platform: 8, time: 25, name: "IR11", type: "arrival" },
			{ at: "Zürich Main Station", from: "Bern", to: "Olten", platform: 2, time: 30, name: "IR90", type: "arrival" },
			{ at: "Olten", from: "Zürich Main Station", to: "Bern", platform: 9, time: 35, name: "IR5", type: "departure" },
			{ at: "Zürich Main Station", from: "Bern", to: "Olten", platform: 4, time: 40, name: "IR18", type: "departure" },
			{ at: "Olten", from: "Bern", to: "Zürich Main Station", platform: 6, time: 45, name: "IR33", type: "departure" },
			{ at: "Bern", from: "Olten", to: "Zürich Main Station", platform: 10, time: 50, name: "IR7", type: "passthrough" },
		],
	}
})
