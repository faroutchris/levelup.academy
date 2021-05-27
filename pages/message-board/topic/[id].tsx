import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import config from '../../../config/config';

const Topic: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;
  const [topic, setTopic] = useState<Topic>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [textArea, setTextArea] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const handleOnChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${config.apiHost}/comments/topic/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({
        body: textArea,
      }),
    });

    if (response.ok) {
      setTextArea('');
      fetchComments();
    } else {
      setSubmitError(true);
    }
  };

  const fetchTopic = async () => {
    const topic: Topic = await fetch(`${config.apiHost}/topics/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
      },
    }).then((res) => res.json());

    setTopic(topic);
  };

  const fetchComments = async () => {
    const comments: Comment[] = await fetch(`${config.apiHost}/comments/topic/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
      },
    }).then((res) => res.json());

    setComments(comments);
  };

  useEffect(() => {
    if (id) {
      fetchTopic();
      fetchComments();
    }
  }, [id]);

  if (!topic) {
    return null;
  }

  return (
    <main>
      <h1>{topic.title}</h1>
      <p>{topic.post}</p>

      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.user.username}</p>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>

      <textarea
        id="comment-text"
        name="comment-text"
        onChange={handleOnChange}
        value={textArea}
      ></textarea>
      {submitError && <p className="text-red-500">Something went wrong</p>}
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default Topic;
