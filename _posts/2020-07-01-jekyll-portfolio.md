---
layout: post
title: "New Jekyll blog and portfolio"
tags: general blog development
excerpt_separator: <!--more-->
---
I've been using a WordPress personal site for some time, but I decided it was time for change. Mainly, I thought it would be good for me to take the time and rebuild the portfolio portion of the site in order to have more control and a better understanding of how it was built, and to allow me to expand it's usefullness to me. \
My two main gripes with the WP portfolio were that a) I could not easily display both visual content (i.e. images) as well as markdown and code snippets, and b) the portfolio was displayed by a subscription based, payed plugin. Writing my own portfolio template helped me both overcome both of these problems, as well as taghut me quite a bit about my design skills and sharpened my understanding of Sass and CSS in general.<!--more-->
### Jekyll
From the beginning, I decided to first try and mimic the existing, WordPress based, portfolio in terms of layout and basic functionality. After I got it working, I would add the desired functionality. In order to get things going relativley quickly, I focused on writing the site in Jekyll, as it is a pretty straight-forward affair: there's minimal JS to write, and the site is generated using templates that display Markdown files. No CMS is necessary, and besides blog posts one can quite easily create additional collections, to function as (in my case) projects that will be displayed in a portfolio. Jekyll also uses Sass, so mixins and elaborately complex CSS can be written and added quite easily.
#### Modals
I used [CSS-modal](https://drublic.github.io/css-modal/) to display both picture galleries and text.
#### Displaying external content
Jekyll is a static site generator, so in order to include Markdown or code snippets from external sources at the time of rendering the site I used [a remote include tag plugin](https://github.com/netrics/jekyll-remote-include). Jekyll templates are written in Liquid, and provide a local (to the repository) include and relative_include tags, but using a "remote include" tag allows one to fetch Markdown files and embed them in the site as it is being generated.