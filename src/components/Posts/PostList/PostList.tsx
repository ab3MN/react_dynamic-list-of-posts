import { FC, memo } from 'react';
import { PostListItem } from './PostListItem';
import { Post } from '../../../types/Post';

interface PostsListProps {
  posts: Post[];
}

export const PostList: FC<PostsListProps> = memo(({ posts }) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <PostListItem post={post} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
