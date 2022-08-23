import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="box">
        <div className={styles.footer__wrapper}>
          <span className={styles.footer__year}>2022</span>
        </div>
      </div>
    </footer>
  );
};
