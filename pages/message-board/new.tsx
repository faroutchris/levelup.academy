import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from 'react';
import { useMutation } from 'react-query';
import Input from '../../components/Input';
import DirectusError from '../../constants/directus-error';
import STATIC_ROUTES from '../../constants/routes';
import mutationCreateTopic, {
  MutationDataResponse,
  MutationDataRequest,
} from '../../services/cms/create-topic';

const NewTopic: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');

  const mutation = useMutation<
    AxiosResponse<MutationDataResponse>,
    DirectusError,
    MutationDataRequest
  >((data) => mutationCreateTopic(data), {
    onSuccess: (res) => {
      setTimeout(
        () =>
          router.push(`${STATIC_ROUTES.MessageBoardTopic}/${res.data.create_board_topic_item.id}`),
        500,
      );
    },
  });

  const handlePost: FormEventHandler = async (event) => {
    event.preventDefault();

    mutation.mutate({ title, text: post });
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
          <Input
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
