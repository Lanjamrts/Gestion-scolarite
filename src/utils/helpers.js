// Formater une date
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Formater un montant en devise
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0 FCFA';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(amount).replace('XOF', 'FCFA');
};

// Calculer la moyenne
export const calculateAverage = (notes) => {
  if (!notes || notes.length === 0) return 0;
  const sum = notes.reduce((acc, note) => acc + note.note, 0);
  return (sum / notes.length).toFixed(2);
};

// Obtenir le statut de paiement
export const getPaymentStatus = (paid, total) => {
  const percentage = (paid / total) * 100;
  if (percentage === 0) return { label: 'Non payé', color: 'danger' };
  if (percentage < 100) return { label: 'Partiel', color: 'warning' };
  return { label: 'Payé', color: 'success' };
};

// Obtenir le statut académique
export const getAcademicStatus = (average) => {
  if (average >= 16) return { label: 'Excellent', color: 'success' };
  if (average >= 14) return { label: 'Très bien', color: 'info' };
  if (average >= 12) return { label: 'Bien', color: 'primary' };
  if (average >= 10) return { label: 'Passable', color: 'warning' };
  return { label: 'Insuffisant', color: 'danger' };
};

// Filtrer les données
export const filterData = (data, searchTerm, fields) => {
  if (!searchTerm) return data;
  
  return data.filter(item => {
    return fields.some(field => {
      const value = getNestedValue(item, field);
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
};

// Obtenir une valeur imbriquée d'un objet
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
};

// Générer un ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Trier les données
export const sortData = (data, field, order = 'asc') => {
  return [...data].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Obtenir le mois actuel
export const getCurrentMonth = () => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[new Date().getMonth()];
};

// Obtenir l'année scolaire
export const getSchoolYear = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // L'année scolaire commence en septembre (mois 8)
  if (currentMonth >= 8) {
    return `${currentYear}-${currentYear + 1}`;
  }
  return `${currentYear - 1}-${currentYear}`;
};

// Calculer le pourcentage de présence
export const calculateAttendanceRate = (presences) => {
  if (!presences || presences.length === 0) return 0;
  const present = presences.filter(p => p.statut === 'present').length;
  return ((present / presences.length) * 100).toFixed(1);
};

// Valider un email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valider un numéro de téléphone
export const isValidPhone = (phone) => {
  const regex = /^[0-9]{8,15}$/;
  return regex.test(phone.replace(/\s/g, ''));
};