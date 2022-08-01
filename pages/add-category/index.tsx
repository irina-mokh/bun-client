import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AddCategory() {
  const router = useRouter();
  const { query } = router;
  const { catType } = query;
  const [type, setType] = useState(catType);

  useEffect(() => {
    router.replace({
      query: { ...query, catType: type },
    });
  }, [type]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
            <input className="input" id="sum" {...register('sum', { required: true })}></input>
          </>
        )}
        <input type="submit" value="Create" className="btn" />
      </form>
    </div>
  );
}
