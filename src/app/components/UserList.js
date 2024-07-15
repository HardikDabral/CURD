import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, createUser } from '../store/slices/userSlice';
import styles from '../styles/UserList.module.scss';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [newUser, setNewUser] = useState({ name: '', email: '', address: { city: '' } });

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(createUser(newUser));
    setNewUser({ name: '', email: '', address: { city: '' } });
  };

  if (userStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className={styles.header}><h1>Users List</h1></div>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.user}>
            <div className={styles.userCard}>
              <h3>{user.name}</h3>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Address:</b> {user.address.city}</p>
            </div>
            <button className={styles.deleteButton} onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <form className={styles.createUserForm} onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={newUser.address.city}
          onChange={(e) => setNewUser({ ...newUser, address: { city: e.target.value } })}
        />
        <button type="submit">Create User Info</button> 
      </form>

    </div>
  );
};

export default UserList;
