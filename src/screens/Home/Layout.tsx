import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
