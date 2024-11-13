import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useState,
} from 'react';
import { PostsContext } from '../context/PostContext';
import { Comment } from '../types/Comment';

export const useCommentForm = (
  handleAddComment: (comment: Omit<Comment, 'id'>) => void,
) => {
  const { selectedPost } = useContext(PostsContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const showErrors = () => {
    if (!name) {
      setNameError('Name is required');
    }
    if (!email) {
      setEmailError('Email is required');
    }
    if (!body) {
      setBodyError('Enter some text');
    }
  };

  const reset = () => {
    setNameError('');
    setEmailError('');
    setBodyError('');
    setName('');
    setEmail('');
    setBody('');
  };

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);

      nameError && setNameError('');
    },
    [nameError],
  );

  const handleChangeEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);

      emailError && setEmailError('');
    },
    [emailError],
  );

  const handleChangeBody = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setBody(event.target.value);

      bodyError && setBodyError('');
    },
    [bodyError],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(name && email && body)) {
      showErrors();

      return;
    }

    setLoading(true);

    handleAddComment({
      name,
      email,
      body,
      postId: selectedPost!.id,
    });

    setBody('');
    setLoading(false);
  };

  return {
    name,
    nameError,
    email,
    emailError,
    body,
    bodyError,
    isLoading,

    handleChangeName,
    handleChangeEmail,
    handleChangeBody,
    reset,
    showErrors,
    handleSubmit,
  };
};
