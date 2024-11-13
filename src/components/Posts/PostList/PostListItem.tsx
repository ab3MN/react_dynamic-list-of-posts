import { FC, memo, useContext } from 'react';
import cn from 'classnames';
import { Post } from '../../../types/Post';
import { PostsContext } from '../../../context/PostContext';

interface PostListItemProps {
  post: Post;
}

export const PostListItem: FC<PostListItemProps> = memo(({ post }) => {
  const { selectedPost, setSelectedPost } = useContext(PostsContext);

  const handleSelectPost = (post: Post) => {
    if (post.id === selectedPost?.id) {
      setSelectedPost(null);
      return;
    }
    setSelectedPost(post);
  };
  return (
    <>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={cn('button is-link', {
            'is-light': selectedPost?.id !== post.id,
          })}
          onClick={() => handleSelectPost(post)}
        >
          {selectedPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </>
  );
});
