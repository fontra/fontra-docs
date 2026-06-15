// Site-wide values, the equivalent of Jekyll's `site.*` variables
// (templates use e.g. {{ site.url }} and {{ site.time }}).
const isServing = process.env.ELEVENTY_RUN_MODE === "serve";

export default {
	title: "Fontra Docs",
	email: "hello@black-foundry.com",
	description: "Fontra user documentation",
	// Absolute URL in production builds; localhost while `npm start` is
	// running so links work in the dev server.
	url: isServing ? "http://localhost:8080" : "https://docs.fontra.xyz",
	time: new Date(),
};
