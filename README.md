# Soumission GMV Services

Formulaire de soumission mobile-first (résidentiel + commercial), branché sur le CRM via webhook.

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev
```

## Variables d'environnement (voir `.env.example`)

- `CRM_WEBHOOK_URL` — URL du webhook GHL (ou autre CRM) qui reçoit le JSON du lead.
- `RESEND_API_KEY`, `ALERT_EMAIL_FROM`, `ALERT_EMAIL_TO` — alerte courriel si le webhook échoue après 3 tentatives (via [Resend](https://resend.com)). Sans ces 3 variables, l'échec est seulement loggé côté serveur.
- `NEXT_PUBLIC_META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN` — suivi publicitaire Meta (Pixel côté client + Conversions API côté serveur, même `event_id` pour dédoublonner).

## Déploiement sur Vercel

1. Importer le repo GitHub dans Vercel.
2. Ajouter les variables d'environnement ci-dessus dans Project Settings → Environment Variables.
3. Déployer — aucune autre configuration requise.

## Où modifier les prix / le pointage

Un seul fichier : [`lib/config.ts`](lib/config.ts). Les prix, les points commerciaux et les seuils CHAUD/TIÈDE/FROID y sont regroupés — rien n'est codé en dur ailleurs dans la logique.

## Points encore à confirmer avec Véronique (voir le brief)

- Prix résidentiel plus taxes ou taxes incluses
- Définition exacte de « Hors standard »
- Villes desservies
- CRM définitif qui reçoit `CRM_WEBHOOK_URL`
- Contrat commercial minimum accepté
- Heures de rappel pour les leads CHAUDS (soir/fin de semaine ?)
