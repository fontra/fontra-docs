---
title     : Background Image
layout    : default
permalink : /reference/editor-view/canvas/glyph-editor/background-image
draft     : true
order     : 4214
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

*Background images* have a certain transformation and may have an opacity specified. They are used usually to trace a design at the beginning of a new project.
{: .lead }

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips
{: .alert-heading}
- editing properties like opacity or transformation works with **multi-source-editing**
- **unlock** or **lock** the background image via the context menu (they are locked by default)
- the image file or data can be in PNG or JPEG format
{: .mb-0 }
</div>

![]({{ site.url }}/images/background-image.png){: .img-fluid }

#### Add background image (can be added to a glyph in three ways):
- Paste image data
- Drop an image file onto the canvas
- Choose an image file from the user's hard drive, with the **Glyph** -> **Add background image...** menu.

#### Un/Lock background image
1. **unlock** or **lock** the background image via the context menu

![]({{ site.url }}/images/background-image-unlock.png){: .img-fluid }

#### Edit background image
1. **unlock** background image
2. select the image (the glyph needs to be in edit mode, and at a selected source, not at an interpolation)
3. edit images properties like opacity or transformation
    - via **Selection info** panel: opacity, color or transformation 
![]({{ site.url }}/images/background-image-edit-selection-info.gif){: .img-fluid }
    - via **Transformation** panel: flip, align, etc
![]({{ site.url }}/images/background-image-edit-transformation-panel.gif){: .img-fluid }
    - via **Transform selection**: scale, rotate interactively with *Pointer tool* 
![]({{ site.url }}/images/background-image-edit-transform-selection.gif){: .img-fluid }

#### Delete background image
1. select the image
2. delete via keyboard or right click context-menu **delete selection**

#### Show/hide background images
1. go to [Glyph editor appearance](/reference/menu/view/glyph-editor-appearance)
2. click **Background image**

<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> Caveat: support for background images is limited to the .designspace/.ufo and .fontra backends. It is currently not supported in the rcjk backend.
{: .mb-0 }
</div>