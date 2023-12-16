import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Create() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
  });
  const [edit,saveedit]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://657064e209586eff664149a3.mockapi.io/api/v1/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("My Fault hehehe");
        setLoading(false);
      }
    };

    fetchData(); 

  }, []); 

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await axios.post('https://657064e209586eff664149a3.mockapi.io/api/v1/user', {
        name: formData.get('name'),
        email: formData.get('email'),
      });

      setUsers((prevUsers) => [...prevUsers, response.data]);
      setLoading(false);

    } catch (error) {
      console.error("Error creating user:", error);
      alert("My Fault hehehe");
      setLoading(false);
    }
  };

  const editUser = (userId) => {
    saveedit(true);
    setEditableUserId(userId);
    const selectedUser = users.find((user) => user.id === userId);
    setEditedUserData({
      name: selectedUser.name,
      email: selectedUser.email,
    });
  };

  const saveUser = async () => {
    saveedit(false);
    setLoading(true);

    try {
      await axios.put(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${editableUserId}`, {
        name: editedUserData.name,
        email: editedUserData.email,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editableUserId ? { ...user, name: editedUserData.name, email: editedUserData.email } : user
        )
      );

      setLoading(false);
      setEditableUserId(null);

    } catch (error) {
      console.error("Error saving user:", error);
      alert("My Fault hehehe");
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setLoading(true);

    try {
      await axios.delete(`https://657064e209586eff664149a3.mockapi.io/api/v1/user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setLoading(false);

    } catch (error) {
      console.error("Error deleting user:", error);
      alert("My Fault hehehe");
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to="/create" className='Create button'>
        Create
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (!edit && (
       <>
       <h2>User Table</h2>
       <table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th colSpan={3}>Actions</th>
         </tr>
       </thead>
       <tbody>
         {users.map((user) => (
           <tr key={user.id}>
             <td>
               {editableUserId === user.id ? (
                 <input type="text" value={editedUserData.name} onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })} />
               ) : (
                 user.name
               )}
             </td>
             <td>
               {editableUserId === user.id ? (
                 <input type="text" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} />
               ) : (
                 user.email
               )}
             </td>
             <td>
               {editableUserId === user.id ? (
                 <button className='Save button' onClick={saveUser}>Save</button>
               ) : (
                 <button className='Update button' onClick={() => editUser(user.id)}>Update</button>
               )}
             </td>
             <td>
               <button className='Delete button' onClick={() => deleteUser(user.id)}>Delete</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
       </>
      )
          )}
  {edit && (
  <>
    <h2>Edit User</h2>
    <form>
      <label>
        Name:
        <input
          type="text"
          value={editedUserData.name}
          onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={editedUserData.email}
          onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
        />
      </label>
      <br />
      <button className="Save button" onClick={saveUser}>
        Save
      </button>
    </form>
  </>
)}

    </div>
  );
}
