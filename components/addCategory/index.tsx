import styles from './addCategory.module.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createCategory } from '../../store/main/action';
import { ICategoryForm } from '../../interfaces/category';
import { AppThunkDispatch } from '../../store';
import { selectAuth } from '../../store/auth/selectors';

interface AddCategoryProps {
  type: string;
  close: () => void;
}
export default function AddCategory(props: AddCategoryProps) {
  const dispatch: AppThunkDispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const userId = auth.user.id;

  const [type, setType] = useState(props.type);

  const { register, handleSubmit, setFocus } = useForm<ICategoryForm>();
  const onSubmit: SubmitHandler<ICategoryForm> = (data) => {
    const { name, type } = data;
    const total = Number(data.total) || 0;
    dispatch(createCategory({ name, type, total, userId }));
    props.close();
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const types = ['income', 'asset', 'expense'];
  const typesOptions = types.map((type: string, i) => (
    <option value={type} key={i}>
      {type}
    </option>
  ));

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <label htmlFor="name">
            Name:
            <input
              id="name"
              {...register('name', { required: true })}
              className="input"
              placeholder="Category title"
            />
          </label>
          <select
            id="type"
            defaultValue={type}
            {...register('type', { required: true })}
            className={`${styles.catType} input`}
            onChange={(e) => setType(e.target.value)}
          >
            {typesOptions}
          </select>
        </fieldset>
        {type === 'asset' && (
          <>
            <label htmlFor="sum">Sum</label>
            <input
              className={`${styles.catName} input`}
              id="sum"
              {...register('total', { required: true })}
              placeholder="Sum"
            ></input>
          </>
        )}
        <input type="submit" value="Create" className="btn btn_yellow" />
      </form>
    </div>
  );
}
