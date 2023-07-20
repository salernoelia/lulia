import { Howl, Howler } from "howler"

export const useSound = (path) => {
	var sound = new Howl({
		src: [path],
		onplayerror: function () {
			sound.once("unlock", function () {
				sound.play()
			})
		},
	})
	return sound
}
