import React, { useReducer } from 'react';
import { useRouter } from 'next/router';
import STATIC_ROUTES from '../constants/routes';
import Validatable from '../components/Validatable';
import { useMutation } from 'react-query';
import DirectusError from '../constants/directus-error';
import postAuthLogin from '../services/auth/post-auth-login';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import useAuthStore from '../store/auth';
import Input from '../components/Input';
import Button from '../components/Button';

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
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [state, dispatch] = useReducer(reducer, initialState);
  const mutation = useMutation<AxiosResponse<LoginResponse>, DirectusError, UserDataRequest>(
    (userData) => postAuthLogin(userData),
    {
      onSuccess: (res) => {
        setAccessToken(res.data.accessToken);
        setTimeout(() => router.push(STATIC_ROUTES.Home), 2000);
      },
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const formIsValid = Object.keys(state).every((key) => state[key].isValid);

    formIsValid &&
      mutation.mutate({ email: state.inputEmail.value, password: state.inputPassword.value });
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
                          <Input
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
                          <Input
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
                <div className="d-flex justify-content-center mb-4">
                  <Button type="submit" color="success">
                    Continue
                  </Button>
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
                <div className="text-center">
                  <p>
                    Don&apos;t have an account?
                    <br />
                    <Link href={STATIC_ROUTES.Signup}>
                      <a>Click here to sign up</a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
