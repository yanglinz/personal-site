import IconGithub from "../Icons/Github";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="l-wide">
        <div className="Footer-links">
          <a href="https://github.com/yanglinz">
            <IconGithub width={32} fill="#486581" />
          </a>
        </div>
        <div className="Footer-copyright">
          <span>Yanglin Zhao &copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <a href="sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  );
}
