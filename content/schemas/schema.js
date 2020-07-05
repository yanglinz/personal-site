import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import author from "./documents/author";
import category from "./documents/category";
import post from "./documents/post";

import bodyPortableText from "./objects/bodyPortableText";
import bioPortableText from "./objects/bioPortableText";
import excerptPortableText from "./objects/excerptPortableText";
import mainImage from "./objects/mainImage";
import contentImage from "./objects/contentImage";
import authorReference from "./objects/authorReference";

export default createSchema({
  name: "blog",
  types: schemaTypes.concat([
    post,
    category,
    author,
    mainImage,
    contentImage,
    authorReference,
    bodyPortableText,
    bioPortableText,
    excerptPortableText
  ])
});
