import Card from '../common/Card';
import './StatCard.css';

const StatCard = ({ icon: Icon, title, value, color = 'primary', subtitle }) => {
  return (
    <Card className={`stat-card stat-card-${color}`}>
      <div className="stat-card-content">
        <div className={`stat-icon stat-icon-${color}`}>
          {Icon && <Icon size={24} />}
        </div>
        <div className="stat-info">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-value">{value}</p>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;