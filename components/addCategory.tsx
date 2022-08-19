import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createCategory } from '../store/main/action';
import { ICategoryForm } from '../interfaces/category';
import { AppThunkDispatch } from '../store';
import { selectAuth } from '../store/auth/selectors';

interface AddCategoryProps {
  type: string;
}
export default function AddCategory(props: AddCategoryProps) {
  const dispatch: AppThunkDispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector(selectAuth);
  const userId = auth.user.id;

  const [type, setType] = useState(props.type);

  const { register, handleSubmit } = useForm<ICategoryForm>();
  const onSubmit: SubmitHandler<ICategoryForm> = (data) => {
    console.log(data);
    const { name, type } = data;
    const total = Number(data.total) || 0;
    dispatch(createCategory({ name, type, total, userId }));
    // router.push('/');
  };

  const types = ['income', 'asset', 'expense'];
  const typesOptions = types.map((type: string, i) => (
    <option value={type} key={i}>
      {type}
    </option>
  ));

  return (
    <div className="container mx-auto max-w-md p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name', { required: true })} className="input"></input>
        <select
          id="type"
          defaultValue={type}
          {...register('type', { required: true })}
          className="input"
          onChange={(e) => setType(e.target.value)}
        >
          {typesOptions}
        </select>
        {type === 'asset' && (
          <>
            <label htmlFor="sum">Sum</label>
            <input className="input" id="sum" {...register('total', { required: true })}></input>
          </>
        )}
        <input type="submit" value="Create" className="btn" />
      </form>
    </div>
  );
}
