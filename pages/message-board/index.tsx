import React from 'react';
import Head from 'next/head';
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
import { useQuery } from 'react-query';
import queryAllDiscussions from '../../services/cms/all-discussions';

const MessageBoardIndex: React.FC = () => {
  const query = useQuery('all-discussions', () =>
    queryAllDiscussions({ page: 1, withReplies: true }),
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeading>
        <IconCommunity />
        <Type as="h2" size="pageheading">
          Discussions
        </Type>
        <Button
          color="success"
          css={{
            marginLeft: 'auto',
          }}
        >
          New topic
        </Button>
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
                  <Type as="h3">{topic.title}</Type>

                  <Type color="muted" css={{ marginRight: '$sm' }}>
                    {topic.user_created.first_name}
                  </Type>
                  <Type color="muted" css={{ marginRight: '$sm' }}>
                    {new Date(topic.date_created).toDateString()}
                  </Type>
                  <Type color="muted">{Object.entries(topic.replies).length}</Type>
                </TopicData>
              </TopicItem>
            );
          })}
      </Card>
    </>
  );
};

export default MessageBoardIndex;
