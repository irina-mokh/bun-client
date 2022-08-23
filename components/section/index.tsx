import styles from './section.module.scss';

import { ICategory } from '../../interfaces/category';
import { Bun } from '../bun';
import { AddButton } from '../addButton';

interface SectionProps {
  data: ICategory[];
  type: string;
}
export const Section = (props: SectionProps) => {
  const { data } = props;

  const buns = data.length ? (
    data.map((item) => (
      <li key={item.id}>
        <Bun {...item}></Bun>
      </li>
    ))
  ) : (
    <></>
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{props.type + 's'}</h2>
      <ul className={styles.list}>
        {buns}
        <li key="add">
          <AddButton type={props.type}></AddButton>
        </li>
      </ul>
    </section>
  );
};
