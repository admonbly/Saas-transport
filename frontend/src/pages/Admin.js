import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../api/api'; // Import correct


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newUser.name && newUser.role) {
      try {
        const addedUser = await addUser(newUser); // Utilisation de la réponse
        setUsers([...users, addedUser.data]);
        setNewUser({ name: '', role: '' });
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleUpdateUserRole = async (userId, role) => {
    try {
      await updateUser(userId, { role }); // Suppression de `response` si non utilisée
      setUsers(users.map((user) => (user.id === userId ? { ...user, role } : user)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
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
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Driver">Driver</option>
                    <option value="User">User</option>
                  </select>
                </td>
                <td>
                  <button className="button delete" onClick={() => handleDeleteUser(user.id)}>
                    Supprimer
                  </button>
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
        <button className="button" onClick={handleAddUser}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default Admin;
