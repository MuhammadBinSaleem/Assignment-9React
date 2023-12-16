import React, { useState } from 'react';
import axios from 'axios';
import Main from './Main';

export default function Fetch() {
  const [data, setData] = useState([]);
  const [condition, setcondition] = useState(false);
  const [loading, setLoading] = useState(false);

  
  async function fetchData() {
    setLoading(true);
    setcondition(true);
    try {
      const response = await axios.get('https://657064e209586eff664149a3.mockapi.io/api/v1/user');
      setData(response.data);
      alert("Yeah Data Fetched");
    } catch (error) {
      alert("My Fault hehehe");
    } finally {
    
 
     
    }
  }
  fetchData();

  return (
    <>
    <Main/>
    <h2>Read Data</h2>

      { condition && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
