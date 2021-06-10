import React, { useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import queryAllDiscussions from '../../services/cms/all-discussions';
import PageHeading from '../../components/PageHeading';
import IconCommunity from '../../components/svg/icons/IconCommunity';
import Button from '../../components/Button';
import Tab from '../../components/Tab';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import TopicItem from '../../components/TopicItem';
import TopicData from '../../components/TopicData';
import Type from '../../components/Type';
import withAuth from '../../components/WithAuth';
import STATIC_ROUTES from '../../constants/routes';
import ButtonLink from '../../components/ButtonLink';
import Link from 'next/link';

const MessageBoardIndex: React.FC = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const query = useQuery(
    'all-discussions',
    () => queryAllDiscussions({ page: 1, withReplies: true }),
    {
      onError: (error) => {
        console.log(error);
        setError(error);
      },
      staleTime: 60 * 1000,
    },
  );

  if (error) {
    router.push(STATIC_ROUTES.Home);
    return null;
  }

  return (
    <>
      <Head>
        <title>Message board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeading>
        <IconCommunity />
        <Type as="h2" size="pageheading">
          Discussions
        </Type>
        <Link href={STATIC_ROUTES.NewMessageBoardTopic}>
          <ButtonLink
            color="success"
            css={{
              marginLeft: 'auto',
            }}
          >
            New topic
          </ButtonLink>
        </Link>
      </PageHeading>
      <Tabs>
        <Tab active>Recent</Tab>
        <Tab>Most discussed</Tab>
        <Tab>Unanswered</Tab>
        <Tab>My topics</Tab>
      </Tabs>
      <Card>
        {query.isSuccess &&
          query.data.data.board_topic.map((topic) => {
            return (
              <TopicItem>
                <Avatar src="https://i.pravatar.cc/48" alt="Avatar" />
                <TopicData>
                  <Type as="h3" size="larger">
                    {topic.title}
                  </Type>
                  <Type color="muted" css={{ marginRight: '$sm' }}>
                    {topic.user_created.first_name}
                  </Type>
                  <Type color="muted" css={{ marginRight: '$sm' }}>
                    {new Date(topic.date_created).toDateString()}
                  </Type>
                  {topic.replies ? (
                    <Type color="muted">{Object.entries(topic.replies).length} replies</Type>
                  ) : (
                    <Type color="muted">No replies</Type>
                  )}
                </TopicData>
              </TopicItem>
            );
          })}
      </Card>
    </>
  );
};

export default withAuth(MessageBoardIndex);
