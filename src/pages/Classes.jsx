import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import { classesData } from '../data/classesData';
import { filterData } from '../utils/helpers';
import { Users, User } from 'lucide-react';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredClasses = filterData(classesData, searchTerm, ['nom', 'niveau', 'serie']);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Classes</h1>
        <p className="page-subtitle">Liste de toutes les classes</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher une classe..."
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {filteredClasses.map((classe) => (
          <Card 
            key={classe.id}
            className="card-hover"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/classes/${classe.id}`)}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                {classe.nom}
              </h3>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {classe.niveau} - {classe.serie}
              </p>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                padding: '1rem 0',
                borderTop: '1px solid var(--gray-200)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                    <Users size={16} />
                    <span>Effectif</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-color)', marginTop: '0.25rem' }}>
                    {classe.effectif}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                    <User size={16} />
                    <span>Capacité</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                    {classe.capacite}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--border-radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginBottom: '0.25rem' }}>
                  Professeur principal
                </div>
                <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                  {classe.professeurPrincipal.nom} {classe.professeurPrincipal.prenom}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
                  {classe.professeurPrincipal.matiere}
                </div>
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                Salle: {classe.salle}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card>
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem' }}>
            Aucune classe trouvée
          </p>
        </Card>
      )}
    </div>
  );
};

export default Classes;