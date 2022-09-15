import styles from './about.module.scss';
import Image from 'next/image';
import WalletIcon from '../../assets/icons/wallet.svg';
import FlashIcon from '../../assets/icons/flash.svg';
import ChartIcon from '../../assets/icons/chart.svg';
import PhoneIcon from '../../assets/icons/phone.svg';

export default function About() {
  return (
    <div className={`${styles.box} box`}>
      <h2 className={styles.heading}>Donut app</h2>
      <p className={styles.text}>
        Donut app - is a budget manager. You can use it yourself or with family members to track
        your assets and expenses.
      </p>
      <p className={styles.text}>
        To create a transaction drag a circle donut and drop it on target category.
      </p>
      <h3 className={styles.h3}>Advantages:</h3>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Image src={WalletIcon} className={styles.icon} alt="icon" width="36" height="36" />
          <p className={styles.text}>The Donut is free!</p>
        </li>
        <li className={styles.li}>
          <Image src={PhoneIcon} className={styles.icon} alt="icon" width="36" height="36" />
          <p>You can use app on any device.</p>
        </li>
        <li className={styles.li}>
          <Image src={FlashIcon} className={styles.icon} alt="icon" width="36" height="36" />
          <p className={styles.text}>Easy and quick usage via drag'n'drop</p>
        </li>
        <li className={styles.li}>
          <Image src={ChartIcon} className={styles.icon} alt="icon" width="36" height="36" />
          <p className={styles.text}>Statistic for analyzing your expenses.</p>
        </li>
      </ul>
    </div>
  );
}
