# Boilerplate React + TypeScript + Vite

Un boilerplate moderne pour développer des applications React avec TypeScript, Vite, Shadcn/ui et TanStack Router.

## 🚀 Technologies utilisées

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Vite** - Build tool et serveur de développement
- **Shadcn/ui** - Composants UI
- **TanStack Router** - Routage type-safe
- **Tailwind CSS** - Framework CSS utilitaire

## 📦 Installation

```bash
npm install
```

## 🛠️ Scripts disponibles

### Développement
```bash
npm run dev
```
Lance le serveur de développement Vite sur `http://localhost:5173`

### Build de production
```bash
npm run build
```
Compile TypeScript et génère les fichiers optimisés pour la production dans le dossier `dist/`

### Aperçu de la production
```bash
npm run preview
```
Lance un serveur local pour prévisualiser le build de production

### Linting
```bash
npm run lint
```
Vérifie la qualité du code avec ESLint

## 📁 Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   └── ui/             # Composants Shadcn/ui
├── routes/             # Routes TanStack Router
│   ├── __root.tsx      # Route racine (layout principal)
│   ├── index.tsx       # Page d'accueil (/)
│   └── about.tsx       # Page à propos (/about)
├── lib/                # Utilitaires et helpers
├── assets/             # Ressources statiques
├── styles.css          # Styles globaux Tailwind
├── routeTree.gen.ts    # Arbre des routes généré automatiquement
└── main.tsx           # Point d'entrée de l'application
```

## 🎯 React 19

Ce projet utilise **React 19**, la dernière version qui apporte :
- **React Compiler** - Optimisations automatiques
- **Actions** - Gestion simplifiée des formulaires
- **use()** - Nouveau hook pour les promesses
- **Suspense** amélioré
- Meilleure gestion de l'hydratation

## 📝 TypeScript

### Configuration
Le projet utilise une configuration TypeScript moderne avec :
- **Strict mode** activé pour une sécurité maximale
- **Path mapping** configuré (`@/*` → `./src/*`)
- **Types React 19** inclus

### Bonnes pratiques
- Utilisez des interfaces pour définir les props des composants
- Exploitez l'inférence de types autant que possible
- Définissez des types personnalisés dans `src/types/`

Exemple :
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

## ⚡ Vite

### Configuration
Vite est configuré avec :
- **Plugin React** pour le support JSX/TSX
- **Plugin TanStack Router** pour la génération automatique des routes
- **Plugin Tailwind CSS** pour le CSS
- **Alias de chemin** (`@` → `src/`)

### Commandes utiles
- `npm run dev` - Serveur de développement avec HMR
- `npm run build` - Build optimisé pour la production
- `npm run preview` - Aperçu du build de production

### Variables d'environnement
Créez un fichier `.env.local` pour vos variables :
```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=Mon App
```

Utilisez-les dans votre code :
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🎨 Shadcn/ui

### Installation de nouveaux composants
```bash
npx shadcn@latest add [nom-du-composant]
```

Exemples :
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### Configuration
Le fichier `components.json` configure :
- **Style** : "new-york" (style moderne)
- **Couleur de base** : "neutral"
- **Variables CSS** : activées
- **Icônes** : Lucide React

### Utilisation
```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titre</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Cliquez-moi</Button>
      </CardContent>
    </Card>
  )
}
```

### Personnalisation
Les composants peuvent être personnalisés via :
- **Variables CSS** dans `src/styles.css`
- **Classes Tailwind** directement sur les composants
- **Variants** avec `class-variance-authority`

## 🧭 TanStack Router

### RouteTreeGen
Le fichier `src/routeTree.gen.ts` est **généré automatiquement** par le plugin Vite. Il contient :
- L'arbre complet des routes
- Les types TypeScript pour chaque route
- La configuration de routage

⚠️ **Ne jamais modifier ce fichier manuellement** - il sera écrasé à chaque build.

### Structure des fichiers de routes

#### Route racine (`__root.tsx`)
```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav>Navigation globale</nav>
      <Outlet /> {/* Contenu des routes enfants */}
    </div>
  ),
})
```

#### Routes simples
```typescript
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div>Page À propos</div>
})
```

#### Routes avec paramètres
```typescript
// src/routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: () => {
    const { userId } = Route.useParams()
    return <div>Utilisateur : {userId}</div>
  }
})
```

#### Routes imbriquées
```typescript
// src/routes/dashboard.tsx (layout)
export const Route = createFileRoute('/dashboard')({
  component: () => (
    <div>
      <aside>Sidebar</aside>
      <Outlet />
    </div>
  )
})

// src/routes/dashboard/index.tsx
export const Route = createFileRoute('/dashboard/')({
  component: () => <div>Dashboard principal</div>
})

// src/routes/dashboard/settings.tsx
export const Route = createFileRoute('/dashboard/settings')({
  component: () => <div>Paramètres</div>
})
```

### Création de nouvelles routes

1. **Créez un fichier** dans `src/routes/` avec la convention de nommage :
   - `index.tsx` → `/`
   - `about.tsx` → `/about`
   - `users.tsx` → `/users`
   - `users/$id.tsx` → `/users/:id`
   - `dashboard/settings.tsx` → `/dashboard/settings`

2. **Le routeTree sera automatiquement régénéré** au prochain build/dev

3. **Navigation type-safe** :
```typescript
import { Link } from '@tanstack/react-router'

// Navigation simple
<Link to="/about">À propos</Link>

// Navigation avec paramètres
<Link to="/users/$userId" params={{ userId: '123' }}>
  Voir utilisateur
</Link>

// Navigation programmatique
import { useNavigate } from '@tanstack/react-router'

const navigate = useNavigate()
navigate({ to: '/dashboard' })
```

### Fonctionnalités avancées

#### Loaders (chargement de données)
```typescript
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  component: () => {
    const { post } = Route.useLoaderData()
    return <div>{post.title}</div>
  }
})
```

#### Search params
```typescript
export const Route = createFileRoute('/search')({
  validateSearch: (search) => ({
    query: search.query as string,
    page: Number(search.page) || 1
  }),
  component: () => {
    const { query, page } = Route.useSearch()
    return <div>Recherche: {query}, Page: {page}</div>
  }
})
```

## 🚀 Démarrage rapide

1. **Clonez et installez** :
```bash
git clone https://github.com/MaximeSeignovert/boilerplate.git
cd boilerplate
npm install
```

2. **Lancez le développement** :
```bash
npm run dev
```

3. **Ajoutez des composants Shadcn** :
```bash
npx shadcn@latest add button card dialog
```

4. **Créez une nouvelle route** :
```typescript
// src/routes/contact.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: () => <div>Page de contact</div>
})
```

5. **Ajoutez la navigation** dans `__root.tsx` :
```typescript
<Link to="/contact">Contact</Link>
```

## 📚 Ressources utiles

- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [TanStack Router Docs](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)