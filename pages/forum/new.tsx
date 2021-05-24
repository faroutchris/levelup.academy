import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from 'react';
import config from '../../config/config';
import STATIC_ROUTES from '../../constants/routes';
import { StatusCodes } from '../../constants/statuscodes';

const NewTopic: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');

  const handlePost: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${config.apiHost}/topics`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify({
          title,
          post,
        }),
      });

      const data = await response.json();
      console.log(data);

      router.push(STATIC_ROUTES.Forum);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleOnChange = (event, field) => {
    const value = event.target.value;
    if (field === 'title') {
      setTitle(value);
    }
    if (field === 'post') {
      setPost(value);
    }
  };

  return (
    <main>
      <form onSubmit={handlePost}>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            className="border"
            value={title}
            onChange={(e) => handleOnChange(e, 'title')}
          />
        </div>
        <div>
          <textarea
            name="post"
            id="post"
            className="border"
            value={post}
            onChange={(e) => handleOnChange(e, 'post')}
          ></textarea>
        </div>
        <input type="submit" />
      </form>
    </main>
  );
};

export default NewTopic;
