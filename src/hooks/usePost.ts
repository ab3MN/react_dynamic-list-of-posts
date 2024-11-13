import { useLayoutEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

export const usePosts = (selectedUser: User | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsError, setPostsError] = useState<null | string>(null);
  const [isLoadingPosts, setLoadingPosts] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (selectedUser) {
      setLoadingPosts(true);
      getUserPosts(selectedUser.id)
        .then(res => {
          Array.isArray(res)
            ? setPosts(res)
            : setPostsError('Fetch post with error');
        })
        .catch(() => {
          setTimeout(() => setPostsError(null), 3000);
        })
        .finally(() => setLoadingPosts(false));
    }
  }, [selectedUser]);

  return { posts, postsError, isLoadingPosts };
};
