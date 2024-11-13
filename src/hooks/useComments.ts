import { useState } from 'react';
import { Comment } from '../types/Comment';
import { addComment, deleteComment } from '../api/comments';
import { getCommentsByPostId } from '../api/posts';

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');

  const fetchComments = () => {
    setLoading(true);

    getCommentsByPostId(postId)
      .then(res => setComments(res))
      .finally(() => setLoading(false));
  };

  const handleAddComment = (comment: Omit<Comment, 'id'>) => {
    addComment(comment)
      .then(res => {
        if (res.postId) {
          setComments(prevState => [...prevState, res]);
        } else {
          setError('Fetch comments with error');
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);

    setComments(comments.filter(comment => comment.id !== id));
  };

  return {
    isLoading,
    isError,
    comments,

    handleAddComment,
    handleDeleteComment,
    fetchComments,
  };
};
