import { useRouter } from 'next/router';
import { IAction } from '../../interfaces/action';
import { useForm } from 'react-hook-form';
import styles from '../../styles/Action.module.css';

import { selectMain } from '../../store/main/selectors';

import { useSelector } from 'react-redux';
import { ICategory } from '../../interfaces/category';

export default function Action() {
  const { query } = useRouter();
  const id = Number(query.id);

  const { actions, categories } = useSelector(selectMain);
  const action = actions.find((act: IAction) => act.id === id);
  const { sum, createdAt } = action;

  const catFrom = categories.find((cat: ICategory) => cat.id === action?.from);
  const catTo = categories.find((cat: ICategory) => cat.id === action?.to);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  // const fromOptions = () => (
  //   <>
  //     <option>1</option>
  //     <option>2</option>
  //   </>
  // );
  // const toOptions = () => (
  //   <>
  //     <option>1</option>
  //     <option>2</option>
  //   </>
  // );

  return (
    <div className="container mx-auto px-2 max-w-sm">
      <h2>Action c id {query.id}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col my-3">
          <select
            id="from"
            defaultValue={catFrom?.name}
            {...register('from', { required: true })}
            className={styles.input}
          >
            <option value={catFrom?.name}>{catFrom?.name}</option>
            {/* {fromOptions} */}
          </select>
          <span>&#8595;</span>
          <select
            id="to"
            defaultValue={catTo?.name}
            {...register('to', { required: true })}
            className={styles.input}
          >
            <option value={catTo?.name}>{catTo?.name}</option>

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
