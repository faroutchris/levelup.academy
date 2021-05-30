import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Validatable from '../components/Validatable';
import config from '../config/config';
import STATIC_ROUTES from '../constants/routes';

export const Register = (): JSX.Element => {
  const router = useRouter();
  const [password, setPassword] = useState<string>(null);
  const mutation = useMutation<
    UserResponse,
    Error,
    { email: string; username: string; password: string }
  >(async (userData) => {
    const response = await fetch(`${config.apiHost}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) return Promise.reject(data.message[0].messages[0].message);

    return data;
  });

  const handleSubmit: FormEventHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;

    mutation.mutate({ email, username, password });
  };

  useEffect(() => {
    if (mutation.data) {
      localStorage.setItem('AuthToken', mutation.data.jwt);
      setTimeout(() => router.push(STATIC_ROUTES.MessageBoard), 2000);
    }
  }, [mutation.isSuccess]);

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
      errorMessage: `Use at least one number in your password`,
    },
    passwordMatch: (input: string) => ({
      fn: (value: any): boolean => input === value,
      errorMessage: `Passwords must match`,
    }),
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="container">
        {mutation.isSuccess && 'Yay'}
        {mutation.isError && 'Error' + ' ' + mutation.error}
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5">
              <div className="col-6 d-none d-md-flex bg-primary"></div>
              <div className="card-body p-5">
                <h5 className="card-title text-center mb-5">Sign up</h5>
                <form className="form-signup" onSubmit={handleSubmit}>
                  <div className="form-label-group mb-3">
                    <Validatable initialValue="" validations={[validations.isEmail]}>
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
                  <div className="form-label-group mb-5">
                    <Validatable initialValue="" validations={[validations.leastChars(3)]}>
                      {({ value, setValue, validate, hasError, errorMessage }) => {
                        return (
                          <>
                            <label className="mb-1" htmlFor="inputUsername">
                              Username
                            </label>
                            <input
                              className="form-control"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              onBlur={(e) => validate(e.target.value)}
                              type="text"
                              id="inputUsername"
                              name="Username"
                              placeholder="Username"
                              required
                              autoFocus
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
                      onChange={setPassword}
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
                      validations={[validations.passwordMatch(password)]}
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
