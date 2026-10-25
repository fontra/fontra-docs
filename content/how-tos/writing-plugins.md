---
title     : Writing your own plug-ins
layout    : default
permalink : /how-tos/writing-plugins/
draft     : true
order     : 4801
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/how-tos">How-Tos</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

A quick reference for extending Fontra: what kinds of plug-ins exist, a boilerplate editor plug-in you can copy, and real plug-ins to learn from.
{: .lead }

## Context: two kinds of plug-ins

Fontra is a Python server plus a JavaScript front end that runs in the browser, so it can be extended on either side.

**Editor plug-ins (JavaScript)** run in the glyph editor. A plug-in is a folder of static files, reachable by URL, with a `plugin.json` manifest and an ES module. It can add sidebar panels, edit tools and canvas drawings (visualization layers), and edit glyphs with undo. No build step and no change to Fontra are needed.

**Server plug-ins (Python)** are ordinary Python packages that declare [entry points](https://packaging.python.org/en/latest/specifications/entry-points/). Fontra looks them up at start-up:

| Entry point group | What it adds | Example |
|---|---|---|
| `fontra.filesystem.backends` | Read and write a file format (the entry point name is the file extension) | [fontra-glyphs](https://github.com/fontra/fontra-glyphs) (`.glyphs`, `.glyphspackage`) |
| `fontra.projectmanagers` | A new `fontra <name>` subcommand that decides where fonts come from, who may open them, and which routes the server has | [fontra-rcjk](https://github.com/fontra/fontra-rcjk), Fontra Hive |
| `fontra.webcontent` | Static files served under `/<name>/` (for example, an editor plug-in shipped inside a Python package); only `.js`, `.json`, `.svg`, `.css`, `.html`, `.txt`, `.csv`, `.ico`, `.woff2` and `.wasm` files are served | Fontra Hive |
| `fontra.workflow.actions` | New actions for `fontra-workflow` | — |
| `fontra.views` | Informational only: the names are listed under *View plugins* in *Server info*; the views themselves are not loaded through it | Fontra itself |

The two kinds combine well: a Python package can serve its own editor plug-in through `fontra.webcontent`, and that plug-in can then talk to routes the same package adds on the server. This is how Fontra Hive works (see below).

Most people start with an editor plug-in, so the rest of this page is mainly about those.

## How an editor plug-in is loaded

1. In *Application settings › Plugins* you add an address. It is stored in the browser's `localStorage`, so it applies to this browser and this server address (origin) only. If you run Fontra on another port, add it again there.
2. When the editor opens, for each address Fontra fetches `<address>/plugin.json`, imports the module named by `init`, and calls the function named by `function` with two arguments: `editor` (the editor controller) and `pluginPath` (the resolved address, without a trailing slash).

The address can be:

- **`owner/repo`** (exactly one slash): a GitHub repository, loaded through jsDelivr as `https://cdn.jsdelivr.net/gh/owner/repo@latest`. Tag a release so `@latest` has something to resolve to, and check that `https://cdn.jsdelivr.net/gh/owner/repo@latest/plugin.json` opens in your browser. jsDelivr caches files, so a new release can take a while to show up.
- **A full URL** (`https://example.com/my-plugin`) or **a path on the Fontra server** (`/localplugins/my-plugin`, `/hive/plugin`). A full URL's server must send CORS headers and serve the scripts as JavaScript; GitHub Pages does both, the repository's own `github.com` address and `raw.githubusercontent.com` do not. See [Publishing your plug-in](#publishing-your-plug-in).

Errors go to the browser console (“Plugin metadata not found”, “Module didn't load”, “Error occured when running … plugin”), and the editor carries on without the plug-in. Keep the developer tools open while you work.

### The one rule to know

A plug-in **cannot import Fontra's own modules** (`@fontra/core/…`, `Panel`, `registerAction`, …): those are bundled into Fontra and have no public URL. A plug-in is plain JavaScript and works only through the objects it is given, starting with `editor`. In practice that is plenty:

| Object | Useful for |
|---|---|
| `editor.fontController` | The font: `glyphMap` (glyph name → code points), `unitsPerEm`, `await getGlyph(name)` |
| `editor.sceneSettings` | The current state: `selectedGlyphName`, `selection`, `fontLocationUser`, … |
| `editor.sceneSettingsController` | `addKeyListener(keys, callback)` to react when that state changes |
| `editor.sceneModel` | `getSelectedPositionedGlyph()`: the glyph being edited, with its `glyph` (`name`, `path`, `xAdvance`, `leftMargin`, `rightMargin`, `components`, …) |
| `editor.sceneController` | `editLayersAndRecordChanges(fn)` to edit with undo; `addCurrentGlyphChangeListener(fn)` |
| `editor.canvasController` | `requestUpdate()` to redraw; `magnification`; `localPoint(event)` |
| `editor.visualizationLayers` | The canvas drawing layers (`definitions`, `toggle(id, on)`) |
| `editor.addSidebarPanel(panel, "left" \| "right")` | Add a panel |
| `editor.addEditTool(tool)` | Add a tool to the toolbar |

These are the editor's internals rather than a frozen API, so they can change. The [Plug-ins reference]({{ site.url }}/reference/plugins) lists them in more detail; read the Fontra source when in doubt, and test your plug-in when you update Fontra.

## Boilerplate

A folder with three files:

```
glyph-info/
├── plugin.json
├── init.js
└── icon.svg
```

**`plugin.json`**

```json
{
  "name": "Glyph Info",
  "description": "Example plug-in: a sidebar panel showing facts about the selected glyph",
  "init": "init.js",
  "function": "init"
}
```

**`icon.svg`** is the sidebar tab icon. Use `stroke="currentColor"` (or `fill`) so it follows the light and dark themes:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>
```

**`init.js`**: a sidebar panel that shows facts about the selected glyph and updates as you select or edit.

```js
// Glyph Info — a minimal Fontra editor plug-in.
// Fontra fetches plugin.json, imports this module and calls
// init(editor, pluginPath).

const PANEL_ID = "glyph-info";

export function init(editor, pluginPath) {
  const panel = new GlyphInfoPanel(editor);
  panel.iconPath = `${pluginPath}/icon.svg`; // set before addSidebarPanel()
  editor.addSidebarPanel(panel, "right");

  // Fontra looks up the tab tooltip as "sidebar.<identifier>" in its own
  // translations; a plug-in sets it itself.
  const tab = document.querySelector(`.sidebar-tab[data-sidebar-name="${PANEL_ID}"]`);
  if (tab) tab.title = "Glyph info";
}

class GlyphInfoPanel extends HTMLElement {
  identifier = PANEL_ID; // unique among all panels

  constructor(editor) {
    super();
    this.editor = editor;
    this.visible = false;
    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1em;
          font-family: fontra-ui-regular, sans-serif;
          color: var(--ui-element-foreground-color);
        }
        dl { display: grid; grid-template-columns: auto 1fr; gap: 0.3em 1em; }
        dt { opacity: 0.6; }
        dd { margin: 0; }
      </style>
      <b>Glyph info</b>
      <dl id="info"></dl>
    `;
    this.infoElement = this.shadowRoot.querySelector("#info");

    // Update when another glyph is selected, and when the glyph is edited.
    editor.sceneSettingsController.addKeyListener(
      ["selectedGlyphName", "positionedLines"],
      () => this.update()
    );
    editor.sceneController.addCurrentGlyphChangeListener(() => this.update());
  }

  // Called by Fontra when the panel is shown (on = true) or hidden.
  async toggle(on, focus) {
    this.visible = on;
    if (on) this.update();
  }

  update() {
    if (!this.visible) return; // no work while hidden
    const glyph = this.editor.sceneModel.getSelectedPositionedGlyph()?.glyph;
    if (!glyph) {
      this.infoElement.textContent = "No glyph selected";
      return;
    }
    const codePoints = this.editor.fontController.glyphMap[glyph.name] || [];
    const rows = {
      Name: glyph.name,
      Unicode:
        codePoints
          .map((cp) => "U+" + cp.toString(16).toUpperCase().padStart(4, "0"))
          .join(" ") || "—",
      Advance: round(glyph.xAdvance),
      Margins: `${round(glyph.leftMargin)} / ${round(glyph.rightMargin)}`,
      Contours: glyph.path.numContours,
      Points: glyph.path.numPoints,
      Components: glyph.components.length,
    };
    this.infoElement.replaceChildren(
      ...Object.entries(rows).flatMap(([label, value]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = value;
        return [dt, dd];
      })
    );
  }
}

if (!customElements.get("glyph-info-panel")) {
  customElements.define("glyph-info-panel", GlyphInfoPanel);
}

function round(value) {
  return value === undefined ? "—" : Math.round(value * 10) / 10;
}
```

What Fontra expects from a panel: an HTML element with an `identifier` and an `iconPath`, and a `toggle(on, focus)` method. Built-in panels extend Fontra's `Panel` class, which a plug-in cannot import; extending `HTMLElement` with a shadow root does the same job. Fontra's CSS variables (`--ui-element-foreground-color`, `--ui-element-background-color`, …) reach into the shadow root, so the panel follows the theme.

### Trying it out

- **Quickest, from a Fontra source checkout** (`pip install -e .`): Fontra serves the folder `src/fontra/localplugins/` under `/localplugins/`. The folder is ignored by git and doesn't exist in a fresh checkout, so create it, put `glyph-info/` inside, add the address `/localplugins/glyph-info` in *Application settings › Plugins*, and reload the editor.
- **From another local server**: any static server works if it sends CORS headers, since the plug-in is on another origin than Fontra; for example `npx http-server --cors -p 8080` in the folder that contains `glyph-info/`, then add `http://localhost:8080/glyph-info`. (Python's `http.server` sends no CORS headers, so the browser refuses it.)
- **Published**: push the folder's contents to the root of a GitHub repository, tag a release, and add `owner/repo`.

Fontra dates every static file it serves at the time the server started, and answers *304 Not Modified* to a browser that already has it, so an edit to a plug-in under `/localplugins/` (or any `fontra.webcontent` package) stays invisible until the server is restarted. While developing, tick *Disable cache* in the developer tools' Network tab, which makes the browser fetch the files afresh; a module loaded with `import()` can also be kept by the browser even after a hard reload, and the same setting takes care of that. Note that a plug-in served from another origin (a local `http-server`, jsDelivr) is cached by that server's own rules instead.

## Adding to the boilerplate

### A button that edits the glyph, with undo

`editLayersAndRecordChanges()` gives your function the glyph layers being edited (one, or several when several sources are edited at once). Change them in place and return the undo label. The change is recorded, sent to the server, and undoable from *Edit › Undo*.

```js
async function roundSelectedGlyph(editor) {
  await editor.sceneController.editLayersAndRecordChanges((layerGlyphs) => {
    for (const layerGlyph of Object.values(layerGlyphs)) {
      layerGlyph.path = layerGlyph.path.roundCoordinates();
    }
    return "Round coordinates"; // the undo label
  });
}
```

In the panel: add `<button id="round">Round coordinates</button>` to the HTML, and in the constructor:

```js
this.shadowRoot.querySelector("#round").onclick = () => roundSelectedGlyph(editor);
```

### Drawing on the canvas: a visualization layer

Everything Fontra draws on the canvas (glyph fill, nodes, metrics, the reference font…) is a *visualization layer*: a definition with a `zIndex`, a `selectionFunc` choosing which glyphs to draw for, and a `draw` function. A plug-in adds its own definition to `editor.visualizationLayers.definitions`. This one draws a dashed line at the middle of the advance width:

```js
const LAYER_ID = "glyph-info.center-line";

function addCenterLineLayer(editor) {
  const layers = editor.visualizationLayers;
  const definition = {
    identifier: LAYER_ID,
    name: "Glyph info: center line",
    userSwitchable: false, // see "Limitations" below
    zIndex: 150, // Fontra's own layers use 0–700; higher draws on top
    screenParameters: { strokeWidth: 1 }, // in screen pixels, whatever the zoom
    colors: { strokeColor: "#0A84FF88" },
    colorsDarkMode: { strokeColor: "#64D2FF88" },
    // Which glyphs to draw for: here, the glyph being edited.
    selectionFunc: (visContext) => visContext.glyphsBySelectionMode.editing || [],
    // The context is in glyph coordinates: origin on the baseline, y up.
    draw: ({ context, positionedGlyph, parameters, model }) => {
      const x = positionedGlyph.glyph.xAdvance / 2;
      const upm = model.fontController.unitsPerEm;
      context.strokeStyle = parameters.strokeColor;
      context.lineWidth = parameters.strokeWidth;
      context.setLineDash([parameters.strokeWidth * 4, parameters.strokeWidth * 4]);
      context.beginPath();
      context.moveTo(x, -0.25 * upm);
      context.lineTo(x, upm);
      context.stroke();
    },
  };
  // Keep the list sorted by zIndex, as Fontra's own registration does.
  let index = layers.definitions.findIndex((d) => definition.zIndex < d.zIndex);
  if (index === -1) index = layers.definitions.length;
  layers.definitions.splice(index, 0, definition);
  layers.toggle(LAYER_ID, true);
}
```

Call `addCenterLineLayer(editor)` from `init()`. To show and hide it, call `layers.toggle(LAYER_ID, on)` (from a checkbox in your panel, say), then `editor.canvasController.requestUpdate()`. Other `glyphsBySelectionMode` keys are `all`, `unselected`, `hovered`, `selected` and `notediting`. `draw` also receives `controller` (for `controller.magnification`).

### A tool in the toolbar

`editor.addEditTool(tool)` takes an object with `identifier`, `iconPath`, `activate()`, `deactivate()`, `handleHover(event)`, `handleKeyDown(event)`, `getContextMenuItems()` and `async handleDrag(eventStream, initialEvent)` (details in the [reference]({{ site.url }}/reference/plugins#edit-tool)). `handleDrag` is called on mouse down; iterate `eventStream` to follow the drag until mouse up. `editor.canvasController.localPoint(event)` converts an event to canvas coordinates. Two details: the button's tooltip is looked up as `editor.<identifier>` in Fontra's translations, so set `title` on the button yourself (`document.querySelector('[data-tool="<identifier>"]')`); and Fontra creates the button with the `selected` class, so remove it unless your tool is the active one. The Comment tool in Fontra Hive's [`comments.js`](https://github.com/Uplus-Type/fontra-hive/blob/main/src/fontra_hive/client/plugin/comments.js) (class `HiveCommentTool`) is a complete example, including handing clicks it doesn't want back to the pointer tool.

## Examples to learn from

### Reference font (built in)

The *Reference font* panel ([`panel-reference-font.js`](https://github.com/fontra/fontra/blob/main/src-js/views-editor/src/panel-reference-font.js)) is the clearest small example of the two building blocks every editor plug-in uses: a sidebar panel, and a visualization layer that draws a font file's letter behind the glyph being edited.

It is not loaded through the plug-in mechanism, though: it is part of Fontra's bundle and is added in `initSidebars()` in `editor.js`. So it can import `Panel`, `registerVisualizationLayerDefinition()` and `translate()`, which a plug-in cannot. Read it for the structure (the panel's `getContentElement()` and `toggle()`, the layer's `selectionFunc` and `draw`, listening to `sceneSettingsController`), and use the plain-JavaScript equivalents shown above.

### Fontra Hive

[Fontra Hive](https://github.com/Uplus-Type/fontra-hive) (GPLv3) uses both kinds of plug-ins, and shows how they fit together:

- **Server side** (`pyproject.toml`): two project managers, `fontra hive-dev` and `fontra hive` (`fontra.projectmanagers`), which store each project in a git repository and add HTTP routes for history, branches and comments; and `hive = "fontra_hive.client"` (`fontra.webcontent`), which serves the package's `client/` folder under `/hive/`.
- **Editor side**: `client/plugin/` holds `plugin.json`, `init.js` and `comments.js`, so the plug-in address is simply `/hive/plugin`, served by the same Fontra server. The *Glyph history* and *Comments* panels are `HTMLElement` subclasses added with `addSidebarPanel()`; the version preview and the comment pins are visualization layers added at run time; the Comment tool is added with `addEditTool()`; and the panels talk to the server routes with `fetch()`.
- **Registration**: instead of asking each user to add the address in *Application settings*, Hive's pages, being on the same origin, write it to `localStorage` themselves (key `fontra.pluginsplugins`, value `[{"address": "/hive/plugin"}]`). That key is an internal detail of Fontra, so use this only when you control the server.

### Server plug-ins

- [fontra-glyphs](https://github.com/fontra/fontra-glyphs): a file format backend. The class named in the entry point has a `fromPath(path)` class method (and `createFromPath(path)` to create new files), and implements the `get…`/`put…` methods of `ReadableFontBackend` and `WritableFontBackend` in [`fontra/core/protocols.py`](https://github.com/fontra/fontra/blob/main/src/fontra/core/protocols.py).
- [fontra-rcjk](https://github.com/fontra/fontra-rcjk): a project manager with login, talking to a remote server.
- A workflow action: in your package, decorate a `@dataclass(kw_only=True)` subclass of `BaseFilter` with `@registerFilterAction("my-action")` (both from `fontra.workflow.actions.base`), implement `async def processGlyph(self, glyph)`, and declare the module in the `fontra.workflow.actions` entry point group. `RoundCoordinates` in Fontra's [`workflow/actions/glyph.py`](https://github.com/fontra/fontra/blob/main/src/fontra/workflow/actions/glyph.py) is a short model.

The entry points go in your package's `pyproject.toml` (all groups are listed in the [reference]({{ site.url }}/reference/plugins#server-plug-ins)):

```toml
[project.entry-points."fontra.filesystem.backends"]
myformat = "my_package.backend:MyFormatBackend"

[project.entry-points."fontra.webcontent"]
myplugin = "my_package.client"   # serves my_package/client/ under /myplugin/
```

Install the package in the same Python environment as Fontra (`pip install -e .` while developing) and restart the server.

## Publishing your plug-in

Two public addresses work for a plug-in kept in a GitHub repository, with `plugin.json` at the repository's root. Both were checked with the [Fontra Tutorials](https://github.com/Uplus-Type/fontra-tutorials) plug-in; what fails, and how, is noted so that you recognise it.

### On GitHub Pages (a full URL)

1. Put this workflow in the repository, as `.github/workflows/pages.yml`:

   {% raw %}```yaml
   name: Publish to GitHub Pages
   on:
     push:
       branches: [main]
     workflow_dispatch:
   permissions:
     contents: read
     pages: write
     id-token: write
   concurrency:
     group: pages
     cancel-in-progress: false
   jobs:
     deploy:
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/checkout@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: .
         - id: deployment
           uses: actions/deploy-pages@v4
   ```{% endraw %}

2. **Enable Pages on the repository: *Settings › Pages › Build and deployment › Source: GitHub Actions*.** This is the step that is easy to miss: without it the workflow runs and fails at its last step with *Failed to create deployment (status: 404) … Ensure GitHub Pages has been enabled*, and Fontra's plug-in manager answers *An error occured when fetching the plugin* because `https://<owner>.github.io/<repo>/plugin.json` is a 404 page (*There isn't a GitHub Pages site here*).
3. Push to `main`, or re-run the failed workflow from the *Actions* tab. About a minute later, `https://<owner>.github.io/<repo>/plugin.json` opens in a browser.
4. The address to add in *Application settings › Plugins* is `https://<owner>.github.io/<repo>` (the owner in lower case, no trailing slash). Every push to `main` publishes the new version; the browser may keep the old files for a while (reload with the cache disabled).

GitHub Pages serves every file with the right media type and with `Access-Control-Allow-Origin: *`, which is what `import()` from Fontra's origin needs.

### As `owner/repo` (jsDelivr)

The short form `owner/repo` is loaded through jsDelivr as `https://cdn.jsdelivr.net/gh/owner/repo@latest/…`, and **`@latest` means the latest tagged release**: a repository with no tag has nothing to resolve to, `plugin.json` is a 404, and the plug-in manager refuses the address with the same *An error occured when fetching the plugin*.

1. Tag a release and push the tag: `git tag v0.1.0 && git push --tags` (any tag that reads as a version; a GitHub *Release* made from the web does the same).
2. Check that `https://cdn.jsdelivr.net/gh/<owner>/<repo>@latest/plugin.json` opens in a browser, and that `…@latest/<init script>` does too. jsDelivr resolves `@latest` **file by file** and caches each answer for up to 24 hours, failures included: a file asked for before the tag existed keeps answering *Failed to fetch version info* (a 404) until then. The symptom in Fontra is treacherous: the plugin manager accepts the address, since `plugin.json` resolves, but the editor then prints *Module didn't load* and the plug-in does not appear. The remedy is jsDelivr's purge endpoint: open `https://purge.jsdelivr.net/gh/<owner>/<repo>@latest/<file>` once for each file of the plug-in (the manifest, every script, the icons), which answers with a small JSON and clears the cache at once. The cache is also per spelling of the owner (`Uplus-Type/…` and `uplus-type/…` are two entries), so purge the spelling users will type. Do the same after every new tag, so that users get it right away. The exact tag, `…@v0.1.0/…`, is available immediately in any case.
3. Add `owner/repo` in *Application settings › Plugins*. Users get the newest tag the next time jsDelivr refreshes (or at once, after a purge); tag again to publish a new version.

### What does not work

- The repository's own address (`https://github.com/<owner>/<repo>`): `plugin.json` is not there, *Plugin metadata not found*.
- `https://raw.githubusercontent.com/<owner>/<repo>/main`: `plugin.json` loads, but the scripts come as `text/plain`, which the browser refuses for a module: *Module didn't load*.
- Any static server without CORS headers (Python's `http.server`, say): the browser refuses the cross-origin fetch.

## Limitations

- **No access to Fontra's modules**: see “The one rule to know” above. Plug-ins rely on the editor's internal objects, which can change between Fontra versions.
- **View menu**: Fontra registers the *View* menu actions for visualization layers before plug-ins load. A plug-in layer marked `userSwitchable: true` shows in the menu with its raw action name and greyed out, so keep `userSwitchable: false` and offer the switch in your panel.
- **Translations**: tab and tool tooltips are looked up in Fontra's translation tables, which a plug-in can't extend; set the `title` attributes yourself, as above.
- **Editor only**: plug-ins load in the glyph editor, not in the font overview or font info views.
- **Open tab not restored**: Fontra restores the sidebar tab that was open last time before plug-ins load, so a plug-in panel left open is closed again after a reload. Users click its tab; nothing to do on your side.
