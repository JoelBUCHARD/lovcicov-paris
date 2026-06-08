# Système de commentaires éditables par toi

Tu pourras écrire et publier des commentaires (témoignages, notes éditoriales) directement depuis le site, visibles par tous les visiteurs. Seul toi (en tant qu'admin) peux en ajouter, modifier ou supprimer.

## Ce qui sera créé

### 1. Base de données
- Table `testimonials` : auteur, texte, date
- Table `user_roles` + enum `app_role` (sécurité standard, jamais sur `profiles`)
- Fonction `has_role()` security definer
- RLS :
  - Lecture publique (tout le monde voit les commentaires)
  - Écriture/édition/suppression réservées au rôle `admin`

### 2. Page d'administration `/admin/temoignages`
- Accessible uniquement si tu es connectée + rôle `admin`
- Formulaire pour ajouter un commentaire (auteur + texte)
- Liste des commentaires existants avec bouton supprimer
- Redirection vers `/auth` si non connectée, ou message "Accès refusé" si pas admin

### 3. Affichage public
- Nouvelle section "Témoignages" en bas de la homepage
- Design minimaliste cohérent (Instrument Sans, centré, style Anine Bing)
- Carrousel ou grille selon le nombre

### 4. Attribution du rôle admin
Après la migration, je t'expliquerai comment ajouter ton compte au rôle `admin` (une seule commande SQL avec ton user_id, à faire une seule fois).

## Notes techniques
- Validation des inputs avec zod (longueur max auteur 100 / texte 500)
- Pas d'inscription anonyme, pas d'auto-confirmation email
- Toast feedback sur succès/erreur

Confirme et je lance la migration.