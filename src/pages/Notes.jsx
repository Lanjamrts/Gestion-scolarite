import { useState } from 'react';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import { elevesData } from '../data/elevesData';
import { notesData } from '../data/notesData';
import { filterData, calculateAverage, getAcademicStatus } from '../utils/helpers';

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const elevesAvecNotes = elevesData.map(eleve => {
    const notes = notesData.filter(n => n.eleveId === eleve.id);
    const moyenne = calculateAverage(notes);
    const status = getAcademicStatus(parseFloat(moyenne));

    return {
      ...eleve,
      moyenne,
      status,
      nombreNotes: notes.length
    };
  });

  const filteredEleves = filterData(elevesAvecNotes, searchTerm, ['nom', 'prenom', 'classe.nom']);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Notes</h1>
        <p className="page-subtitle">Consulter les notes et moyennes des élèves</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un élève..."
        />
      </div>

      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredEleves.map((eleve) => (
            <div
              key={eleve.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'var(--white)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.25rem' }}>
                  {eleve.nom} {eleve.prenom}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  {eleve.classe.nom} - {eleve.nombreNotes} note(s)
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginBottom: '0.25rem' }}>
                    Moyenne
                  </div>
                  <div style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '700',
                    color: parseFloat(eleve.moyenne) >= 10 ? 'var(--success-color)' : 'var(--danger-color)'
                  }}>
                    {eleve.moyenne}/20
                  </div>
                </div>

                <div>
                  <span className={`badge badge-${eleve.status.color}`}>
                    {eleve.status.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEleves.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '2rem' }}>
            Aucun élève trouvé
          </p>
        )}
      </Card>
    </div>
  );
};

export default Notes;