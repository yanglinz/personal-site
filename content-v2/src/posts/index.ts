import { SvelteAST } from "../mdx";

interface Post {
  id: string;
  title: string;
  date: string;
}

interface PostDetail {
  id: string;
  title: string;
  date: string;
  body: SvelteAST;
}
