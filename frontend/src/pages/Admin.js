// frontend/src/pages/Admin.js
import React, { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser } from '../api/api';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser.name && newUser.role) {
      await addUser(newUser);
      setUsers([...users, newUser]);
      setNewUser({ name: '', role: '' });
    }
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="admin container">
      <h2 className="section-title">Gestion des Utilisateurs</h2>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button className="button delete" onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-group">
        <h3>Ajouter un Utilisateur</h3>
        <input
          type="text"
          placeholder="Nom"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rôle"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button className="button" onClick={handleAddUser}>Ajouter</button>
      </div>
    </div>
  );
};

export default Admin;
