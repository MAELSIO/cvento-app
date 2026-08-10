# Extension CVento

Remplissage automatique générique des formulaires de candidature (nom, prénom, email, téléphone, ville) à partir de votre profil CVento. Manifest V3, compatible Chrome/Edge/Brave.

**Non publiée sur le Chrome Web Store** — ça demande un compte développeur Google (35 $, un compte externe que je ne peux pas créer à votre place). En attendant, installation manuelle ci-dessous ; la publication est possible plus tard sans changer le code.

## Installation (mode développeur)

1. Ouvrez `chrome://extensions` (ou `edge://extensions`).
2. Activez le "Mode développeur" (coin supérieur droit).
3. Cliquez "Charger l'extension non empaquetée" et sélectionnez le dossier `extension/`.
4. L'icône CVento apparaît dans la barre d'outils.

## Utilisation

1. Dans CVento, allez sur `/dashboard/parametres` → section "Extension navigateur" → "Créer un jeton" → copiez-le (affiché une seule fois).
2. Cliquez sur l'icône CVento dans le navigateur, collez le jeton, "Se connecter".
3. Sur un formulaire de candidature, cliquez l'icône puis "Remplir ce formulaire".

## Comment fonctionne le remplissage

`popup.js` (fonction `cventoFillForm`) scanne les champs `<input>`/`<textarea>` visibles et vides de la page, et les associe par mots-clés (nom, id, placeholder, `aria-label`, `<label>` associé) : prénom, nom, email, téléphone, ville. C'est volontairement **générique** plutôt que spécifique à un site — voir la limite ci-dessous.

**Volontairement prudent** : ne remplit jamais un champ déjà rempli, ne coche jamais de case automatiquement, et laisse tout champ ambigu vide plutôt que de risquer une erreur. Toujours relire le formulaire avant de soumettre une candidature.

## Sécurité

- Le jeton est stocké uniquement dans `chrome.storage.local` (local à votre navigateur, jamais transmis ailleurs qu'à `/api/extension/profile`).
- La route API ne renvoie que les champs strictement nécessaires au remplissage (pas le contenu complet du CV).
- Un jeton peut être révoqué à tout moment depuis `/dashboard/parametres`.

## Limites connues (v1)

- Correspondance par mots-clés génériques, pas de sélecteurs dédiés aux principaux sites de recrutement français (Indeed, LinkedIn, Welcome to the Jungle...) — un fast-follow naturel serait d'ajouter des règles spécifiques par domaine dans `cventoFillForm`.
- Ne remplit que texte/email/téléphone/ville — pas d'upload automatique du CV en pièce jointe (techniquement bloqué par les navigateurs pour des raisons de sécurité, aucune extension ne peut le faire).
- Icônes (`icons/`) sont des placeholders unis à la couleur de marque — à remplacer par un vrai logo avant publication.
