import styles from './footer.module.scss';
import GithubIcon from '../../assets/icons/gh.svg';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="box">
        <div className={styles.wrapper}>
          <a className={styles.gh} href="https://github.com/irina-mokh" target="_blank">
            <Image
              className={styles.gh__icon}
              src={GithubIcon}
              alt="author's github page"
              width={20}
              height={20}
            />
            <span>irina-mokh</span>
          </a>
          <span className={styles.year}>2022</span>
        </div>
      </div>
    </footer>
  );
};
