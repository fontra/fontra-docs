// Applies to every page under content/.
export default {
	eleventyComputed: {
		// Jekyll wrote extension-less permalinks (permalink: /reference/foo)
		// to `foo.html` and GitHub Pages serves them without the extension.
		// Reproduce that exactly so every existing URL keeps working.
		permalink: (data) => {
			const p = data.permalink;
			if (
				typeof p === "string" &&
				p.startsWith("/") &&
				!p.endsWith("/") &&
				!/\.[a-z0-9]+$/i.test(p)
			) {
				return `${p}.html`;
			}
			return p;
		},
	},
};
