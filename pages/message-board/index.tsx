import React from 'react';
import Head from 'next/head';
import PageHeading from '../../components/PageHeading';
import IconCommunity from '../../components/svg/icons/IconCommunity';
import Button from '../../components/Button';
import Tab from '../../components/Tab';
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';

const MessageBoardIndex: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeading>
        <IconCommunity />
        <h2>Discussions</h2>
        <Button
          color="primary"
          css={{
            marginLeft: 'auto',
          }}
        >
          New topic
        </Button>
      </PageHeading>
      <Tabs>
        <Tab active="true">Recent</Tab>
        <Tab>Most discussed</Tab>
        <Tab>Unanswered</Tab>
        <Tab>My topics</Tab>
      </Tabs>
      <Card>
        {Array(5)
          .fill(0)
          .map((_) => (
            <p>Hello</p>
          ))}
      </Card>
      {/* <div className="row">
        <div className="col">
          <h2>Community</h2>
        </div>
        <div className="col text-end">
          <button className="btn btn-primary">New topic</button>
        </div>
      </div>
      <div className="mb-5">
        <span className="me-3">Active</span>
        <span className="me-3 text-muted">Popular</span>
        <span className="me-3 text-muted">Unanswered</span>
      </div>
      {Array(4)
        .fill(0)
        .map((n) => (
          <div key={n} className="row">
            <div className="col">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0">
                  <img
                    className="round"
                    src="https://via.placeholder.com/48/f3e44d4"
                    alt="Avatar"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-0">Forum message</h5>

                  <span className="me-3 fw-medium">Username</span>
                  <span className="me-3 text-muted">{new Date(Date.now()).toDateString()}</span>
                  <span className="me-3 text-muted">2 replies</span>
                </div>
                <div className="flex-shrink-0">
                  <img
                    className="round"
                    src="https://via.placeholder.com/38/f3e44d4"
                    alt="Avatar"
                  />
                  <img
                    className="round"
                    src="https://via.placeholder.com/38/f3e44d4"
                    alt="Avatar"
                  />
                  <img
                    className="round"
                    src="https://via.placeholder.com/38/f3e44d4"
                    alt="Avatar"
                  />
                </div>
                <div className="flex-shrink-1 ms-3">
                  <h5 className="h5-display">Forum message</h5>
                  <p className="card-text">
                    <span className="me-3">Username</span>
                    <span className="me-3 text-muted">{new Date(Date.now()).toDateString()}</span>
                    <span className="me-3 text-muted">2 replies</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))} */}
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   /** */
// };

export default MessageBoardIndex;
