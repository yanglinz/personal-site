import Link from "next/link";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className="l-wide">
        <div className="Headher-container">
          <div>
            <h1 className={styles.title}>
              <Link href="/">
                <a className="Header-title-link">Yanglin Zhao</a>
              </Link>
            </h1>
            <p className={styles.subtitle}>hi (at) yanglinzhao.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
