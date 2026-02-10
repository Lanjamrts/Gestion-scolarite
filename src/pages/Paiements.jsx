import { useState } from 'react';
import Card from '../components/common/Card';
import SearchBar from '../components/common/SearchBar';
import { elevesData } from '../data/elevesData';
import { paiementsData } from '../data/paiementsData';
import { filterData, formatCurrency, getPaymentStatus } from '../utils/helpers';

const Paiements = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const elevesAvecPaiements = elevesData.map(eleve => {
    const paiement = paiementsData.find(p => p.eleveId === eleve.id);
    const status = paiement ? getPaymentStatus(paiement.montantPaye, paiement.montantTotal) : { label: 'Non défini', color: 'secondary' };

    return {
      ...eleve,
      paiement,
      status
    };
  });

  const filteredEleves = filterData(elevesAvecPaiements, searchTerm, ['nom', 'prenom', 'classe.nom']);

  const totalEncaisse = paiementsData.reduce((sum, p) => sum + p.montantPaye, 0);
  const totalAttendu = paiementsData.reduce((sum, p) => sum + p.montantTotal, 0);
  const totalEnRetard = paiementsData.filter(p => p.soldeRestant > 0).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Paiements</h1>
        <p className="page-subtitle">Suivi des paiements de scolarité</p>
      </div>

      <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '2rem' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Total encaissé
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-color)' }}>
              {formatCurrency(totalEncaisse)}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Total attendu
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
              {formatCurrency(totalAttendu)}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Paiements en retard
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning-color)' }}>
              {totalEnRetard}
            </div>
          </div>
        </Card>
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
                padding: '1.25rem',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'var(--white)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {eleve.nom} {eleve.prenom}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                    {eleve.classe.nom}
                  </div>
                </div>

                <span className={`badge badge-${eleve.status.color}`}>
                  {eleve.status.label}
                </span>
              </div>

              {eleve.paiement && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      Montant total
                    </span>
                    <span style={{ fontWeight: '600' }}>
                      {formatCurrency(eleve.paiement.montantTotal)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      Montant payé
                    </span>
                    <span style={{ fontWeight: '600', color: 'var(--success-color)' }}>
                      {formatCurrency(eleve.paiement.montantPaye)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      Solde restant
                    </span>
                    <span style={{ 
                      fontWeight: '600', 
                      color: eleve.paiement.soldeRestant > 0 ? 'var(--danger-color)' : 'var(--success-color)'
                    }}>
                      {formatCurrency(eleve.paiement.soldeRestant)}
                    </span>
                  </div>

                  {/* Barre de progression */}
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: 'var(--gray-200)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(eleve.paiement.montantPaye / eleve.paiement.montantTotal) * 100}%`,
                      backgroundColor: eleve.paiement.soldeRestant === 0 ? 'var(--success-color)' : 'var(--warning-color)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  {eleve.paiement.versements.length > 0 && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>
                        Historique des versements ({eleve.paiement.versements.length})
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {eleve.paiement.versements.slice(0, 3).map((versement) => (
                          <div 
                            key={versement.id}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.875rem',
                              padding: '0.5rem',
                              backgroundColor: 'var(--gray-50)',
                              borderRadius: 'var(--border-radius-sm)'
                            }}
                          >
                            <span style={{ color: 'var(--gray-600)' }}>
                              {new Date(versement.date).toLocaleDateString('fr-FR')} - {versement.mode}
                            </span>
                            <span style={{ fontWeight: '600' }}>
                              {formatCurrency(versement.montant)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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

export default Paiements;