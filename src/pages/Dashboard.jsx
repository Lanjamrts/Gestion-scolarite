import { Users, School, CheckCircle, DollarSign } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { elevesData } from '../data/elevesData';
import { classesData } from '../data/classesData';
import { paiementsData } from '../data/paiementsData';

const Dashboard = () => {
  const totalEleves = elevesData.length;
  const totalClasses = classesData.length;
  const elevesPresents = Math.floor(totalEleves * 0.85);
  const paiementsEnRetard = paiementsData.filter(p => p.soldeRestant > 0).length;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Tableau de bord</h1>
        <p className="page-subtitle">Vue d'ensemble de l'établissement</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <StatCard
          icon={Users}
          title="Total Élèves"
          value={totalEleves}
          color="primary"
          subtitle="Élèves inscrits"
        />
        <StatCard
          icon={School}
          title="Classes"
          value={totalClasses}
          color="info"
          subtitle="Classes actives"
        />
        <StatCard
          icon={CheckCircle}
          title="Présents aujourd'hui"
          value={elevesPresents}
          color="success"
          subtitle={`${((elevesPresents/totalEleves)*100).toFixed(0)}% de présence`}
        />
        <StatCard
          icon={DollarSign}
          title="Paiements en retard"
          value={paiementsEnRetard}
          color="warning"
          subtitle="Élèves concernés"
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{
          backgroundColor: 'var(--white)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gray-700)' }}>
            Bienvenue sur le système de gestion de scolarité
          </h2>
          <p style={{ color: 'var(--gray-600)' }}>
            Utilisez le menu latéral pour naviguer entre les différentes sections
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;