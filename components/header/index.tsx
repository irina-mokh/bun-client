import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="box">
        <nav className={styles.nav}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" alt="logo" width="48" height="48"></Image>
              <span className={styles.logo__text}>Bun</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};
