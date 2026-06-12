---
title     : Anchors
layout    : default
permalink : /reference/editor-view/canvas/glyph-editor/anchors
draft     : true
order     : 4213
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/canvas">Canvas</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/canvas/glyph-editor">Glyph editor</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

*Anchors* have a specific location (x/y) and are identified via a name. They are used usually as a reference point for components.
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips
{: .alert-heading}
- Add/edit anchors works with **multi-source-editing**
- **Select all anchors** by entering multiple times the short cut `⌘` + `a` for Mac (or `Ctrl` + `a` for Windows)
- **Show/hide anchor names** via [Glyph editor appearance](/reference/menu/view/glyph-editor-appearance)
- **Show coordinates** via [Glyph editor appearance](/reference/menu/view/glyph-editor-appearance)
{: .mb-0 }
</div>


![]({{ site.url }}/images/canvas-glyph-editor-anchor.png){: .img-fluid }

#### Add anchor
1. **right click** where you want to add an anchor
2. select **add anchor**
3. enter name 
  - optinal: modify x and/or y
4. click **add**

![]({{ site.url }}/images/canvas-glyph-editor-anchor-add.png){: .img-fluid }

#### Edit anchor
1. **double click** the anchor
2. edit name, x or y value
3. click **edit**

![]({{ site.url }}/images/canvas-glyph-editor-anchor-edit.png){: .img-fluid }

#### Delete anchor
1. select one or more anchors
2. delete via keyboard or right click context-menu **delete selection**


#### Show/hide anchor names
1. go to [Glyph editor appearance](/reference/menu/view/glyph-editor-appearance)
2. click **Anchor names**

#### Show/hide anchor coordinates
1. go to [Glyph editor appearance](/reference/menu/view/glyph-editor-appearance)
2. click **Coordinates**
3. select anchor(s)

Actions
-------

<table class='table table-hover'>
<tr>
<th width='35%'>Action</th>
<th width='65%'>Description</th>
</tr>
<tr>
<td>right click + add anchor</td>
<td>adds an anchor</td>
</tr>
<tr>
<td>right click + add anchor (multi-source-editing)</td>
<td>adds an anchor to all sources, relative to the advance width</td>
</tr>
<tr>
<td>double click an anchor</td>
<td>edit anchor</td>
</tr>
<tr>
<td>double click anchor (multi-source-editing)</td>
<td>edit anchor in all sources, for example change anchor name in entire glyph</td>
</tr>
</table>

**Anchors** introduction
-------
<video src="{{ site.url }}/videos/canvas-glyph-editor-anchor.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>

Position **Anchors** (multi source editing)
-------
with the help of *Align and distribute objects* 
<video src="{{ site.url }}/videos/canvas-glyph-editor-anchor-position.mp4" controls="controls" style="width: 100%; max-width: 600px">
</video>

