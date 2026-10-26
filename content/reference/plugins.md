---
title     : Plug-ins
layout    : default
permalink : /reference/plugins
draft     : true
order     : 4800
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

What Fontra expects from a plug-in: the manifest, the address rules, the objects an editor plug-in receives, and the Python entry points. For a guided introduction, see [Writing your own plug-ins]({{ site.url }}/how-tos/writing-plugins/).
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Note
{: .alert-heading}
Editor plug-ins work on the editor's internal objects, not on a frozen API. The names below are those of the current Fontra source; check them again when you update Fontra.
{: .mb-0 }
</div>

## Editor plug-ins

### `plugin.json`

<table class='table table-hover'>
<tr><th width='25%'>Key</th><th width='75%'>Value</th></tr>
<tr><td><code>name</code></td><td>Display name. Used in the console error if the plug-in fails to run.</td></tr>
<tr><td><code>description</code></td><td>Free text. Not used by Fontra.</td></tr>
<tr><td><code>init</code></td><td>Path of the ES module to import, relative to the plug-in folder (for example <code>init.js</code>).</td></tr>
<tr><td><code>function</code></td><td>Name of the function exported by that module. Called as <code>function(editor, pluginPath)</code>.</td></tr>
</table>

### Addresses

Added in *Application settings › [Plugins]({{ site.url }}/reference/menu/fontra/plugin-manager)*. Stored in the browser's `localStorage` under the key `fontra.pluginsplugins` as `[{"address": "…"}, …]`, so the list belongs to one browser and one server origin (host and port).

<table class='table table-hover'>
<tr><th width='35%'>Address</th><th width='65%'>Resolved to</th></tr>
<tr><td><code>owner/repo</code> (exactly one slash)</td><td><code>https://cdn.jsdelivr.net/gh/owner/repo@latest</code> — a GitHub repository with the plug-in files at its root and at least one tagged release: <code>@latest</code> is the latest tag, so a repository without tags is refused (<em>An error occured when fetching the plugin</em>). jsDelivr caches the resolution of <code>@latest</code> per file for up to a day, failures included: purge with <code>https://purge.jsdelivr.net/gh/owner/repo@latest/&lt;file&gt;</code> after tagging. See <a href="{{ site.url }}/how-tos/writing-plugins/#publishing-your-plug-in">Publishing your plug-in</a>.</td></tr>
<tr><td><code>https://…/folder</code></td><td>Used as is. The server must send CORS headers and serve the scripts with a JavaScript media type (GitHub Pages and jsDelivr do; <code>github.com</code> and <code>raw.githubusercontent.com</code> do not).</td></tr>
<tr><td><code>/folder</code></td><td>A path on the Fontra server itself, for example <code>/localplugins/my-plugin</code> or a <code>fontra.webcontent</code> package.</td></tr>
</table>

A trailing slash is removed. The resolved address is what `init()` receives as `pluginPath`.

### Loading

When the editor starts, for each address in order:

1. `GET <pluginPath>/plugin.json` — on failure: console error *“… Plugin metadata not found.”*, next plug-in.
2. `import(<pluginPath>/<init>)` — on failure: *“Module didn't load”* and the exception, next plug-in.
3. `module[function](editor, pluginPath)` — on exception: *“Error occured when running (<name>) plugin.”* and the exception.

Plug-ins load in the glyph editor only, after Fontra's own sidebars, tools, actions and menus have been set up. A plug-in cannot import Fontra's modules (`@fontra/core/…`): they are bundled and have no URL.

Files served from the Fontra server (a server path address) are limited to the extensions `.js`, `.json`, `.svg`, `.css`, `.html`, `.txt`, `.csv`, `.ico`, `.woff2` and `.wasm`, and are dated at server start-up: the browser's cached copy is reused (*304 Not Modified*) until the server restarts or the cache is disabled.

### The `editor` object

