---
title     : Documentation overview
layout    : default
permalink : /explanations/documentation/
order     : 5099
---

<nav aria-label="breadcrumb">
  <ol class="breadcrumb small">
    <li class="breadcrumb-item"><a href="{{ site.url }}">Index</a></li>
    <li class="breadcrumb-item"><a href="../../explanations">Explanations</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>

* Table of Contents
{:toc}

### How this documentation is written

- try to use the tool, figure out how things work, ask questions to the developers
- write it down as clearly as possible to pave the path for other users
- with input from users and developers, make it better over time

{% comment %}
<div class="alert alert-warning" role="alert" markdown='1'>
<i class="bi bi-exclamation-circle me-1"></i> Keep the docs up-to-date in relation to the app!
{: .mb-0 }
</div>
{% endcomment %}

### How this documentation is structured

- content is written and structured around the matrix proposed by the [Documentation System]
- TL;DR: there are four types of documentation: *tutorials*, *how-tos*, *reference*, *explanations*
- this system makes it easier for users to find what they are looking for, and for authors to expand and maintain the docs

[Documentation System]: http://documentation.divio.com/

### How this documentation is built

- documentation source is available as a [separate repository][fontra-docs] (public & open-source)
- documentation website is built with [Jekyll] and served with [GitHub Pages]
- content is written in [kramdown] \(markdown) with bits in html (mostly tables)
- templates are written in [Liquid]
- responsive layout is implemented with [Bootstrap]
- additional styles are written in [Sass] (for example custom font, custom classes, icon, etc.)
- the website is updated automatically at every commit to the `main` branch of the repository

[fontra-docs]: http://github.com/fontra/fontra-docs
[Jekyll]: http://jekyllrb.com/
[GitHub Pages]: http://pages.github.com/
[kramdown]: http://kramdown.gettalong.org/index.html
[Liquid]: http://shopify.github.io/liquid/
[Bootstrap]: http://getbootstrap.com/
[Sass]: http://sass-lang.com/

{% comment %}
### How to propose changes to the docs

if you see a mistake or would like to propose an improvement:

- create an issue on the `fontra-docs` repository
- send a message on [Discord](https://discord.gg/SeZWugEYzd) with the label `docs`
- fork the `fontra-docs` repository and submit a pull request
{% endcomment %}

### How the repository is structured

```
fontra-docs
├── _includes/
├── _layouts/
├── _py/
├── css/
├── images/
├── videos/
├── _introduction/
├── _reference/
├── _explanations/
├── _tutorials/
├── _how-tos/
├── index.md
└── 404.html
```

<div class='row'>
<div class='col-md' markdown='1'>
##### System (developers, designers)

\_includes
: modular template parts such as header and footer

\_layouts
: just a single `default.html` template for now

\_py
: Python scripts used to create images, etc.

css
: contains `style.sass` with custom styles only

404.html
: page for *Page not found* errors

\_config.yml
: Jekyll configuration file with project metadata
</div>
<div class='col-md' markdown='1'>
##### Content (documentation authors)

tutorials
: sources for pages in the *Tutorials* section

how-tos
: sources for pages in the *How-Tos* section

reference
: sources for pages in the *Reference* section

explanations
: sources for pages in the *Explanations* section

index.md
: home page of the documentation

images
: all images (screenshots, icons, etc.)

videos
: all videos
</div>
</div>


<div class="alert alert-primary mt-3" role="alert" markdown='1'>
#### See also
{: .alert-heading}

- [Reporting bugs, feature ideas, etc.]({{ site.url }}/how-tos/reporting)
{% comment %}
- [Editing the documentation](#)
{% endcomment %}
{: .mb-0 }
</div>