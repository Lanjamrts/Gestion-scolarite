import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import Table from '../components/common/Table';
import { elevesData } from '../data/elevesData';
import { filterData } from '../utils/helpers';

const Eleves = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredEleves = filterData(elevesData, searchTerm, ['nom', 'prenom', 'matricule', 'classe.nom']);

  const columns = [
    { header: 'Matricule', accessor: 'matricule' },
    { header: 'Nom', accessor: 'nom' },
    { header: 'Prénom', accessor: 'prenom' },
    { 
      header: 'Classe', 
      render: (row) => row.classe.nom 
    },
    { 
      header: 'Genre', 
      render: (row) => row.genre === 'M' ? 'Masculin' : 'Féminin'
    },
    { 
      header: 'Statut',
      render: (row) => (
        <span className={`badge badge-${row.statut === 'actif' ? 'success' : 'secondary'}`}>
          {row.statut}
        </span>
      )
    }
  ];

  const handleRowClick = (eleve) => {
    navigate(`/eleves/${eleve.id}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Élèves</h1>
        <p className="page-subtitle">Liste de tous les élèves inscrits</p>
      </div>

      <Card>
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher un élève..."
          />
          <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
            {filteredEleves.length} élève(s)
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredEleves}
          onRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
};

export default Eleves;