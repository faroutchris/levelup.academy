import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import config from '../../../config/config';
import STATIC_ROUTES from '../../../constants/routes';

const Topic: React.FC = () => {
  const router = useRouter();
  console.log(router);
  const id = router.query.id;
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const func = async () => {
      const topic = await fetch(`${config.apiHost}/topics/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
        },
      }).then((res) => res.json());

      setTopic(topic);
    };

    if (id) func();

    return () => {
      //
    };
  }, [id]);

  console.log(topic);

  if (!topic) {
    return null;
  }
  return (
    <main>
      <h1>{topic.title}</h1>
      <p>{topic.post}</p>

      <textarea></textarea>
    </main>
  );
};

export default Topic;
