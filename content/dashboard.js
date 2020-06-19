export default {
  widgets: [
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"]
      },
      layout: { width: "full" }
    }
  ]
};
