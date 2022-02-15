module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Cormorant"', "serif"],
				sans: ['"Quicksand"', "sans-serif"],
			},
			backgroundImage: {
				"background-texture": "url('/texture.png')",
			},
			zIndex: {
				100: "100",
				99: "99",
				98: "98",
			},
			transformOrigin: {
				"center-right": "center right",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/aspect-ratio"),
	],
};
