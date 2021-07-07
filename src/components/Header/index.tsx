import Link from "next/link";

export default function Header() {
  return (
    <div className="Header border-gray-150 py-8 border-b">
      <div className="l-wide">
        <div>
          <h1 className="m-0 text-base leading-snug">
            <Link href="/">
              <a className="text-gray-900">Yanglin Zhao</a>
            </Link>
          </h1>
          <p className="m-0 text-gray-500 text-base leading-snug">
            hi (at) yanglinzhao.com
          </p>
        </div>
      </div>
    </div>
  );
}
