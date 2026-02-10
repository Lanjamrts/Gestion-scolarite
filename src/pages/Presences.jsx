import { useState } from 'react';
import Card from '../components/common/Card';
import { elevesData } from '../data/elevesData';
import { presencesData } from '../data/presencesData';
import { formatDate } from '../utils/helpers';

const Presences = () => {
  const [selectedDate] = useState(new Date().toISOString().split('T')[0]);

  const presencesJour = presencesData.filter(p => p.date === selectedDate);
  const totalPresents = presencesJour.filter(p => p.statut === 'present').length;
  const totalAbsents = presencesJour.filter(p => p.statut === 'absent').length;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Présences</h1>
        <p className="page-subtitle">Suivi des présences des élèves</p>
      </div>

      <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '2rem' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Date sélectionnée
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-color)' }}>
              {formatDate(selectedDate)}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Présents
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-color)' }}>
              {totalPresents}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Absents
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--danger-color)' }}>
              {totalAbsents}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Liste des présences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {elevesData.map((eleve) => {
            const presence = presencesJour.find(p => p.eleveId === eleve.id);
            const statut = presence ? presence.statut : 'non_renseigne';

            return (
              <div
                key={eleve.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: 'var(--white)'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {eleve.nom} {eleve.prenom}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    {eleve.classe.nom} - {eleve.matricule}
                  </div>
                </div>

                <div>
                  {statut === 'present' && (
                    <span className="badge badge-success">Présent</span>
                  )}
                  {statut === 'absent' && (
                    <span className="badge badge-danger">Absent</span>
                  )}
                  {statut === 'non_renseigne' && (
                    <span className="badge badge-secondary">Non renseigné</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Presences;