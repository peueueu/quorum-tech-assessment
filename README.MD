# 🧩 Quorum Tech Assessment

Built with:

- **Frontend:** React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend:** Node.js + TypeScript + Express
- **Monorepo Tooling:** pnpm workspaces

---

## 🚀 Getting Started

### 1. **Install Dependencies**

> Make sure you have [pnpm](https://pnpm.io/installation) installed.

Run the following command at the root directory.

```bash
pnpm install
```

This installs dependencies for both frontend and backend.

### 2. **Run the Backend**

> To run the project backend:

```bash
pnpm run dev:backend
```

- Starts the Express server on http://localhost:3000

- Serves CSV-parsed data from the /api/bills endpoint and /api/legislators.

### 3. Run the Frontend

> To run the project frontend:

```bash
pnpm run dev:frontend
```

- Starts the Vite dev server on http://localhost:5173

- Automatically proxies /api requests to the backend


## Scripts Reference

```bash
# Install all dependencies
pnpm install

# Run project backend
pnpm run dev:backend

# Run project frontend
pnpm run dev:frontend
```

## Tech Stack

- ⚛️ React + TypeScript

- ⚡ Vite

- 🌈 TailwindCSS + shadcn/ui

- 🟦 Node.js + Express

- 🗂 pnpm + monorepo setup

- 📊 fast-csv for CSV parsing