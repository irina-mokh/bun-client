import { useRouter } from 'next/router';
import { IActionProps } from '../../interfaces/action';
import { useForm } from 'react-hook-form';
import styles from '../../styles/Action.module.css';

export default function Action({ action, catFrom, catTo }: IActionProps) {
  const { query } = useRouter();
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => console.log(data);

  const { sum, createdAt } = action;

  // const fromOptions = ()
  // const toOptions =

  return (
    <div className="container mx-auto px-2 max-w-sm">
      <h2>Action c id {query.id}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col my-3">
          <select
            id="from"
            defaultValue={catFrom.name}
            {...register('from', { required: true })}
            className={styles.input}
          >
            {/* {fromOptions} */}
          </select>
          <span>&#8595;</span>
          <select
            id="to"
            defaultValue={catTo.name}
            {...register('to', { required: true })}
            className={styles.input}
          >
            {/* {toOptions} */}
          </select>
        </fieldset>
        <div className="flex justify-between">
          <input
            id="sum"
            defaultValue={sum}
            {...register('sum', { required: true })}
            className={styles.input}
          />
          <input
            type="date"
            defaultValue={String(createdAt).substring(0, 10)}
            {...register('date', { required: true })}
            className={styles.input}
          />
        </div>
        <input
          type="submit"
          value="Save"
          className={
            styles.input +
            ' block mx-auto m-3 w-40 hover:bg-brown hover:text-almond active:opacity-90 transition-all'
          }
        />
      </form>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://bun-app.herokuapp.com/api/action/${params.id}`);
  const action = await response.json();
  // get data of Category FROM
  const catFromResponse = await fetch(`https://bun-app.herokuapp.com/api/category/${action.from}`);
  const catFrom = await catFromResponse.json();

  // get data of Category TO
  const catToResponse = await fetch(`https://bun-app.herokuapp.com/api/category/${action.to}`);
  const catTo = await catToResponse.json();

  return {
    props: { action, catFrom, catTo },
  };
}
