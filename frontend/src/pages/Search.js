// frontend/src/pages/Search.js
import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Logique de recherche à ajouter ici
    console.log("Recherche pour :", searchTerm);
  };

  return (
    <div className="search container">
      <h1>Recherche de Trajets</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Entrez un terme de recherche"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="button">Rechercher</button>
      </form>
    </div>
  );
};

export default Search;
