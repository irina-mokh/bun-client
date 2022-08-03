import { ICategory } from '../interfaces/category';
import { Bun } from '../components/bun';
import { AddButton } from '../components/addButton';

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
    <section className="w-full overflow-x-auto">
      <h2 className="capitalize">{props.type + 's'}</h2>
      <ul className="flex my-1 items-center">
        {buns}
        <li key="add">
          <AddButton type={props.type}></AddButton>
        </li>
      </ul>
    </section>
  );
};
