import styles from './action.module.scss';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IActionProps, IAction } from '../../interfaces/action';
import { ICategory } from '../../interfaces/category';
import { AppThunkDispatch } from '../../store';

import { selectMain } from '../../store/main/selectors';
import { createAction, editAction } from '../../store/main/action';
import { getCategoriesById } from '../../utils';

export const Action = (props: IActionProps) => {
  const { sum, from, to, date } = props.data;

  const { categories } = useSelector(selectMain);
  const dispatch: AppThunkDispatch = useDispatch();

  //get categories names by ID's
  const [catFrom, catTo] = getCategoriesById(categories, from, to);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<IAction>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IAction> = (data) => {
    if (props.onSave === 'create') {
      dispatch(createAction(data));
    } else if (props.onSave === 'edit') {
      dispatch(editAction({ ...props.data, ...data }));
    }
    props.close();
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
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
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
          <div className={styles.info}>
            <input
              id="sum"
              defaultValue={sum}
              {...register('sum', { required: true })}
              className="input w-5/12"
              autoComplete="off"
            />
            <input
              type="date"
              defaultValue={date}
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
