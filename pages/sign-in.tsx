import Head from 'next/head';
import Link from 'next/link';
import React, { FormEvent, FormEventHandler, useEffect, useReducer, useState } from 'react';
import config from '../config/config';
import STATIC_ROUTES from '../constants/routes';
import { StatusCodes } from '../constants/statuscodes';
import Validatable from '../components/Validatable';
import { useMutation } from 'react-query';
import StrapiApiError from '../constants/strapi-api-error';
import postAuthLocal, { UserDataSignIn } from '../services/api/post-auth-local';
import { useRouter } from 'next/router';

const validations = {
  leastChars: (n: number) => ({
    fn: (value: string): boolean => n <= value.length,
    errorMessage: `Password should not be empty`,
  }),
};

enum actions {
  SetValidInput = 'setValidInput',
}

type Actions = {
  type: actions.SetValidInput;
  payload: { isValid: boolean; value: string };
  meta: string;
};

type State = {
  inputEmail: { isValid: boolean; value: string };
  inputPassword: { isValid: boolean; value: string };
};

const initialState = {
  inputEmail: { isValid: false, value: '' },
  inputPassword: { isValid: false, value: '' },
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case actions.SetValidInput: {
      return { ...state, [action.meta]: action.payload };
    }
    default:
      return state;
  }
};

export const SignIn = (): JSX.Element => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const mutation = useMutation<UserResponse, StrapiApiError, UserDataSignIn>(
    (userData) => postAuthLocal(userData),
    {
      onSuccess: () => {
        localStorage.setItem('AuthToken', mutation.data.jwt);
        setTimeout(() => router.push(STATIC_ROUTES.MessageBoard), 2000);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = Object.keys(state).every((key) => state[key].isValid);

    formIsValid &&
      mutation.mutate({ identifier: state.inputEmail.value, password: state.inputPassword.value });
  };

  const handleInput = (inputId: string, isValid: boolean, value: string) => {
    dispatch({ type: actions.SetValidInput, payload: { isValid, value }, meta: inputId });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card flex-row my-5">
            <div className="col-6 d-none d-md-flex bg-primary"></div>
            <div className="card-body p-5">
              <h5 className="card-title text-center mb-5">Sign in</h5>
              <form className="form-signup" onSubmit={handleSubmit}>
                <div className="form-label-group mb-3">
                  <Validatable
                    initialValue=""
                    onChange={(isValid, value) => handleInput('inputEmail', isValid, value)}
                    validations={[validations.leastChars(1)]}
                  >
                    {({ value, setValue, validate, hasError, errorMessage }) => {
                      return (
                        <>
                          <label className="mb-2" htmlFor="inputEmail">
                            Email
                          </label>
                          <input
                            className="form-control"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={(e) => validate(e.target.value)}
                            type="email"
                            id="inputEmail"
                            name="Email"
                            placeholder="my@email.com"
                            required
                          />
                          {hasError && <p className="form-text text-danger">{errorMessage}</p>}
                        </>
                      );
                    }}
                  </Validatable>
                </div>
                <div className="form-label-group mb-5">
                  <Validatable
                    initialValue=""
                    onChange={(isValid, value) => handleInput('inputPassword', isValid, value)}
                    validations={[validations.leastChars(1)]}
                  >
                    {({ value, setValue, validate, hasError, errorMessage }) => {
                      return (
                        <>
                          <label className="mb-1" htmlFor="inputPassword">
                            Password
                          </label>
                          <input
                            className="form-control"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={(e) => validate(e.target.value)}
                            type="password"
                            id="inputPassword"
                            name="Password"
                            placeholder="Password"
                            required
                          />
                          {hasError && <p className="form-text text-danger">{errorMessage}</p>}
                        </>
                      );
                    }}
                  </Validatable>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" type="submit">
                    Continue
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  {mutation.isSuccess && (
                    <p className="form-text text-success">
                      Success! You will be redirected to the dashboard in a few moments
                    </p>
                  )}
                  {mutation.isError && (
                    <p className="form-text text-danger">{mutation.error.message}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const [formError, setFormError] = useState<string[]>(null);
  // const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const identifier = event.target[0].value;
  //   const password = event.target[1].value;

  //   try {
  //     const response = await fetch(`${config.apiHost}/auth/local`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       cache: 'no-cache',
  //       body: JSON.stringify({
  //         identifier,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.statusCode === StatusCodes.BAD_REQUEST) {
  //       setFormError(data.message[0].messages[0].message);
  //     }

  //     localStorage.setItem('AuthToken', data.jwt);
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   return () => {
  //     //
  //   };
  // });

  // return (
  //   <>
  //     <Head>
  //       <title>Sign in | levelup.academy</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     {!!formError && <p>{formError}</p>}
  //     <main className="w-full h-screen flex flex-row">
  //       <div className="w-1/3 h-full bg-cardinal-400"></div>
  //       <div className="px-6 w-1/3 mx-auto flex">
  //         <div className="my-auto">
  //           <h1 className="title">SignIn</h1>

  //           <form onSubmit={handleSubmit}>
  //             <div className="form-field">
  //               <input type="email" name="identifier" id="identifier" />
  //             </div>
  //             <div className="form-field">
  //               <input type="password" name="password" id="password" />
  //             </div>
  //             <div className="form-field">
  //               <input type="submit" className="btn" />
  //             </div>
  //           </form>

  //           <Link href={STATIC_ROUTES.SignUp}>Click here to sign up instead</Link>
  //         </div>
  //       </div>
  //     </main>
  //   </>
  // );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {};

export default SignIn;
