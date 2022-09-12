import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { selectAuth } from '../../store/auth/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { logOut } from '../../store/auth/reducer';
import { useRouter } from 'next/router';

export const Header = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuth);
  const auth = (
    <div className={styles.link}>
      {!user ? (
        <Link href="/auth">
          <p>Login</p>
        </Link>
      ) : (
        <p
          onClick={() => {
            dispatch(logOut());
            router.push('/about');
          }}
        >
          Logout
        </p>
      )}
    </div>
  );
  return (
    <header className={styles.header}>
      <div className="box">
        <div className={styles.container}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" alt="logo" width="48" height="48"></Image>
              <span className={styles.logo__text}>Donut</span>
            </div>
          </Link>
          <nav className={styles.nav}>
            <div className={styles.link}>
              <Link href="/">Main</Link>
            </div>
            <div className={styles.link}>
              <Link href="/about">About</Link>
            </div>
            {auth}
          </nav>
        </div>
      </div>
    </header>
  );
};
