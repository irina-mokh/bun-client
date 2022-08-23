import styles from './action.module.scss';

import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { IAction } from '../../interfaces/action';
import { ICategory } from '../../interfaces/category';

import { selectMain } from '../../store/main/selectors';

type IActionProps = {
  item: IAction,
  catFrom: ICategory,
  catTo: ICategory,
};

export const Action = ({ item, catFrom, catTo }: IActionProps) => {
  const { categories } = useSelector(selectMain);
  const action = item;
  const { sum, createdAt } = action;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const sources = categories.filter(
    (cat: ICategory) => cat.type === 'income' || cat.type === 'asset'
  );
  const targets = categories.filter(
    (cat: ICategory) => cat.type === 'asset' || cat.type === 'expense'
  );

  const fromOptions = sources.map((item: ICategory) => (
    <option value={item.name} key={item.id}>
      {item.name}
    </option>
  ));

  const toOptions = targets.map((item: ICategory) => (
    <option value={item.name} key={item.id}>
      {item.name}
    </option>
  ));

  return (
    <div className={styles.action}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.action__fieldset}>
          <select
            id="from"
            defaultValue={catFrom?.name}
            {...register('from', { required: true })}
            className="input"
          >
            {fromOptions}
          </select>
          <span>&#8595;</span>
          <select
            id="to"
            defaultValue={catTo?.name}
            {...register('to', { required: true })}
            className="input"
          >
            {toOptions}
          </select>
          <div className={styles.action__info}>
            <input
              id="sum"
              defaultValue={sum}
              {...register('sum', { required: true })}
              className="input w-5/12"
            />
            <input
              type="date"
              defaultValue={String(createdAt).substring(0, 10)}
              {...register('date', { required: true })}
              className="input w-5/12"
            />
          </div>
        </fieldset>
        <input type="submit" value="Save" className="btn" />
      </form>
    </div>
  );
}
