import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useReducer } from 'react';
import { useMutation } from 'react-query';
import Validatable from '../components/Validatable';
import STATIC_ROUTES from '../constants/routes';
import DirectusError from '../constants/directus-error';
import postAuthRegister from '../services/api/post-auth-register';
import { AxiosResponse } from 'axios';

const validations = {
  leastChars: (n: number) => ({
    fn: (value: string): boolean => n <= value.length,
    errorMessage: `Must be at least ${n} characters`,
  }),
  isEmail: {
    fn: (value: string): boolean => /^\S+@\S+\.\S+$/.test(value),
    errorMessage: `This doesn't seem to be a valid email address`,
  },
  goodPassword: {
    fn: (value: string): boolean => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value),
    errorMessage: `Use at least one number, one lowercase and one uppercase character in your password`,
  },
  passwordMatch: (input: string) => ({
    fn: (value: any): boolean => input === value,
    errorMessage: `Passwords must match`,
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
  inputConfirmPassword: { isValid: boolean; value: string };
};

const initialState = {
  inputEmail: { isValid: false, value: '' },
  inputPassword: { isValid: false, value: '' },
  inputConfirmPassword: { isValid: false, value: '' },
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

export const Register = (): JSX.Element => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const mutation = useMutation<AxiosResponse<LoginResponse>, DirectusError, UserDataRequest>(
    (userData) => postAuthRegister(userData),
    {
      onSuccess: (res) => {
        localStorage.setItem('AuthToken', res.data.accessToken);
        setTimeout(() => router.push(STATIC_ROUTES.MessageBoard), 2000);
      },
    }
  );

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formIsValid = Object.keys(state).every((key) => state[key].isValid);

    formIsValid &&
      mutation.mutate({
        email: state.inputEmail.value,
        password: state.inputPassword.value,
      });
  };

  const handleInput = (inputId: string, isValid: boolean, value: string) => {
    dispatch({ type: actions.SetValidInput, payload: { isValid, value }, meta: inputId });
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5">
              <div className="col-6 d-none d-md-flex bg-primary"></div>
              <div className="card-body p-5">
                <h5 className="card-title text-center mb-5">Sign up</h5>
                <form className="form-signup" onSubmit={handleSubmit}>
                  <div className="form-label-group mb-3">
                    <Validatable
                      initialValue=""
                      onChange={(isValid, value) => handleInput('inputEmail', isValid, value)}
                      validations={[validations.isEmail]}
                    >
                      {({ value, setValue, validate, hasError, errorMessage }) => {
                        return (
                          <>
                            <label className="mb-1" htmlFor="inputEmail">
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
                              placeholder="Email"
                              required
                            />
                            {hasError && <p className="form-text text-danger">{errorMessage}</p>}
                          </>
                        );
                      }}
                    </Validatable>
                  </div>
                  <div className="form-label-group mb-3">
                    <Validatable
                      initialValue=""
                      onChange={(isValid, value) => handleInput('inputPassword', isValid, value)}
                      validations={[validations.goodPassword, validations.leastChars(8)]}
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

                  <div className="form-label-group mb-5">
                    <Validatable
                      initialValue=""
                      watch={state.inputPassword.value}
                      onChange={(isValid, value) =>
                        handleInput('inputConfirmPassword', isValid, value)
                      }
                      validations={[validations.passwordMatch(state.inputPassword.value)]}
                    >
                      {({ value, setValue, validate, hasError, errorMessage }) => {
                        return (
                          <>
                            <label className="mb-1" htmlFor="inputConfirmPassword">
                              Confirm password
                            </label>
                            <input
                              className="form-control"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              onBlur={(e) => validate(e.target.value)}
                              type="password"
                              id="inputConfirmPassword"
                              name="Confirm password"
                              placeholder="Confirm password"
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
    </>
  );
};

export default Register;
