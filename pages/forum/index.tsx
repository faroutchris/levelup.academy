import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import config from '../../config/config';
import STATIC_ROUTES from '../../constants/routes';

const ForumIndex: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  console.log(topics);
  return (
    <main>
      <Link href={STATIC_ROUTES.NewForumTopic}>
        <a>
          <Button type="primary">Create new topic</Button>
        </a>
      </Link>
      {topics.map((topic) => (
        <h1 key={topic.id} className="font-bold text-xl">
          {topic.title}
        </h1>
      ))}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const topics = await fetch(`${config.apiHost}/topics`).then((res) => res.json());
  return {
    props: {
      topics,
    },
  };
};

export default ForumIndex;
