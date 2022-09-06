import styles from './auth.module.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IAuthForm } from '../../interfaces/user';
import { AppThunkDispatch } from '../../store';
import { createUser, login } from '../../store/auth/actions';
import { useRouter } from 'next/router';

export default function Auth() {
  const dispatch: AppThunkDispatch = useDispatch();
  const router = useRouter();
  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    const { password, email, tab } = data;

    if (tab === 'signin') {
      dispatch(
        login({
          email: email,
          password: password,
        })
      );
      router.push('/');
    } else if (tab === 'signup') {
      if (password === data.password2) {
        dispatch(
          createUser({
            email: email,
            password: password,
          })
        );
      }
    }
  };

  const { register, handleSubmit, watch, setValue } = useForm<IAuthForm>({ mode: 'onChange' });

  const tab = watch('tab');
  const hint =
    tab === 'signin' ? (
      <p className={styles.hint}>
        Don't have an account?
        <button className={styles.btn} onClick={() => setValue('tab', 'signup')}>
          Sign up
        </button>
      </p>
    ) : (
      <p className={styles.hint}>
        Already have an account?
        <button className={styles.btn} onClick={() => setValue('tab', 'signin')}>
          Sign in
        </button>
      </p>
    );
  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>{tab === 'signin' ? 'Login:' : 'Create new user:'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.tabs}>
          <input
            type="radio"
            id="signin"
            {...register('tab')}
            value="signin"
            className={styles.radio}
            defaultChecked
          />
          <label htmlFor="signin" className={styles.tab}>
            Sign in
          </label>
          <input
            type="radio"
            id="signup"
            {...register('tab')}
            value="signup"
            className={styles.radio}
          />
          <label htmlFor="signup" className={styles.tab}>
            Sign up
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="email">E-mail:</label>
          <input
            className="input"
            placeholder="email"
            id="email"
            {...register('email', { required: true })}
          ></input>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            placeholder="password"
            id="password"
            {...register('password', { required: true })}
          ></input>
          {tab === 'signup' && (
            <>
              <label htmlFor="password2">Password:</label>
              <input
                className="input"
                placeholder="password"
                id="password2"
                {...register('password2', { required: true })}
              ></input>
            </>
          )}
        </fieldset>
        <button type="submit" className="btn btn_yellow">
          {tab === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
        {hint}
      </form>
    </div>
  );
}
