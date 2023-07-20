// https://nuxt.com/docs/api/configuration/nuxt-config
import { transformerDirectives, presetAttributify, presetUno, presetIcons, presetWebFonts, presetTypography, presetTagify } from "unocss"

export default defineNuxtConfig({
	css: ["/assets/css/global.scss"],
	modules: ["@vueuse/nuxt", "@nuxtjs/supabase", "@unocss/nuxt", "@hypernym/nuxt-anime"],
	unocss: {
		attributify: true,
		shortcuts: [{ flexCenter: "flex justify-center items-center" }],
		rules: [],
		presets: [presetUno(), presetAttributify(), presetIcons(), presetWebFonts(), presetTypography(), presetTagify()],
		transformers: [transformerDirectives()],
		theme: {
			colors: {
				white: "#F6FCF0",
				blue: "#0168A1",
				red: "#EB0000",
				gray: "#91A395",
				yellow: "#fbdf86",
			},
		},
	},
	anime: {
		composables: true,
	},
	ssr: false,
	devtools: { enabled: true },
})
