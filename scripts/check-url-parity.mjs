#!/usr/bin/env node
// Verifies that the Eleventy build (_site/) serves every URL the Jekyll
// site served. Permalinks were not changed in the migration, so the
// expected URL set is derived from the (unchanged) front matter:
//
//   permalink: /foo/      -> _site/foo/index.html
//   permalink: /foo/bar   -> _site/foo/bar.html   (Jekyll wrote bar.html,
//                            GitHub Pages serves it extension-less)
//   (no permalink)        -> default Eleventy output for the file
//
// Run after `npm run build`:  npm run check-urls

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SITE = join(ROOT, "_site");

if (!existsSync(SITE)) {
	console.error("No _site/ directory found — run `npm run build` first.");
	process.exit(1);
}

function* walk(dir, ext) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(full, ext);
		else if (!ext || entry.name.endsWith(ext)) yield full;
	}
}

// --- expected outputs from content front matter -----------------------
const expected = new Map(); // output path (relative to _site) -> source
for (const file of walk(join(ROOT, "content"), ".md")) {
	const src = relative(ROOT, file);
	const text = readFileSync(file, "utf8");
	const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	const pm = fm && fm[1].match(/^permalink\s*:\s*(\S+)\s*$/m);
	if (pm) {
		const p = pm[1];
		if (p.endsWith("/")) expected.set(join(p.slice(1), "index.html"), src);
		else if (/\.[a-z0-9]+$/i.test(p)) expected.set(p.slice(1), src);
		else expected.set(`${p.slice(1)}.html`, src);
	} else if (src === "content/index.md") {
		expected.set("index.html", src);
	} else {
		// Eleventy default: content/a/b.md -> /a/b/index.html
		const stem = src.replace(/^content\//, "").replace(/\.md$/, "");
		expected.set(join(stem, "index.html"), src);
	}
}

// --- static assets that must be copied/compiled ------------------------
expected.set("css/style.css", "content/css/style.sass");
expected.set("CNAME", "CNAME");
for (const dir of ["images", "videos"]) {
	for (const file of walk(join(ROOT, dir))) {
		expected.set(relative(ROOT, file), relative(ROOT, file));
	}
}

// --- compare ------------------------------------------------------------
let missing = 0;
for (const [out, src] of [...expected].sort()) {
	if (!existsSync(join(SITE, out))) {
		console.error(`MISSING  /${out}   (from ${src})`);
		missing++;
	}
}

const expectedHtml = new Set(
	[...expected.keys()].filter((p) => p.endsWith(".html"))
);
let extra = 0;
for (const file of walk(SITE, ".html")) {
	const rel = relative(SITE, file);
	if (!expectedHtml.has(rel)) {
		console.warn(`EXTRA    /${rel}`);
		extra++;
	}
}

console.log(
	`\n${expected.size} expected outputs — ${missing} missing, ${extra} unexpected html file(s).`
);
process.exit(missing ? 1 : 0);
