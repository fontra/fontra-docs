---
title     : Designspace
layout    : default
permalink : /explanations/designspace/
draft     : true
order     : 5001
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="../../explanations">Explanations</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
  </ol>
</nav>

We recommend spending some time with setting up your designspace properly (but it's not a problem to modify the designspace after the design started as well). Questions you may ask yourself before you start with a new typeface:
{: .lead }

- What axes do your font project will end up with?
  - [Registered axes](https://learn.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg#registered-axis-tags) like *Weight*, *Width*, *Italic*, *Optical size*
  - or even a [non-registered axes (all uppercase tags)](https://fonts.google.com/variablefonts#axis-definitions?)
- What ranges will these axes have?
  - maybe *Weight* from 100 to 900 (Thin to Black)
  - maybe *Width* from 75 to 150 (Condensed to Wide)
- Do you plan to have *Italics*?
  - Are the *Italics* real *Italics* (maybe use [Axis Type Discrete]({{ site.url }}/reference/menu/font/axes#range-axis-type-discrete))
  - or are they interpolatable with the uprights, like Slanted? (maybe use [Axis Type Continuous]({{ site.url }}/reference/menu/font/axes#range-axis-type-continuous))
- Which font instances are you planning to have?
- Which font sources are required for this designspace?

![]({{ site.url }}/images/designspace-sketch.png){: .img-fluid }

### Example:
Let's imagine we want to create a typeface with the following axes:
- **Weight** 100 to 900
- **Width** 75 to 150

#### Minimum of font sources required:
  - Condensed Thin
  - Condensed Black
  - Wide Thin
  - Wide Black

(But keep in mind that you may need also intermediate sources to tweak the design somewhere in between.)

#### Number of font instances planned:
  - Condensed Thin (width: 75, weight: 100)
  - Condensed Light
  - Condensed Regular (width: 75, weight: 400)
  - Condensed Medium
  - Condensed Bold
  - Condensed Black (width: 75, weight: 900)
  - Thin (width: 100, weight: 100)
  - Light
  - Regular (width: 100, weight: 400)
  - Medium
  - Bold
  - Black (width: 100, weight: 900)
  - Wide Thin (width: 150, weight: 100)
  - Wide Light
  - Wide Regular (width: 150, weight: 400)
  - Wide Medium
  - Wide Bold
  - Wide Black (width: 150, weight: 900)


Once you have sketched out your designspace, you're ready to create your [font axes]({{ site.url }}/reference/menu/font/axes).


### Links

- [Google Fonts: Designspace](https://fonts.google.com/knowledge/glossary/designspace)
- [fonttools: designspaceLib](https://fonttools.readthedocs.io/en/latest/designspaceLib/)
