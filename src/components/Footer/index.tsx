import IconGithub from "../Icons/Github";

export default function Footer() {
  return (
    <div className="py-8 text-center">
      <div className="l-wide">
        <div>
          <span className="inline-block mx-auto">
            <a href="https://github.com/yanglinz">
              <IconGithub width={18} fill="#486581" />
            </a>
          </span>
        </div>

        <div className="pt-1 text-gray-400 text-sm">
          <span>Yanglin Zhao &copy; {new Date().getFullYear()}</span>
          <span> | </span>
          <a href="sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  );
}
