# ACCP Web

Public website for ACCP Conference.

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start development server (port 3000) |
| `npm run build` | Build for production                 |
| `npm run start` | Start production server              |
| `npm run lint`  | Run ESLint                           |
| `npm run sass`  | Watch SCSS changes                   |

## Environment Variables

Copy `.env.example` or create `.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

## Project Structure

```
accp-web/
├── app/            # Next.js pages
├── components/     # React components
├── public/         # Static assets
├── styles/         # CSS/SCSS styles
└── types/          # TypeScript types
```
