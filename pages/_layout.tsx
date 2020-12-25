import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

type TODO = any;

export default function Layout(props: TODO) {
  return (
    <div className="Layout">
      <Header />
      <div className="Layout-content">{props.children}</div>
      <Footer />
    </div>
  );
}
