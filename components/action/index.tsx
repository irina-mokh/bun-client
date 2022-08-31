import styles from './action.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { IActionProps } from '../../interfaces/action';
import { ICategory } from '../../interfaces/category';
import { AppThunkDispatch } from '../../store';

import { selectMain } from '../../store/main/selectors';
import { createAction } from '../../store/main/action';
import { getCategories } from '../../utils';
import { useEffect } from 'react';
import Router from 'next/router';

export const Action = (props: IActionProps) => {
  const { sum, from, to, createdAt } = props.data;
  const { categories } = useSelector(selectMain);
  const dispatch: AppThunkDispatch = useDispatch();
  const date = createdAt || new Date().toISOString();
  //get categories names by ID's
  const [catFrom, catTo] = getCategories(from, to);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    dispatch(createAction(data));
    props.close();
    router.push('/');
  };
  useEffect(() => {
    setFocus('sum');
  }, []);

  const sources = categories.filter(
    (cat: ICategory) => cat.type === 'income' || cat.type === 'asset'
  );
  const targets = categories.filter(
    (cat: ICategory) => cat.type === 'asset' || cat.type === 'expense'
  );

  const fromOptions = sources.map((item: ICategory) => (
    <option value={item.id} key={item.id}>
      {item.name}
    </option>
  ));

  const toOptions = targets.map((item: ICategory) => (
    <option value={item.id} key={item.id}>
      {item.name}
    </option>
  ));

  return (
    <div className={styles.action}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.action__fieldset}>
          <select
            id="from"
            defaultValue={catFrom?.id}
            {...register('from', { required: true })}
            className="input"
          >
            {fromOptions}
          </select>
          <span>&#8595;</span>
          <select
            id="to"
            defaultValue={catTo?.id}
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
              autoComplete="off"
            />
            <input
              type="date"
              defaultValue={String(date).substring(0, 10)}
              {...register('date', { required: true, min: 1 })}
              className="input w-5/12"
            />
          </div>
        </fieldset>
        <input type="submit" value="Save" className="btn btn_yellow" disabled={!isValid} />
      </form>
    </div>
  );
};
