I've been thinking recently about what I want to do with my personal domain
`yanglinzhao.com`. While it's currently just a home for my personal blog, I do
ultimately want it to be a a place where I can publish all my one-off side
projects and experiments. I wanted the ability to easily throw up a
`cool-side-project.yanglinzhao.com` or publish some experiments on
`yanglinzhao.com/some-experiment/`.

## Current Setup

Currently, the naked domain `yanglinzhao.com` is a statically generated
[Gatsby](https://www.gatsbyjs.org/) blog. So the setup is actually very simple
at the moment; I just publish the project on [Zeit](https://zeit.co) and follow
its custom domain instructions.

- `yanglinzhao.com` → Zeit

## Ideal Setup

However, I do have the tendency to try out different technologies and ideas. And
I wanted my domain setup to enable that. Whether I create and host a traditional
Django project in [Heroku](https://www.heroku.com/), publish a one-off single
page app on [Netlify](https://www.netlify.com/), or host a serverless app on
[Zeit](https://zeit.co), I want these project to have a home on my
`yanglinzhao.com` domain, whether that's a subdomain or a sub-folder.

- `yanglinzhao.com` → Zeit
- `some-side-project.yanglinzhao.com` → Zeit
- `another-side-project.yanglinzhao.com` → Heroku
- `yanglinzhao.com/cool-experiment/` → Netlify

I knew this would be difficult to manage with DNS alone, particularly if I
wanted to host a project on a sub-folder.

I also wanted to avoid having to run a traditional reverse proxy like Nginx, as
this would require me running and monitoring an extra server. I've become
spoiled by aforementioned PaaS like Zeit and Heroku, where I can largely deploy
my code and trust the service to keep my application running. I'm reluctant to
give up the convenience around deployment and upkeep that these PaaS offers,
convenience that I would not have if I wanted to run Nginx on a IaaS.

## Enter Cloudflare Workers

Luckily, I was already using Cloudflare as my DNS provider, and I'd recently
discovered
[Cloudflare workers](https://www.cloudflare.com/products/cloudflare-workers/).
Implementing a simple reverse proxy seemed to be a perfect fit for it.

Using the de-factor [wrangler CLI](https://github.com/cloudflare/wrangler), I
was able to setup a very simple reverse proxy with just a few lines of code.

```js
function getProxyUrl(event: FetchEvent) {
  const proxies = {
    "yanglinzhao.com": "yanglin-zhao-personal-site.netlify.com",
    "www.yanglinzhao.com": "yanglin-zhao-personal-site.netlify.com",
    "cool-project.yanglinzhao.com": "cool-project.yanglin.now.sh",
    "another-project.yanglinzhao.com": "another-project.yanglin.now.sh",
  };

  const proxyUrl = new URL(event.request.url);
  proxyUrl.hostname = proxies[proxyUrl.hostname];
  return proxyUrl;
}

async function getResponse(event: FetchEvent) {
  return await fetch(getProxyUrl(event));
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(getResponse(event));
});
```

## Conclusion

Once I got the setup working, I've been very happy with Cloudflare workers. I
was able to setup a dead simple reverse proxy with a few lines of code, and I've
barely scratched the surface of
[what's possible](https://github.com/cloudflare/worker-examples).

I'm excited to see someone other than AWS at the seat of serverless revolution,
and I'm excited to see where Cloudflare workers takes us.
