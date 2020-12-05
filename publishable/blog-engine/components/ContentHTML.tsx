// Render html

export default function ContentHTML(props) {
  const { htmlAst } = props;

  console.log(htmlAst);

  return (
    <div>
      <h1>MarkdownHTML</h1>
    </div>
  );
}
