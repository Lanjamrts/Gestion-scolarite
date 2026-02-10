import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import { classesData } from '../data/classesData';
import { elevesData } from '../data/elevesData';

const ClasseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classe = classesData.find(c => c.id === parseInt(id));

  if (!classe) {
    return (
      <div className="page">
        <p>Classe non trouvée</p>
      </div>
    );
  }

  const elevesClasse = elevesData.filter(e => e.classe.id === classe.id);

  const columns = [
    { header: 'Matricule', accessor: 'matricule' },
    { header: 'Nom', accessor: 'nom' },
    { header: 'Prénom', accessor: 'prenom' },
    { 
      header: 'Genre', 
      render: (row) => row.genre === 'M' ? 'Masculin' : 'Féminin'
    },
    { header: 'Téléphone', accessor: 'telephone' }
  ];

  const handleRowClick = (eleve) => {
    navigate(`/eleves/${eleve.id}`);
  };

  return (
    <div className="page">
      <Button
        variant="ghost"
        icon={<ArrowLeft size={20} />}
        onClick={() => navigate('/classes')}
        style={{ marginBottom: '1rem' }}
      >
        Retour
      </Button>

      <div className="page-header">
        <h1 className="page-title">{classe.nom}</h1>
        <p className="page-subtitle">{classe.niveau} - {classe.serie}</p>
      </div>

      <div className="grid grid-cols-4 gap-3" style={{ marginBottom: '2rem' }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Effectif
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
              {classe.effectif}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Capacité
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--gray-600)' }}>
              {classe.capacite}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Salle
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)' }}>
              {classe.salle}
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginBottom: '0.5rem' }}>
              Année scolaire
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--gray-900)' }}>
              {classe.anneeScolaire}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Professeur principal" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            {classe.professeurPrincipal.nom.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>
              {classe.professeurPrincipal.nom} {classe.professeurPrincipal.prenom}
            </div>
            <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
              {classe.professeurPrincipal.matiere}
            </div>
          </div>
        </div>
      </Card>

      <Card title={`Liste des élèves (${elevesClasse.length})`}>
        <Table
          columns={columns}
          data={elevesClasse}
          onRowClick={handleRowClick}
        />
      </Card>
    </div>
  );
};

export default ClasseDetail;