export default {
  widgets: [
    {
      name: "sanity-tutorials",
      options: {
        templateRepoId: "sanity-io/sanity-template-gatsby-blog"
      }
    },
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId: "5eeb7825a9c61b0db8096d72",
                  title: "Sanity Studio",
                  name: "sanity-sapper-blog-studio-w25annxp",
                  apiId: "a5d8643c-227c-47a0-ac2d-51ca2cbce333"
                },
                {
                  buildHookId: "5eeb78256092df7b03ca7de9",
                  title: "Blog Website",
                  name: "sanity-sapper-blog-web-focxispn",
                  apiId: "b2343300-e5a6-475d-880a-817406bb82d1"
                }
              ]
            }
          }
        ],
        data: [
          {
            title: "GitHub repo",
            value: "https://github.com/yanglinz/sanity-sapper-blog",
            category: "Code"
          },
          {
            title: "Frontend",
            value: "https://sanity-sapper-blog-web-focxispn.netlify.app",
            category: "apps"
          }
        ]
      }
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"]
      },
      layout: { width: "medium" }
    }
  ]
};
