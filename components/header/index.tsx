import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { selectAuth } from '../../store/auth/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { AppThunkDispatch } from '../../store';
import { logOut } from '../../store/auth/reducer';

export const Header = () => {
  const dispatch: AppThunkDispatch = useDispatch();

  const { user } = useSelector(selectAuth);
  const auth = !user ? (
    <Link href="/auth">
      <p>Login</p>
    </Link>
  ) : (
    <Link href="/auth">
      <p onClick={() => dispatch(logOut())}>Logout</p>
    </Link>
  );
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
          {auth}
        </nav>
      </div>
    </header>
  );
};
