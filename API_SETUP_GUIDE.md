# Guide de Configuration des Clés API - Paw Paths

Ce guide vous explique comment obtenir et configurer toutes les clés API nécessaires pour faire fonctionner l'application Paw Paths en production.

## 📋 Vue d'ensemble

L'application Paw Paths utilise plusieurs services externes pour offrir une expérience complète :
- **Supabase** : Base de données et authentification
- **Stripe** : Paiements sécurisés
- **Google Maps** : Géolocalisation et cartes
- **Twilio** : SMS et notifications
- **SendGrid** : Emails transactionnels
- **Cloudinary** : Stockage et optimisation d'images
- **Firebase** : Notifications push
- **Et bien d'autres...**

## 🚀 Configuration Rapide

### 1. Copier le fichier d'environnement

```bash
cp .env.example .env
```

### 2. Services Critiques (Obligatoires)

#### Supabase (Base de données)
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans Settings > API
4. Copiez les clés dans votre `.env` :

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Stripe (Paiements)
1. Créez un compte sur [stripe.com](https://stripe.com)
2. Allez dans Developers > API keys
3. Copiez les clés dans votre `.env` :

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
```

#### Google Maps (Géolocalisation)
1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Créez un projet ou sélectionnez-en un
3. Activez l'API Maps JavaScript
4. Créez une clé API dans Credentials
5. Ajoutez-la dans votre `.env` :

```env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyC...
```

### 3. Services Recommandés

#### Twilio (SMS)
1. Créez un compte sur [twilio.com](https://twilio.com)
2. Obtenez vos identifiants dans Console Dashboard
3. Achetez un numéro de téléphone
4. Configurez dans `.env` :

```env
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+33123456789
```

#### SendGrid (Emails)
1. Créez un compte sur [sendgrid.com](https://sendgrid.com)
2. Créez une clé API dans Settings > API Keys
3. Configurez dans `.env` :

```env
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@pawpaths.com
SENDGRID_FROM_NAME=Paw Paths
```

#### Cloudinary (Images)
1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Trouvez vos identifiants dans Dashboard
3. Configurez dans `.env` :

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef...
```

## 🔧 Configuration Détaillée par Service

### Firebase (Notifications Push)

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Créez un nouveau projet
3. Ajoutez une application web
4. Copiez la configuration :

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyC...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

5. Activez Cloud Messaging
6. Générez une clé VAPID dans Project Settings > Cloud Messaging

### OpenWeather (Météo)

1. Créez un compte sur [openweathermap.org](https://openweathermap.org)
2. Obtenez votre clé API gratuite
3. Configurez :

```env
REACT_APP_OPENWEATHER_API_KEY=your-api-key
```

### Algolia (Recherche)

1. Créez un compte sur [algolia.com](https://algolia.com)
2. Créez une application
3. Obtenez vos clés dans API Keys :

```env
REACT_APP_ALGOLIA_APP_ID=YOUR_APP_ID
REACT_APP_ALGOLIA_SEARCH_KEY=your-search-key
ALGOLIA_ADMIN_KEY=your-admin-key
```

### Sentry (Monitoring)

1. Créez un compte sur [sentry.io](https://sentry.io)
2. Créez un projet React
3. Copiez le DSN :

```env
REACT_APP_SENTRY_DSN=https://...@sentry.io/...
```

### Authentification Sociale

#### Google OAuth
1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Activez Google+ API
3. Créez des identifiants OAuth 2.0
4. Configurez :

```env
REACT_APP_GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-...
```

#### Facebook Login
1. Allez sur [Facebook Developers](https://developers.facebook.com)
2. Créez une application
3. Configurez Facebook Login
4. Obtenez l'App ID :

```env
REACT_APP_FACEBOOK_APP_ID=123456789
FACEBOOK_APP_SECRET=abc123...
```

#### Apple Sign In
1. Allez sur [Apple Developer](https://developer.apple.com)
2. Créez un App ID avec Sign In with Apple
3. Créez un Service ID
4. Configurez :

```env
APPLE_CLIENT_ID=com.pawpaths.signin
APPLE_TEAM_ID=ABC123DEF4
APPLE_KEY_ID=ABC123DEF4
APPLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
```

### PayPal (Paiements alternatifs)

1. Créez un compte sur [PayPal Developer](https://developer.paypal.com)
2. Créez une application
3. Obtenez vos identifiants :

```env
REACT_APP_PAYPAL_CLIENT_ID=AYiPC...
PAYPAL_CLIENT_SECRET=EHV...
```

### reCAPTCHA (Anti-spam)

1. Allez sur [Google reCAPTCHA](https://www.google.com/recaptcha)
2. Enregistrez un nouveau site (v2 ou v3)
3. Obtenez vos clés :

```env
REACT_APP_RECAPTCHA_SITE_KEY=6LdRcP...
RECAPTCHA_SECRET_KEY=6LdRcP...
```

## 🔒 Sécurité

### Variables Secrètes

Générez des clés sécurisées pour :

```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
ENCRYPTION_KEY=your-encryption-key-exactly-32-chars
SESSION_SECRET=your-session-secret-key-for-cookies
```

Vous pouvez utiliser cette commande pour générer des clés aléatoires :

```bash
openssl rand -base64 32
```

### AWS S3 (Stockage de fichiers)

1. Créez un compte AWS
2. Créez un bucket S3
3. Créez un utilisateur IAM avec accès S3
4. Configurez :

```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=abc123...
AWS_REGION=eu-west-3
AWS_S3_BUCKET=pawpaths-uploads
```

## 🧪 Mode Développement

Pour le développement, vous pouvez utiliser des valeurs de test :

```env
NODE_ENV=development
ENABLE_MOCK_PAYMENTS=true
ENABLE_TEST_USERS=true
REACT_APP_DEBUG_MODE=true
```

## ✅ Validation de la Configuration

L'application inclut un système de validation automatique des clés API. Au démarrage, elle vérifiera :

1. ✅ Présence des clés critiques
2. ✅ Format des clés API
3. ✅ Connectivité aux services
4. ⚠️ Avertissements pour les clés manquantes

## 🚨 Dépannage

### Erreurs Communes

#### "Supabase client error"
- Vérifiez que l'URL et la clé anonyme sont correctes
- Assurez-vous que le projet Supabase est actif

#### "Stripe publishable key invalid"
- Vérifiez que vous utilisez la bonne clé (test vs production)
- Assurez-vous que la clé commence par `pk_`

#### "Google Maps API error"
- Vérifiez que l'API Maps JavaScript est activée
- Vérifiez les restrictions de domaine sur la clé

#### "CORS errors"
- Ajoutez votre domaine dans les paramètres CORS de chaque service
- Vérifiez les origines autorisées

### Logs de Débogage

Activez les logs détaillés :

```env
REACT_APP_DEBUG_MODE=true
DEBUG=true
```

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez ce guide
2. Consultez la documentation de chaque service
3. Vérifiez les logs de l'application
4. Contactez le support technique

## 🔄 Mise à Jour des Clés

Pour mettre à jour les clés en production :

1. Modifiez les variables d'environnement
2. Redémarrez l'application
3. Vérifiez les logs pour confirmer la connexion
4. Testez les fonctionnalités critiques

---

**Important** : Ne jamais commiter le fichier `.env` dans votre repository Git. Utilisez des services comme Vercel, Netlify, ou Heroku pour gérer les variables d'environnement en production.
