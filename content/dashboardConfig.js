export default {
  widgets: [
    { name: "structure-menu" },
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
