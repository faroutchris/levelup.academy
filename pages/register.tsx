import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import config from '../config/config';
import { StatusCodes } from '../constants/statuscodes';

export const Register = (): JSX.Element => {
  const router = useRouter();
  const [formError, setFormError] = useState<string>(null);
  const handleSubmit: FormEventHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
    const passwordRepeat = event.target[3].value;

    if (password !== passwordRepeat) {
      setFormError('Passwords must match');
    } else {
      try {
        const response = await fetch(`${config.apiHost}/auth/local/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });

        const data = await response.json();

        if (data.statusCode === StatusCodes.BAD_REQUEST) {
          setFormError(data.message[0].messages[0].message);
        } else {
          localStorage.setItem('AuthToken', data.jwt);

          router.push('/');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
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
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!formError && <p>{formError}</p>}
      <main>
        <h1 className="title">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="identifier">Email</label>
            <input type="email" name="identifier" id="identifier" />
          </div>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="form-field">
            <label htmlFor="password-repeat">Repeat password</label>
            <input
              type="password"
              name="password-repeat"
              id="password-repeat"
            />
          </div>
          <div className="form-field">
            <input type="submit" className="btn" />
          </div>
        </form>
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

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .form-field {
          width: 600px;
          margin-bottom: 1rem;
        }

        .form-field input {
          width: 600px;
          padding: 0.5rem 1rem;
        }

        .btn {
          border: none;
          background: #6039f5;
          color: white;
          padding: 0.5rem 1rem;
        }

        @media (max-width: 600px) {
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {};

export default Register;
