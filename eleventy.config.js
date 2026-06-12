import path from "node:path";
import * as sass from "sass";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTOC from "markdown-it-table-of-contents";

// The five Diátaxis-style sections, each its own collection (like the
// Jekyll collections this site used before). Pages within a section are
// ordered by their `order` front matter, which drives prev/next links.
const SECTIONS = [
	"introduction",
	"tutorials",
	"how-tos",
	"reference",
	"explanations",
];

// Approximation of kramdown's auto-id algorithm, so existing #anchors
// into docs.fontra.xyz keep working.
function kramdownSlugify(s) {
	return s
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-");
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	// NOTE: most pages carry `draft: true` front matter. Jekyll ignored it
	// and published them anyway, so we deliberately do NOT exclude drafts
	// here — that would empty the site.

	// --- static files -------------------------------------------------
	eleventyConfig.addPassthroughCopy({
		"./images/": "/images/",
		"./videos/": "/videos/",
		"./CNAME": "/CNAME",
	});

	// --- markdown: kramdown compatibility ------------------------------
	// The content was written for Jekyll's kramdown. Two kramdown-isms are
	// translated at build time (source files stay untouched):
	//
	//   1. `* Table of Contents\n{:toc}`  →  `[[toc]]`
	//   2. `<div ... markdown="1">`       →  blank line inserted after the
	//      opening tag so markdown-it parses the Markdown inside the div
	//   3. block attribute lines like `{: .lead }` are moved/kept where
	//      markdown-it-attrs expects them
	eleventyConfig.addPreprocessor("kramdown-compat", "md", (data, content) => {
		// 1. kramdown TOC marker
		content = content.replace(
			/^\* Table of Contents\s*\n\{:\s*toc\s*\}\s*$/gim,
			"[[toc]]"
		);

		// 2. markdown="1" wrapper divs/cells
		content = content.replace(
			/<(div|td|span)([^>]*?)\s+markdown=['"]1['"]([^>]*)>[ \t]*\r?\n/g,
			"<$1$2$3>\n\n"
		);

		// 3. kramdown block IALs ({: .class }) on their own line
		const lines = content.split("\n");
		const out = [];
		for (const line of lines) {
			const ial = line.match(/^\{:\s*([^}\n]+?)\s*\}\s*$/);
			if (ial && !/^\s*toc\s*$/.test(ial[1]) && out.length > 0) {
				const prev = out[out.length - 1];
				const prevBlank = prev.trim() === "";
				const prevListItem = /^\s*([-*+]\s|\d+\.\s|\|)/.test(prev);
				const prevHtmlOnly = /^\s*<\/?[a-zA-Z][^>]*>\s*$/.test(prev);
				if (prevListItem) {
					// kramdown attaches this to the whole list; markdown-it-attrs
					// does the same for a standalone attrs paragraph after a block
					out.push("");
					out.push(`{:${ial[1]}}`);
					continue;
				} else if (!prevBlank && !prevHtmlOnly) {
					// paragraph or heading: merge onto the previous line, where
					// markdown-it-attrs picks it up
					out[out.length - 1] = prev.replace(/\s+$/, "") + ` {:${ial[1]}}`;
					continue;
				}
			}
			out.push(line);
		}
		return out.join("\n");
	});

	eleventyConfig.amendLibrary("md", (mdLib) => {
		mdLib.set({ html: true, typographer: true });
		mdLib.use(markdownItAttrs, {
			leftDelimiter: "{:",
			rightDelimiter: "}",
		});
		mdLib.use(markdownItAnchor, {
			slugify: kramdownSlugify,
			tabIndex: false,
		});
		mdLib.use(markdownItTOC, {
			includeLevel: [1, 2, 3, 4, 5, 6],
			containerClass: "markdown-toc",
			slugify: kramdownSlugify,
		});
		return mdLib;
	});

	// --- sass (replaces Jekyll's built-in Sass pipeline) ----------------
	eleventyConfig.addTemplateFormats("sass");
	eleventyConfig.addExtension("sass", {
		outputFileExtension: "css",
		useLayouts: false,
		compile: function (inputContent, inputPath) {
			const parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) {
				return;
			}
			const result = sass.compileString(inputContent, {
				syntax: "indented",
				loadPaths: [parsed.dir || ".", "_sass"],
			});
			this.addDependencies(inputPath, result.loadedUrls);
			return () => result.css;
		},
	});
	eleventyConfig.addWatchTarget("_sass/");

	// --- collections: one per section, sorted by `order` ----------------
	for (const section of SECTIONS) {
		eleventyConfig.addCollection(section, (collectionApi) =>
			collectionApi
				.getFilteredByGlob(`content/${section}/**/*.md`)
				.sort((a, b) => (a.data.order ?? 9999) - (b.data.order ?? 9999))
		);
	}

	// Display version of a URL: Jekyll permalinks without a trailing slash
	// (e.g. /reference/editor-view/tools/pen) are written as `pen.html` but
	// linked without the extension, exactly as GitHub Pages serves them.
	eleventyConfig.addFilter("clean_url", (url) =>
		typeof url === "string" ? url.replace(/\.html$/, "") : url
	);
}

export const config = {
	templateFormats: ["md", "html", "liquid"],
	markdownTemplateEngine: "liquid",
	htmlTemplateEngine: "liquid",
	dir: {
		input: "content",
		includes: "../_includes",
		layouts: "../_layouts",
		data: "../_data",
		output: "_site",
	},
};
