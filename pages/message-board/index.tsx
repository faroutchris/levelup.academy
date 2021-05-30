import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import config from '../../config/config';
import STATIC_ROUTES from '../../constants/routes';

const MessageBoardIndex: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  return (
    <main className="w-full min-h-screen relative flex flex-col overflow-hidden bg-subtle">
      <section className="bg-indigo-400">
        <div className="container max-w-screen-xl mx-auto px-4 md:px-6 h-96">
          <Header invert={true} />
        </div>
      </section>
      <div className="container max-w-screen-xl mx-auto px-4 md:px-6 -mt-80">
        <section className="mt-20 mb-16 flex justify-between items-center">
          <div>
            <h1 className="font-bold font-serif text-5xl text-gray-800">Message board</h1>
            <hr className="ml-4 mt-1 w-20 border-none h-2 bg-yellah-400" />
          </div>

          <Link href={STATIC_ROUTES.NewMessageBoardTopic}>
            <a>
              <Button type="primary">Create new topic</Button>
            </a>
          </Link>
        </section>
        <section className="bg-white px-16 py-12 rounded-xl shadow-md drop-shadow">
          {topics.map((topic) => {
            const date = new Date(topic.published_at);
            const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            return (
              <div key={topic.id} className="border-b-2 py-6 flex items-center">
                <Link href={`${STATIC_ROUTES.MessageBoardTopic}/${topic.id}`}>
                  <a>
                    <h3 className="font-medium text-xl">{topic.title}</h3>
                  </a>
                </Link>
                <span className="ml-5 font-sans">{topic.user?.username}</span>
                <span className="font-medium ml-auto">{dateString}</span>
              </div>
            );
          })}
        </section>
      </div>
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

export default MessageBoardIndex;
