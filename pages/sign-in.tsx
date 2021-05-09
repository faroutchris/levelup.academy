import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import config from '../config/config';
import STATIC_ROUTES from '../constants/routes';
import { StatusCodes } from '../constants/statuscodes';

export const Login = (): JSX.Element => {
  const [formError, setFormError] = useState<string[]>(null);
  const handleSubmit: FormEventHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const identifier = event.target[0].value;
    const password = event.target[1].value;

    try {
      const response = await fetch(`${config.apiHost}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (data.statusCode === StatusCodes.BAD_REQUEST) {
        setFormError(data.message[0].messages[0].message);
      }

      localStorage.setItem('AuthToken', data.jwt);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      //
    };
  });

  return (
    <div className="container">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!formError && <p>{formError}</p>}
      <main>
        <h1 className="title">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input type="email" name="identifier" id="identifier" />
          </div>
          <div className="form-field">
            <input type="password" name="password" id="password" />
          </div>
          <div className="form-field">
            <input type="submit" className="btn" />
          </div>
        </form>

        <Link href={STATIC_ROUTES.SignUp}>Click here to sign up instead</Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            height={'32'}
            width={'64'}
          />
        </a>
      </footer>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {};

export default Login;
