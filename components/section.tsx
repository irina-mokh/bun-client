import { ICategory } from '../interfaces/category';
import { Bun } from '../components/bun';
import { AddButton } from '../components/addButton';

interface SectionProps {
  data: ICategory[];
}
export const Section = (props: SectionProps) => {
  const { data } = props;
  console.log(data);
  const buns = data.map((item) => (
    <li key={item.id}>
      <Bun {...item}></Bun>
    </li>
  ));

  return (
    <section className="w-full overflow-x-auto">
      <ul className="flex my-1 items-center">
        {buns}
        <li key="add">
          <AddButton type={data[0].type}></AddButton>
        </li>
      </ul>
    </section>
  );
};
