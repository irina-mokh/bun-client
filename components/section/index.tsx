import styles from './section.module.scss';

import { ICategory } from '../../interfaces/category';
import { Donut } from '../donut';
import { AddButton } from '../addButton';
import { splitByDigits } from '../../utils';

interface SectionProps {
  data: ICategory[];
  type: string;
}
export const Section = (props: SectionProps) => {
  const { data, type } = props;
  let total = 0;
  // const dates = new Map();

  const donuts = data.length ? (
    data.map((item) => {
      total += item.total;
      return (
        <li key={item.id}>
          <Donut {...item}></Donut>
        </li>
      );
    })
  ) : (
    <></>
  );

  return (
    <section className={`${styles.section} ${styles.section}_${type}`}>
      <h2 className={styles.heading}>
        {props.type + 's: '}
        <span>{splitByDigits(total)}</span>
      </h2>
      <ul className={`${styles.list} ${type === 'expense' ? styles.wrap : null}`}>
        {donuts}
        <li key="add">
          <AddButton type={props.type}></AddButton>
        </li>
      </ul>
    </section>
  );
};
