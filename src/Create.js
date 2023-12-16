import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';

export default function Create() {
  const [users, setUsers] = useState([]);
  const [condition, setCondition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit,saveedit]=useState(false);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  async function createUser(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await axios.post('https://657064e209586eff664149a3.mockapi.io/api/v1/user', {
        name: formData.get('name'),
        email: formData.get('email'),
      });

      navigate('/');
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setCondition(true);
      setLoading(false);
    } catch (error) {
      alert("My Fault hehehe");
      setLoading(false);
    }
  }

  const updateUserForm = (userId) => {
    saveedit(true);
    setEditableUserId(userId);
    const selectedUser = users.find((user) => user.id === userId);
    setEditedUserData({
      name: selectedUser.name,
      email: selectedUser.email,
    });
    
  };

  const saveUser = async () => {
    setLoading(true);

    try {
      await axios.put(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${editableUserId}`, {
        name: editedUserData.name,
        email: editedUserData.email,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editableUserId
            ? { ...user, name: editedUserData.name, email: editedUserData.email }
            : user
        )
      );

      setCondition(true);
      setLoading(false);
      setEditableUserId(null);
    } catch (error) {
      alert("My Fault hehehe");
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);

    try {
      await axios.delete(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${userId}`);
      setCondition(true);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setLoading(false);
    } catch (error) {
      alert("My Fault hehehe");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://657064e209586eff664149a3.mockapi.io/api/v1/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        alert("My Fault hehehe");
        setLoading(false);
      }
    };

    if (condition) {
      fetchData();
    }
  }, [condition]);

  return (
    <>
     
        <h2>Create Table</h2>
        <form onSubmit={createUser}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <button type="submit" className="button">
            Create User
          </button>
        </form>

      {loading && (
        <>
          <h1>Loading, Please Wait While User is created!</h1>
          <div className="loadingio-spinner-spinner-qqnev166oao">
            <div className="ldio-42ac0we8nps">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      )}

      {condition &&(
        <>
          <h2>User Table</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  {editableUserId === user.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editedUserData.name}
                          onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editedUserData.email}
                          onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                        />
                      </td>
                      <td>
                        <button className="button" onClick={saveUser}>
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="button" onClick={() => updateUserForm(user.id)}>
                          Update
                        </button>
                        <button className="Delete button" onClick={() => deleteUser(user.id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

         
        </>
      )}
       {edit && (
        <>
  <p>Reaching here babes</p>
       </>
        )}
    </>
  );
}
