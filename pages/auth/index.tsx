import styles from './auth.module.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IAuthForm } from '../../interfaces/user';
import { AppThunkDispatch } from '../../store';
import { createUser, login } from '../../store/auth/actions';
import Router from 'next/router';
import { selectAuth } from '../../store/auth/selectors';
import { setError } from '../../store/auth/reducer';

export default function Auth() {
  const dispatch: AppThunkDispatch = useDispatch();
  const { error, user } = useSelector(selectAuth);

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    const { password, email, tab } = data;
    if (tab === 'signin') {
      dispatch(
        login({
          email: email,
          password: password,
        })
      ).then(() => {
        if (user?.id) {
          Router.push('/');
        }
      });
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm<IAuthForm>({ mode: 'onChange' });
  const password = watch('password');
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        onChange={() => {
          dispatch(setError(''));
        }}
      >
        <fieldset className={styles.tabs}>
          <input
            type="radio"
            id="signin"
            {...register('tab')}
            name="tab"
            value="signin"
            className={`visually-hidden ${styles.radio}`}
            defaultChecked
          />
          <label htmlFor="signin" className={styles.tab}>
            Sign in
          </label>
          <input
            type="radio"
            id="signup"
            {...register('tab')}
            name="tab"
            value="signup"
            className={`visually-hidden ${styles.radio}`}
          />
          <label htmlFor="signup" className={styles.tab}>
            Sign up
          </label>
        </fieldset>
        <h2 className={styles.heading}>{tab === 'signin' ? 'Login:' : 'Create new user:'}</h2>
        <fieldset>
          <label htmlFor="email">E-mail:</label>
          <input
            className="input"
            placeholder="useremail@gmail.com"
            id="email"
            type="email"
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'not a valid e-mail',
              },
              minLength: {
                value: 7,
                message: 'min length 7',
              },
            })}
          ></input>
          <span className="error">{errors.email?.message}</span>
          <label htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            placeholder="password"
            id="password"
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'min length 6',
              },
            })}
          ></input>
          <span className="error">{errors.password?.message}</span>
          {tab === 'signup' && (
            <>
              <label htmlFor="password2">Repeat password:</label>
              <input
                className="input"
                placeholder="password"
                type="password"
                id="password2"
                {...register('password2', {
                  required: true,
                  validate: {
                    positive: (pswrd) => pswrd === password || 'make sure your passwords match',
                  },
                })}
              ></input>
              <span className="error">{errors.password2?.message}</span>
            </>
          )}
        </fieldset>
        <button
          type="submit"
          className="btn btn_yellow"
          disabled={!isValid}
          aria-label={tab === 'signin' ? 'Sign In' : 'Sign Up'}
        >
          {tab === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
        {hint}
      </form>
      {error && isSubmitted && <span className="error">{error}</span>}
    </div>
  );
}
