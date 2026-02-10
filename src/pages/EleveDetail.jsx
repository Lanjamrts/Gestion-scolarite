import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { elevesData } from '../data/elevesData';
import { notesData } from '../data/notesData';
import { presencesData } from '../data/presencesData';
import { paiementsData } from '../data/paiementsData';
import { formatDate, formatCurrency, calculateAverage, calculateAttendanceRate } from '../utils/helpers';

const EleveDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eleve = elevesData.find(e => e.id === parseInt(id));

  if (!eleve) {
    return (
      <div className="page">
        <p>Élève non trouvé</p>
      </div>
    );
  }

  const eleveNotes = notesData.filter(n => n.eleveId === eleve.id);
  const elevePresences = presencesData.filter(p => p.eleveId === eleve.id);
  const elevePaiement = paiementsData.find(p => p.eleveId === eleve.id);
  const moyenne = calculateAverage(eleveNotes);
  const tauxPresence = calculateAttendanceRate(elevePresences);

  return (
    <div className="page">
      <Button
        variant="ghost"
        icon={<ArrowLeft size={20} />}
        onClick={() => navigate('/eleves')}
        style={{ marginBottom: '1rem' }}
      >
        Retour
      </Button>

      <div className="page-header">
        <h1 className="page-title">{eleve.nom} {eleve.prenom}</h1>
        <p className="page-subtitle">Matricule: {eleve.matricule}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card title="Informations personnelles">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <Calendar size={16} />
                <span>Date de naissance</span>
              </div>
              <div style={{ fontWeight: '500' }}>{formatDate(eleve.dateNaissance)}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <MapPin size={16} />
                <span>Lieu de naissance</span>
              </div>
              <div style={{ fontWeight: '500' }}>{eleve.lieuNaissance}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <User size={16} />
                <span>Genre</span>
              </div>
              <div style={{ fontWeight: '500' }}>{eleve.genre === 'M' ? 'Masculin' : 'Féminin'}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <MapPin size={16} />
                <span>Adresse</span>
              </div>
              <div style={{ fontWeight: '500' }}>{eleve.adresse}</div>
            </div>
          </div>
        </Card>

        <Card title="Contact & Tuteur">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <Phone size={16} />
                <span>Téléphone élève</span>
              </div>
              <div style={{ fontWeight: '500' }}>{eleve.telephone}</div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                <Mail size={16} />
                <span>Email élève</span>
              </div>
              <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{eleve.email}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
            <div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Tuteur légal</div>
              <div style={{ fontWeight: '600' }}>{eleve.tuteur.nom} {eleve.tuteur.prenom}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{eleve.tuteur.profession}</div>
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                <Phone size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                {eleve.tuteur.telephone}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Scolarité">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Classe actuelle</div>
              <div style={{ fontWeight: '600', fontSize: '1.125rem', color: 'var(--primary-color)' }}>
                {eleve.classe.nom}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Moyenne générale</div>
              <div style={{ fontWeight: '600', fontSize: '1.5rem' }}>{moyenne}/20</div>
            </div>
            <div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Taux de présence</div>
              <div style={{ fontWeight: '600', fontSize: '1.125rem', color: 'var(--success-color)' }}>
                {tauxPresence}%
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>Statut paiement</div>
              {elevePaiement && (
                <div>
                  <div style={{ fontWeight: '500' }}>
                    {formatCurrency(elevePaiement.montantPaye)} / {formatCurrency(elevePaiement.montantTotal)}
                  </div>
                  {elevePaiement.soldeRestant > 0 && (
                    <span className="badge badge-warning" style={{ marginTop: '0.5rem' }}>
                      Reste: {formatCurrency(elevePaiement.soldeRestant)}
                    </span>
                  )}
                  {elevePaiement.soldeRestant === 0 && (
                    <span className="badge badge-success" style={{ marginTop: '0.5rem' }}>
                      Payé intégralement
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3" style={{ marginTop: '1.5rem' }}>
        <Card title="Dernières notes">
          {eleveNotes.slice(0, 5).map((note, index) => (
            <div key={index} style={{ 
              padding: '0.75rem', 
              borderBottom: index < 4 ? '1px solid var(--gray-200)' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '500' }}>{note.matiere}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{note.type}</div>
              </div>
              <div style={{ 
                fontWeight: '700', 
                fontSize: '1.125rem',
                color: note.note >= 10 ? 'var(--success-color)' : 'var(--danger-color)'
              }}>
                {note.note}/20
              </div>
            </div>
          ))}
        </Card>

        <Card title="Présences récentes">
          {elevePresences.slice(-5).reverse().map((presence, index) => (
            <div key={index} style={{ 
              padding: '0.75rem', 
              borderBottom: index < 4 ? '1px solid var(--gray-200)' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '0.875rem' }}>{formatDate(presence.date)}</div>
              <span className={`badge badge-${presence.statut === 'present' ? 'success' : 'danger'}`}>
                {presence.statut === 'present' ? 'Présent' : 'Absent'}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default EleveDetail;