---
title     : Canvas
layout    : default
permalink : /reference/editor-view/canvas/
draft     : true
order     : 4210
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

The canvas is where both font previewing and glyph editing take place.
{: .lead }

* Table of Contents
{:toc}


Type preview
------------
  
##### Edit the preview text

The preview string can be edited in the [preview text panel]. 


Navigation
----------

##### Zoom and move around

Use the [navigation tools] to zoom in and out and move around the canvas.

##### Go to other glyphs

Use the [preview text panel] to go to other glyphs by typing characters.  
Use the [find glyph panel] to search for glyphs by name.

##### Go to other sources

Use the *sources* section of the [designspace panel] to switch to another source.  
Use the shortcut keys ⌘ ↑ to go to the previous source, and ⌘ ↓ to go to the next source.


{% comment %}

Glyph selection
---------------

Use the [pointer tool] to select / deselect glyphs.

Only one glyph can be selected at a time. Attributes of the glyph are loaded into the [glyph info panel](#) and into the [designspace panel](#).

Glyph editing
-------------

#### Activating editing mode

Double-click a glyph to activate the *editing mode* for that glyph. In place of a 'black' preview shape, you will now see an outline representation of the bézier contours with points and handles.

#### Measuring distances

Use the [measurement tool] to measure distances between points along the contour.

#### Editing contours and components

Use the [pointer tool] to select and move contours, segments points, handles, components.

Use the [pen tool] to draw new contours and add points to existing contours.

Fontra supports cubic and quadratic outlines.

You can use the standard keyboard shortcuts ⌘ Z to undo the last actions, and ⇧ ⌘ Z to redo them.

<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> Fontra does not have a *save* command – every change is saved!
{: .mb-0 }
</div>

#### Editing glyph metrics

The width of the glyph can be changed in the [glyph info panel].

<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> It is currently not possible to change glyph margins interactively.
{: .mb-0 }
</div>

#### Editing glyph attributes

<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> 
The name and unicode value of a glyph also cannot be changed.
{: .mb-0 }
</div>

#### Editing components

Component functions are available from the [context menu], for example creating new components or decomposing existing ones.

#### Editing anchors

<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> Editing anchors is supported in Fontra yet. Existing anchors are not displayed.
{: .mb-0 }
</div>

#### Creating a new source for the current glyph

...


Designspace
-----------

#### Navigating through the designspace

When working with designspace, you can jump quickly from one source to another using the short keys ⌘ ↑ (previous source) and ⌘ ↓ (next source).



[preview text panel]: #
[glyph info panel]: # 
[designspace panel]: #
[navigation tools]: #
[pointer tool]: #
[pen tool]: #
[shape tool]: #
[ruler tool]: #
[hand tool]: #
[context menu]: #

{% endcomment %}


[navigation tools]: ../navigation
[preview text panel]: ../panels/preview-text
[find glyph panel]: ../panels/find-glyph
[designspace panel]: ../panels/designspace
[reference font panel]: ../panels/reference-font
