import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from './Main';

export default function Update() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [dataToUpdate, setDataToUpdate] = useState({
    name: '',
    email: ''
  });

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


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${selectedUserId}`);
        setDataToUpdate(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (selectedUserId) {
      fetchUserData();
    }
  }, [selectedUserId]);

  const handleUserSelect = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${selectedUserId}`, dataToUpdate);
      alert('Update successful', response.data);
    } catch (error) {
      alert('Error updating data');
      console.error('Error updating data', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataToUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
     
      <h2>Update Data</h2>
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
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={dataToUpdate.name}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <label>
            Email:
            <input
              type="text"
              name="email"
              value={dataToUpdate.email}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      )}
    </div>
  );
}
