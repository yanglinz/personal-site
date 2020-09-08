Microservices architecture has been a rather hot topic for a few years now. I've
now worked for a few teams that has either started off on or transitioned to
this pattern, and over time I think I've become a skeptic.

While there's no shortage of blog posts or conference talks with titles along
the lines of "We migrated to a Microservices architecture and it's been
awesome!", I'd argue that it's only likely viable for a narrow context. But
until recently, I couldn't really articulate why I'd felt this skepticism. It's
always been tacit knowledge in my mind that for 90% of teams and companies,
fragmenting an application into little services will leave you in a worse off
state than before.

Last week, I was listening to
[an episode of Software Engineering Daily](https://softwareengineeringdaily.com/2019/05/13/facebook-engineering-with-pete-hunt/)
with Pete Hunt about the engineering culture of Facebook, and he had great
nuggets of wisdom about services that finally crystallized my own thought that
has percolated for a while now in my head.

> Look at why people split things out into separate services and take the
> micro-service approach. It usually comes down to our organization is
> structured this way and we can move faster if we own our one piece of the
> codebase ourselves, we can deploy whenever we want, we can talk to other teams
> through these stable interfaces, so it gives us a lot of freedom to go and do
> our own thing without being blocked by other teams.

> I think that's great if you know what your organizational structure is going
> to be over some time horizon, or you know what the product requirements are
> going to be over some time horizon. The problem is as anybody that's working
> in a big company for more than a year knows, re-orgs happen all the time,
> product direction changes all the time, and so you end up with these services
> that you have to maintain forever that match the org structure and the product
> requirements from five years ago. Today, they don't make a lot of sense.

> I don't know whether it was intentional or not, but the Facebook approach
> basically optimizes for future unknowns. It embraces hey, we don't know how to
> chop up the application in a way that will work for tomorrow. We're going to
> just assume that we're going to have to coordinate across different systems in
> different parts of the codebase. We're just going to make that coordination as
> cheap as possible, as opposed to the micro-service approach, which is we're
> going to solve the coordination problem by just not coordinating, or by
> minimizing the amount of times that we have to coordinate.

> I think that in my opinion, embracing the future unknowns and just saying,
> “Hey, we're going to have to coordinate a lot. We're going to minimize that
> coordination cost,” is the better approach.

Micro-service architecture, despite how many times we label it as an
architectural decision, is first and foremost an organizational pattern that
then reinforces a system level architecture via
[Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law). And I think eager
adopters may never fully factor in the size and structure of their organization
into the consideration before adoption. It's primarily seen as the architectural
antidote that will increase agility™, but the cost and risk of adoption may be
brushed aside due to hype.

There are rarely anything in software engineering that can be categorized as a
good idea in all contexts, or conversely a terrible idea in all contexts. But I
do wish that as an industry, we're a little bit more critical about
understanding the root problems that we're addressing with a proposed solution,
and the nuance and context of what made it successful for others. For services,
it's much less about an architectural pattern, than it is about communication
patterns between humans and teams.

As time goes on, and your organizational structure and product evolves, you may
find that changing the boundaries of your services, restructuring teams, and
coordinating that effort will be a lot tougher than moving some files and
directory around in a Monolith. After all, the technical bits tend to be a lot
easier to wrangle than the people bits.