<table class='table table-hover'>
<tr><th width='35%'>Member</th><th width='65%'>Description</th></tr>
<tr><td><code>fontController</code></td><td>The font. <code>glyphMap</code> (glyph name → code points), <code>unitsPerEm</code>, <code>axes</code>, <code>await getGlyph(name)</code>.</td></tr>
<tr><td><code>sceneSettings</code></td><td>Current state: <code>selectedGlyphName</code>, <code>selectedGlyph</code>, <code>selection</code>, <code>fontLocationUser</code>, <code>positionedLines</code>, <code>text</code>, …</td></tr>
<tr><td><code>sceneSettingsController</code></td><td><code>addKeyListener(keyOrKeys, callback, immediate)</code>, <code>waitForKeyChange(key)</code>.</td></tr>
<tr><td><code>sceneModel</code></td><td><code>getSelectedPositionedGlyph()</code> → <code>{ x, y, glyph, … }</code>; <code>glyph</code> has <code>name</code>, <code>path</code>, <code>components</code>, <code>xAdvance</code>, <code>leftMargin</code>, <code>rightMargin</code>, <code>canEdit</code>.</td></tr>
<tr><td><code>sceneController</code></td><td><code>editLayersAndRecordChanges(fn)</code>, <code>editGlyphAndRecordChanges(fn)</code>, <code>addCurrentGlyphChangeListener(fn)</code>, <code>selectedTool</code>, <code>setSelectedTool(id)</code>.</td></tr>
<tr><td><code>canvasController</code></td><td><code>requestUpdate()</code>, <code>magnification</code>, <code>origin</code>, <code>localPoint(event)</code>, <code>canvas</code>.</td></tr>
<tr><td><code>visualizationLayers</code></td><td><code>definitions</code> (array sorted by <code>zIndex</code>), <code>toggle(id, on)</code>, <code>visibleLayerIds</code>, <code>darkTheme</code>.</td></tr>
<tr><td><code>visualizationLayersSettings</code></td><td>Observable of the user-switchable layers: <code>model[id]</code> is <code>true</code> or <code>false</code>.</td></tr>
<tr><td><code>addSidebarPanel(panel, side)</code></td><td><code>side</code> is <code>"left"</code> or <code>"right"</code>. Throws if the side is unknown.</td></tr>
<tr><td><code>addEditTool(tool)</code></td><td>Appends a button to the toolbar.</td></tr>
<tr><td><code>toggleSidebar(id, focus)</code></td><td>Opens or closes a panel by identifier.</td></tr>
<tr><td><code>tools</code></td><td>All tools by identifier.</td></tr>
</table>

#### Edits with undo

`editLayersAndRecordChanges(fn)` calls `fn(layerGlyphs)` with the layers being edited, keyed by layer name (one entry, or several when several sources are edited together). `fn` changes them in place and returns the undo label (a string). The change is recorded, sent to the server, and listed in *Edit › Undo*.

### Sidebar panel

An HTML element (usually with a shadow root) with:

<table class='table table-hover'>
<tr><th width='35%'>Member</th><th width='65%'>Description</th></tr>
<tr><td><code>identifier</code></td><td>Unique among all panels. Used in <code>data-sidebar-name</code> on the tab and content elements, and in the <code>localStorage</code> key <code>fontra-selected-sidebar-&lt;side&gt;</code>.</td></tr>
<tr><td><code>iconPath</code></td><td>URL of the tab's SVG icon. Must be set before <code>addSidebarPanel()</code>.</td></tr>
<tr><td><code>toggle(on, focus)</code></td><td>Optional. Called when the panel is shown (<code>on</code> is <code>true</code>) or hidden.</td></tr>
</table>

The tab's tooltip is `translate("sidebar.<identifier>")`; for a plug-in that returns the key itself, so set `title` on `.sidebar-tab[data-sidebar-name="<identifier>"]` yourself. Fontra's CSS variables (`--ui-element-foreground-color`, `--ui-element-background-color`, …) and the font family `fontra-ui-regular` are available inside the shadow root.

### Edit tool

An object with:

<table class='table table-hover'>
<tr><th width='35%'>Member</th><th width='65%'>Description</th></tr>
<tr><td><code>identifier</code></td><td>Unique among all tools. Used in <code>data-tool</code> on the button and in <code>editor.tools</code>.</td></tr>
<tr><td><code>iconPath</code></td><td>URL of the button's SVG icon.</td></tr>
<tr><td><code>activate()</code>, <code>deactivate()</code></td><td>Called when the tool is selected or another tool is.</td></tr>
<tr><td><code>async handleDrag(eventStream, initialEvent)</code></td><td>Called on mouse down; iterate <code>eventStream</code> until mouse up.</td></tr>
<tr><td><code>handleHover(event)</code></td><td>Mouse move without a button pressed.</td></tr>
<tr><td><code>handleKeyDown(event)</code></td><td>Keys other than arrows. Define <code>handleArrowKeys(event)</code> to receive arrow keys too; otherwise Fontra nudges the selection.</td></tr>
<tr><td><code>getContextMenuItems()</code></td><td>Items appended to the canvas context menu.</td></tr>
</table>

