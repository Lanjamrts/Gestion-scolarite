# 🎓 Système de Gestion de Scolarité - Frontend React

Application web moderne de gestion de scolarité développée avec React et Vite.

## 📋 Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Guide de démarrage](#guide-de-démarrage)
- [Données simulées](#données-simulées)
- [Évolutions futures](#évolutions-futures)

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** (généralement installé avec Node.js)

### Vérifier les installations

```bash
node --version
npm --version
```

## 📦 Installation

### 1. Installation sur Kali Linux (ou autre distribution Linux)

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js et npm
sudo apt install nodejs npm -y

# Vérifier l'installation
node --version
npm --version
```

### 2. Créer et configurer le projet

```bash
# Créer le projet avec Vite
npm create vite@latest gestion-scolarite -- --template react

# Aller dans le dossier
cd gestion-scolarite

# Installer les dépendances de base
npm install

# Installer les packages supplémentaires
npm install react-router-dom lucide-react

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à : **http://localhost:5173**

## 📁 Structure du projet

```
gestion-scolarite/
├── public/                      # Fichiers publics statiques
├── src/
│   ├── assets/                  # Images, logos
│   ├── components/              # Composants React
│   │   ├── layout/              # Composants de mise en page
│   │   │   ├── Navbar.jsx       # Barre de navigation
│   │   │   ├── Sidebar.jsx      # Menu latéral
│   │   │   └── Layout.jsx       # Layout principal
│   │   ├── common/              # Composants réutilisables
│   │   │   ├── Card.jsx         # Composant carte
│   │   │   ├── Button.jsx       # Composant bouton
│   │   │   ├── Input.jsx        # Composant input
│   │   │   ├── Table.jsx        # Composant tableau
│   │   │   └── SearchBar.jsx    # Barre de recherche
│   │   └── dashboard/           # Composants du tableau de bord
│   │       └── StatCard.jsx     # Carte de statistiques
│   ├── pages/                   # Pages de l'application
│   │   ├── Login.jsx            # Page de connexion
│   │   ├── Dashboard.jsx        # Tableau de bord
│   │   ├── Eleves.jsx           # Liste des élèves
│   │   ├── EleveDetail.jsx      # Détail d'un élève
│   │   ├── Classes.jsx          # Liste des classes
│   │   ├── ClasseDetail.jsx     # Détail d'une classe
│   │   ├── Presences.jsx        # Gestion des présences
│   │   ├── Notes.jsx            # Gestion des notes
│   │   └── Paiements.jsx        # Gestion des paiements
│   ├── data/                    # Données simulées (JSON)
│   │   ├── elevesData.js        # Données des élèves
│   │   ├── classesData.js       # Données des classes
│   │   ├── presencesData.js     # Données des présences
│   │   ├── notesData.js         # Données des notes
│   │   └── paiementsData.js     # Données des paiements
│   ├── context/                 # Contextes React
│   │   └── AuthContext.jsx      # Contexte d'authentification
│   ├── utils/                   # Fonctions utilitaires
│   │   └── helpers.js           # Fonctions helper
│   ├── styles/                  # Styles CSS
│   │   └── index.css            # Styles globaux
│   ├── App.jsx                  # Composant principal
│   ├── App.css                  # Styles de l'App
│   └── main.jsx                 # Point d'entrée React
├── index.html                   # Point d'entrée HTML
├── package.json                 # Dépendances du projet
├── vite.config.js               # Configuration Vite
└── README.md                    # Documentation

```

## ✨ Fonctionnalités

### 1. Authentification (Simulée)
- ✅ Page de connexion
- ✅ Validation des champs
- ✅ Redirection automatique

### 2. Tableau de bord
- ✅ Statistiques générales
- ✅ Nombre total d'élèves
- ✅ Nombre de classes
- ✅ Présences du jour
- ✅ Paiements en retard

### 3. Gestion des élèves
- ✅ Liste complète des élèves
- ✅ Recherche par nom
- ✅ Filtrage par classe
- ✅ Profil détaillé de chaque élève
- ✅ Informations personnelles
- ✅ Informations de contact du tuteur

### 4. Gestion des classes
- ✅ Liste des classes
- ✅ Nombre d'élèves par classe
- ✅ Détails de chaque classe
- ✅ Liste des élèves associés

### 5. Gestion des présences
- ✅ Sélection de la date
- ✅ Liste des élèves
- ✅ Marquage présent/absent
- ✅ Justification des absences
- ✅ Résumé journalier

### 6. Gestion des notes
- ✅ Notes par matière
- ✅ Calcul automatique de moyenne
- ✅ Coefficient par matière
- ✅ Appréciation du professeur
- ✅ Indication de performance

### 7. Gestion des paiements
- ✅ Montant total de scolarité
- ✅ Montant payé
- ✅ Solde restant
- ✅ Statut du paiement
- ✅ Historique des versements
- ✅ Barre de progression

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour interfaces
- **React Router DOM** - Gestion du routing
- **Vite** - Build tool moderne et rapide
- **Lucide React** - Bibliothèque d'icônes
- **CSS3** - Styles personnalisés

## 🚀 Guide de démarrage

### Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview

# Linter le code
npm run lint
```

### Accès à l'application

1. **URL de développement** : http://localhost:5173
2. **Connexion** : 
   - Email : admin@ecole.sn (ou n'importe quel email)
   - Mot de passe : password (ou n'importe quel mot de passe)

## 📊 Données simulées

L'application utilise des données fictives stockées dans le dossier `src/data/` :

- **10 élèves** répartis dans 3 classes différentes
- **6 classes** (Terminale S1, Première S2, Seconde A, etc.)
- **Notes** pour chaque élève dans plusieurs matières
- **Présences** sur 10 jours
- **Paiements** avec historique des versements

### Modification des données

Pour modifier les données, éditez les fichiers dans `src/data/` :

```javascript
// Exemple : Ajouter un nouvel élève
export const elevesData = [
  {
    id: 11,
    matricule: 'EL2024011',
    nom: 'Nouveau',
    prenom: 'Élève',
    // ... autres champs
  }
];
```

## 🔄 Évolutions futures

- [ ] Backend Node.js + Express
- [ ] Base de données MongoDB
- [ ] Authentification JWT sécurisée
- [ ] Gestion des rôles (Admin, Professeur, Secrétariat)
- [ ] Génération de bulletins PDF
- [ ] Export de données (Excel, PDF)
- [ ] Système de notification
- [ ] Paiement en ligne
- [ ] Application mobile

## 📝 Notes importantes

1. **Données simulées** : Toutes les données sont fictives et stockées en mémoire
2. **Pas de persistance** : Les modifications ne sont pas sauvegardées
3. **Responsive** : L'application s'adapte aux mobiles et tablettes
4. **Évolutif** : Architecture prête pour intégration backend

## 🆘 Dépannage

### Erreur : "Cannot find module"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 déjà utilisé
```bash
# Modifier le port dans vite.config.js
export default defineConfig({
  server: {
    port: 3000
  }
})
```

### Problèmes de permissions
```bash
# Ajouter sudo si nécessaire
sudo npm install
```

## 👨‍💻 Développement

Pour contribuer au projet :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est développé à des fins éducatives.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à créer une issue.

---

**Développé avec ❤️ pour faciliter la gestion scolaire**