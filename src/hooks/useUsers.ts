import { useLayoutEffect, useState } from 'react';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  useLayoutEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return {
    users,
    selectedUser,
    isUserMenuOpen,

    setSelectedUser,
    setUserMenuOpen,
  };
};
