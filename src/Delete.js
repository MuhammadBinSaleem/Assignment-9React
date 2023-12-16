import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main';

export default function DeleteUser() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://657064e209586eff664149a3.mockapi.io/api/v1/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${selectedUserId}`);
      alert('User deleted successfully');
      // Optionally, you can reset the selectedUserId or refetch the users to update the list
      setSelectedUserId('');
      // You might want to refetch the users to update the list after deletion
      const response = await axios.get('https://657064e209586eff664149a3.mockapi.io/api/v1/user');
      setUsers(response.data);
    } catch (error) {
      alert('Error deleting user');
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
    
      <h2>Delete User</h2>
      <label>
        Select User:
        <select value={selectedUserId} onChange={handleUserSelect}>
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      {selectedUserId && (
        <div>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
