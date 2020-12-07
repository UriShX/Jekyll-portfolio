# Jekyll-portfolio
A Jekyll template based on the [Minima](https://github.com/jekyll/minima) theme, with the addition of a portfolio page template.

Deployment to github pages is done through Github action, see below.

## Contents At-A-Glance

This template is based on the latest version of [Minima](https://github.com/jekyll/minima), with slightly modified site branding, an addition of a `portfolio` layout, and [Staticman](https://staticman.net/) static comments support.

- *For all other files and configuration options not described here, please refer to the [Minima](https://github.com/jekyll/minima) documentation*
- *For a step-by-step tutorial on how to set up [Staticman](https://staticman.net/) for your own site, please refer to [Travis Downs'](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html) post on the subject.*

### Layouts

Refers to files within the `_layouts` directory, that define the markup for your theme.

  - `portfolio.html` &mdash; The layout for your portfolio. Builds your portfolio based on a collection stored in `_portfolio`. \
  This file will only render if a `.md` page with `layout: portfolio` in it's front matter is present
  - `post.html` &mdash; Modified from [Minima's](https://github.com/jekyll/minima) version to include [Staticman](https://staticman.net/) static comments.

### Portfolio
Refers to files within the `_portfolio` directory, which contain the Markdown files that define each portfolio project, and contain the brief description of the project to be displayed in `mouseover` events.

Each file in the directory can contain the following front matter:
```yaml
place: # Integer, optional. See collection definition in _config.yml.
cover: coverimg.jpg # Optional but highly desirable. See assets/img/portfolio, below.
title: "A short title" # Will display in the short description of the project.
tags: tag1 tag2 # Tags for filtering relevant projects by buttons in the portfolio.html layout.
link: https://github.com/UriShX/Jekyll-portfolio # Optional, if the project can be linked to a blog post, etc.
modal:
  - code:
        link: https://raw.githubusercontent.com/githubuser/portfolio/master/some-arduino-script.ino
        lang: cpp # Required if code key is in use
        # linenos: linenos="1 22"
  - md: https://raw.githubusercontent.com/githubuser/portfolio/master/README.md
  - img: project_image1.png # See assets/img/portfolio, below.
  - img: project_image2.gif # See assets/img/portfolio, below.
  - img: coverimg.jpg # See assets/img/portfolio, below.
```

The `modal` key elements' order defines the default behavior of the gallery modal windows. If the first element is either a `md` or a `code` link, the first modal will display the parsed content of this file, and will display a link to a lightbox gallery. If the first element is `img`, the first modal to display for each project will be a lightbox, and if one of the `modal` sub-keys is either `md` or `code` they will be displayed as a placeholder image link, which when pressed will lead to the modal containing the parsed code or markdown.

*The front matter does not have to contain any subkeys in the `modal` key to disaply the project with a brief description and a cover image*

### Sass

Refers to `.scss` files within the `_sass` directory that define the theme's styles.

  - `drublic-css-modal/` &mdash; This library contains the CSS based modal files. See documentation at [css-modal](https://drublic.github.io/css-modal/).
  - `minima/` &mdash; This library contains the customized files which define the layout for [Minima](https://github.com/jekyll/minima),including the portfolio layout, the custom header, and the imports of all `.scss` and `.css` files.
  

### Assets

Refers to various asset files within the `assets` directory.

  - `assets/css/zenburn.css` &mdash; Pygments / Rouge code highlighting. From [jekyll-pygments-themes](https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html).
  - `assets/img/banner.png` &mdash; Site branding banner. Configure in `_config.yml`.
  - `assets/img/logo.png` &mdash; Site branding logo. Used as placeholder cover image for portfolio projects which do not specify a cover image in their front matter. Configure in `_config.yml`.
  - `assets/img/portfolio/` &mdash; Parent folder for portfolio projects' images. Each project should have it's own subfolder, eg.:  \
  &#9500;` _portfolio/` \
  &#9474;&ensp;&#9500;` project1.md` \
  &#9474;&ensp;&#9492;` project2.md` \
  &#9500;` _assets/` \
  &#9474;&ensp;&#9492;` img/` \
  &#9474;&emsp;&#9492;` portfolio/` \
  &#9474;&ensp;&emsp;&#9500;` project1/` \
  &#9474;&emsp;&ensp;&#9474;&nbsp;&#9500;` image1.gif` \
  &#9474;&emsp;&ensp;&#9474;&nbsp;&#9492;` image2.gif` \
  &#9474;&ensp;&emsp;&#9492;` project2/` \
  &#9474;&emsp;&emsp;&ensp;&#9492;` image1.gif` \
  - `assets/img/portfolio/twotone_description_black_48pt_3x.png` &mdash; Placeholder image for modal galleries which contain both code or markdown files as well as images.
  - `assets/script/modal*` &mdash; Files used by `css-modal`, for use in portfolio projects.
  - `assets/scripts/portfolio-tag-filter.js` &mdash; Used in `portfolio.html`. Filters portfolio projects according to selected tag (button), and changes the close `<a>` tag `href` to the selcted tag.
  - `assets/script/staticman-comments.js` &mdash; Static comments JS controller, for use with [Staticman](https://staticman.net/).
  - `assets/minima-social-icons.svg` &mdash; A composite SVG file comprised of *symbols* related to various social-media icons. \
  This file is used as-is without any processing. Refer [section on social networks](#social-networks) for its usage.\
  *Added the [Hackaday logo](https://hackaday.io/project/165314-hackaday-social-media-icon).*


### Plugins

- Minima comes with [`jekyll-seo-tag`](https://github.com/jekyll/jekyll-seo-tag) plugin preinstalled to make sure your website gets the most useful meta tags. See [usage](https://github.com/jekyll/jekyll-seo-tag#usage) to know how to set it up.
- Plugins included in the `Gemfile`: 
  - [`jekyll-remote-include`](https://github.com/UriShX/jekyll-remote-include/tree/context-variables) &mdash; Based on [netrics/jekyll-remote-include](https://github.com/netrics/jekyll-remote-include). \
  I've added the possibility to allow passing the `link` parameter to the Liquid tag, in order to get the link from a portfolio project's front matter. \
  There's an open [pull request](https://github.com/netrics/jekyll-remote-include/pull/2) for the change.
  - [`jekyll-highlight-param`](https://github.com/UriShX/jekyll-highlight-param) &mdash; Based on Jekyll's [highlight](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting) Liquid tag to allow passing the `language` parameter from a portfolio project's front matter.

### Deploy to github
Since the site uses plugins and a custom template, I am using a Github action by [limjh16/jekyll-action-ts](https://github.com/limjh16/jekyll-action-ts) to publish the site to github pages. \
You can find a sample workflow file for publishing the site to a github pages user site in the main directory of this repo, named `sample_publish_workflow.yml`.

Since this repository contains only the template for [my site](https://urishx.github.io), it uses a [workflow by sepulsa](https://github.com/sepulsa/push_then_pr) to create a PR on my site's hidden repository. You can find that workflow configuration file for this repo, under `.github\workflows`.


## Usage

**To use this template you can download or `git clone` this repository. _If you do, please replace the site's branding (`assets\img\logo.png`, `assets\img\log_code.png`, `assets\img\banner.png`), and replace it with your own_** \

Have the following line in your config file:
```yaml
theme: minima
```
### Portfolio configuration

The `portfolio.html` relys on a definition of a dedicated [collection](https://jekyllrb.com/docs/collections/), called `portfolio`. The markdown files for this collection are placed in the `_portfolio/` directory, as decribed above. Have the following in your `_config.yml`:
```yaml
collections:
  portfolio:
    sort_by: place # Optional, less comfortable to use then order.
    order: # Optional, but much better in practice than sort_by.
      - project5.md
      - project2.md
      - project1.md
```
In the above example, The projects will be displayed in the following order:
  1. Project5
  1. Project2
  1. Project1
  1. Project3
  1. Project4
  
Followed by any other projects found in the `_portfolio/` directory

### Author Metadata

From `Minima-3.0` onwards, `site.author` is expected to be a mapping of attributes instead of a simple scalar value:

```yaml
author:
  name: John Smith
  copyright-year: 2020
  email: "john.smith@foobar.com"
```

### Social networks
I have added the [Hackaday logo](https://hackaday.io/project/165314-hackaday-social-media-icon) to [Minima's](https://github.com/jekyll/minima) default social networks icons. \

Check out the documentation for how to set up social network configuration in the [Minima](https://github.com/jekyll/minima) readme.

### Enabling Excerpts on the Home Page

To display post-excerpts on the Home Page, simply add the following to your `_config.yml`:

```yaml
show_excerpts: true
```

### Static comments in posts

To use static comments using [Staticman](https://staticman.net/) in posts instead of [Minima's](https://github.com/jekyll/minima) default [Disqus](https://disqus.com/), [Travis Downs'](https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html) post on the subject was a great starting point for me, and there's a `staticman.yml` file included in the main folder of this repo, as well as the required lines in `_config.yml` for setting up Google reCaptcha. \
Comments are enabled in the post's front matter:
```yaml
comments: true
```

## Development

To test your site, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your template and the contents. As you make modifications, your site will regenerate and you should see the changes in the browser after a refresh.

## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
