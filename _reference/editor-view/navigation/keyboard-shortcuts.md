---
title     : Keyboard shortcuts
layout    : default
permalink : /reference/editor-view/navigation/keyboard-shortcuts/
draft     : true
order     : 4221
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference">Reference</a></li>
    <li class="breadcrumb-item"><a href="{{ site.url }}/reference/navigation">Navigation</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>

#### Custom shortcuts
1. Go to the menu bar, **Fontra** -> **Application settings**
2. there you’ll find a panel to set custom shortcuts for various items (menu items, tool selection, sidebar selection, glyph editor appearance toggles, and more)

<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### Pro tips: 
{: .alert-heading}
- Shortcuts are customizable
- Save your custom shortcuts as a json file via **Export shortcuts**
- Share your custom shortcuts with others via a json file by using the **Import shortcuts** button
{: .mb-0 }
</div>

![]({{ site.url }}/images/panel-shortcuts.png){: .img-fluid }

#### Some of the predefined shortcuts

| Mac | Win or Linux | Description |
| :---: | :---: | --- |
| `⌘` + `Z` | `Ctrl` + `Z` | **undo** the last action |
| `⇧` + `⌘` + `Z` | `⇧` + `Ctrl` + `Z` | **redo** the last action  |
| `space` | `space` | **preview** with filled contours + without left and right info sections + hand tool |
| `⌘` + `-` | `Ctrl` + `-` | **zoom out** |
| `⌘` + `+` | `Ctrl` + `+` | **zoom in** |
| `⌘` + `0` | `Ctrl` + `0` | **zoom fit** to selection |
| `1` | `1` | switch tool to <a href='{{ site.url }}/reference/tools/pointer'>**Pointer tool**</a>: <img height="20" src="{{ site.url }}/images/icons/pointer.svg"> |
| `2` | `2` | switch tool to <a href='{{ site.url }}/reference/tools/pen'>**Pen tool**</a>: <img height="20" src="{{ site.url }}/images/icons/pointeradd.svg"> |
| `3` | `3` | switch tool to <a href='{{ site.url }}/reference/tools/knife'>**Knife tool**</a>: <img height="20" src="{{ site.url }}/images/icons/slice.svg"> |
| `4` | `4` | switch tool to <a href='{{ site.url }}/reference/tools/shapes'>**Shape tool**</a>: <img height="20" src="{{ site.url }}/images/icons/square-plus-2.svg"> |
| `5` | `5` | switch tool to <a href='{{ site.url }}/reference/tools/ruler'>**Power ruler tool**</a>: <img height="20" src="{{ site.url }}/images/icons/ruler.svg"> |
| `6` | `6` | switch tool to <a href='{{ site.url }}/reference/tools/hand'>**Hand tool**</a>: <img height="20" src="{{ site.url }}/images/icons/hand.svg"> |
| `⌘` + `a` | `Ctrl` + `a` | select **all** points + components, second time: include anchors + third time: only anchors |
| `⇧` + `⌘` + `a` | `⇧` + `Ctrl` + `a` | select **none** |
| `⌘` + `c` | `Ctrl` + `c` | **copy** selection or glyph |
| `⌘` + `v` | `Ctrl` + `v` | **past** selection |
| `⌘` + `x` | `Ctrl` + `x` | **cut off** selection |
| `⌘` + `Delete` or `Backspace` | `Ctrl` + `Delete` or `Backspace` | **delete** selection or glyph |
| `⌘` + `f` | `Ctrl` + `f` | toggle **glyph search** |
| `⌘` + `i` | `Ctrl` + `i` | toggle **info section** |
| `⌘` + `e` | `Ctrl` + `e` | toggle **edit all source layers** |
| `⌘` + `↑` | `Ctrl` + `↑` | select **previous source layers** |
| `⌘` + `↓` | `Ctrl` + `↓` | select **next source layers** |
| `⇧` + `⌘` + `d` | `⇧` + `Ctrl` + `d` | **decompose** components |



[Fontra Pak]: http://github.com/fontra/fontra-pak
[build Fontra from source]: ../building-fontra-from-source
[GitHub]: http://github.com
[Actions]: http://github.com/fontra/fontra-pak/actions

