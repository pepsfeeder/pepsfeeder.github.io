###### Components
- Integrate static search (pagefind)
```Shell
hugo
npx pagefind --site public
python3 -m http.server -d public
```
- CMS
[netlify](http://localhost:1313/admin/#/)
Front Matter VSCode plugin

###### Content
- Publish al jazeera origins post (AR/EN)
- US performance before election, the Best show

**Key best practices**
While there are many things you can do to improve your site's SEO, there are a few core practices that can have the most impact on your web content's ranking and appearance on Google Search:

* Create helpful, reliable, people-first content.
* Use words that people would use to look for your content, and place those words in prominent locations on the page, such as the title and main heading of a page, and other descriptive locations such as alt text and link text.
* Make your links crawlable so that Google can find other pages on your site via the links on your page.
* Tell people about your site. Be active in communities where you can tell like-minded people about your services and products that you mention on your site.
* If you have other content, such as images, videos, structured data, and JavaScript, make sure you're following those specific best practices so that we can understand those parts of your page too.
* Enhance how your site appears on Google Search by enabling features that make sense for your site.
* If you have content that shouldn't be found in search results or you want to opt out entirely, use the appropriate method for controlling how your content appears in Google Search.

###### Variables
GH_TOKEN=PAT_REMOVED

###### Google Tags
Google analytics events: link click, header click, footer click, button click, email click, phone click, scroll, session duration, error_404, page loaded, cookiebot, consent mode

###### Deployment
rm -rf public
git submodule add https://github.com/pepsfeeder/pepsfeeder.github.io.git public

hugo
cd public
git add .
git commit -m "Deploy"
git push

###### Resources
- [Google Search documentation](https://developers.google.com/search/docs)
- [Cookie Consent with Google Tag Manager](https://youtu.be/Weml0MiOk-o)
- [Consent Mode V2](https://youtu.be/KVXnCdImOSk)

