# Wotura — Location de voiture entre particuliers

Prototype web Next.js. Les annonces sont stockées en mémoire (elles disparaissent au
rechargement de la page) — à remplacer par une vraie base de données quand tu voudras
passer en production.

## Démarrer en local

1. Installer [Node.js](https://nodejs.org) (version 18 ou plus récente)
2. Ouvrir un terminal dans ce dossier et lancer :

```bash
npm install
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans ton navigateur

## Structure du projet

```
src/
  app/
    layout.js              -> structure commune à toutes les pages (nav, providers)
    page.js                -> page d'accueil (recherche + liste d'annonces)
    annonce/[id]/page.js   -> page détail d'une annonce
    publier/page.js        -> formulaire de publication
    mes-annonces/page.js   -> espace propriétaire
    profil/page.js         -> page profil
  components/
    TopNav.jsx              -> barre de navigation (desktop) / menu (mobile)
    TabBar.jsx               -> barre d'onglets en bas (mobile uniquement)
    ListingCard.jsx          -> carte d'annonce réutilisable
    ListingsProvider.jsx     -> stockage des annonces en mémoire (à remplacer par une API)
    ToastProvider.jsx        -> notifications type "toast"
    styles.js                -> tous les styles de l'application
  data/
    listings.js               -> données de démonstration
```

## Déployer en ligne (gratuit)

Le plus simple est [Vercel](https://vercel.com) (créé par l'équipe de Next.js) :

1. Créer un compte sur vercel.com
2. Pousser ce projet sur un dépôt GitHub
3. Sur Vercel : "New Project" -> importer le dépôt -> Deploy
4. Le site est en ligne en 1-2 minutes, avec un lien du type `wotura.vercel.app`

## Prochaines étapes possibles

- **Base de données** : remplacer `ListingsProvider` par des appels à une vraie API
  (ex. Supabase, qui offre une base de données gratuite avec authentification incluse)
- **Authentification** : permettre aux propriétaires de se connecter avant de publier
- **Upload de vraies photos** : actuellement les annonces utilisent un simple emoji
- **Messagerie interne**, **avis/notation**, **vérification d'identité**