The button's tooltip is `translate("editor.<identifier>")`, so set `title` on `[data-tool="<identifier>"]` yourself. The button is created with the `selected` class; remove it unless the tool is the active one. `editor.canvasController.localPoint(event)` converts an event to glyph coordinates.

### Visualization layer

A definition inserted into `editor.visualizationLayers.definitions` at the position given by its `zIndex`, then enabled with `toggle(identifier, true)`:

<table class='table table-hover'>
<tr><th width='35%'>Key</th><th width='65%'>Description</th></tr>
<tr><td><code>identifier</code></td><td>Unique. Prefix it with your plug-in name.</td></tr>
<tr><td><code>name</code></td><td>Translation key of the layer's title (used in the <em>View</em> menu for user-switchable layers).</td></tr>
<tr><td><code>zIndex</code></td><td>Drawing order, higher on top. Fontra's own layers use 0 (UPM grid) to 700 (glyph lock).</td></tr>
<tr><td><code>userSwitchable</code>, <code>defaultOn</code></td><td>Whether the layer is listed in <em>View › Glyph editor appearance</em>, and its initial state. Those menu actions are registered before plug-ins load, so a plug-in layer should keep <code>userSwitchable: false</code>.</td></tr>
<tr><td><code>screenParameters</code></td><td>Numbers in screen pixels, divided by the magnification before drawing (<code>strokeWidth</code>, <code>nodeSize</code>, …).</td></tr>
<tr><td><code>glyphParameters</code></td><td>Numbers in glyph units, passed unchanged.</td></tr>
<tr><td><code>colors</code>, <code>colorsDarkMode</code></td><td>Colors for the light and dark themes. All four groups are merged into <code>parameters</code>.</td></tr>
<tr><td><code>selectionFunc(visContext, layer)</code></td><td>Returns the positioned glyphs to draw for. <code>visContext.glyphsBySelectionMode</code> has <code>all</code>, <code>unselected</code>, <code>hovered</code>, <code>selected</code>, <code>editing</code> and <code>notediting</code>.</td></tr>
<tr><td><code>selectionFilter(positionedGlyph)</code></td><td>Optional filter applied by Fontra's own selectors.</td></tr>
<tr><td><code>draw({ context, positionedGlyph, parameters, model, controller })</code></td><td>Called once per glyph with the canvas context translated to the glyph's origin, baseline at <code>y = 0</code>, y up, in glyph units.</td></tr>
</table>

Call `editor.canvasController.requestUpdate()` after changing a layer's visibility.

## Server plug-ins

Python packages declaring [entry points](https://packaging.python.org/en/latest/specifications/entry-points/) in `pyproject.toml`, installed in the same environment as Fontra.

<table class='table table-hover'>
<tr><th width='30%'>Group</th><th width='35%'>Entry point name → value</th><th width='35%'>Used</th></tr>
<tr><td><code>fontra.filesystem.backends</code></td><td>File extension → class with <code>fromPath(path)</code>, optionally <code>createFromPath(path)</code>, implementing <code>ReadableFontBackend</code> / <code>WritableFontBackend</code> (<code>fontra.core.protocols</code>)</td><td>When a font file with that extension is opened or created</td></tr>
<tr><td><code>fontra.projectmanagers</code></td><td>Subcommand name → project manager factory</td><td><code>fontra &lt;name&gt; …</code></td></tr>
<tr><td><code>fontra.webcontent</code></td><td>URL prefix → package (dotted path to a folder)</td><td>Served as static files under <code>/&lt;name&gt;/</code></td></tr>
<tr><td><code>fontra.workflow.actions</code></td><td>Any name → module to import</td><td>Loaded by <code>fontra-workflow</code>; the module registers its actions with <code>@registerFilterAction("…")</code> / <code>@registerOutputAction("…")</code></td></tr>
<tr><td><code>fontra.views</code></td><td>View name → package</td><td>Listed as <em>View plugins</em> in <em>Server info</em> only</td></tr>
</table>

Fontra itself registers `designspace`, `ufo`, `ttf`, `otf`, `ttx`, `woff` and `woff2` backends, the `filesystem` project manager, and `localplugins = "fontra.localplugins"` (the folder `src/fontra/localplugins/`, not in git).
