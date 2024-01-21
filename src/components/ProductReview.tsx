import React from 'react';
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from '@/store/features/products/productApi';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  //* new code

  const [comment, setComment] = React.useState('');

  const { data, isLoading: gettingComments } = useGetCommentsQuery(id);
  const [postComment, { isLoading: postingComment, isSuccess }] =
    usePostCommentMutation();

  const handleSubmit = () => {
    postComment({
      id,
      data: { comment },
    });
    setComment('');
  };

  if (gettingComments) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea
          className="min-h-[30px]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          onClick={handleSubmit}
        >
          <FiSend />
        </Button>
      </div>
      {postingComment && <p>Posting comment...</p>}
      {isSuccess && <p className="text-green-500">Comment posted!</p>}
      <div className="mt-10">
        {data.data.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
