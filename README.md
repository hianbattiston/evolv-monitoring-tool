# Evolv Monitoring Tool

A real-time monitoring tool that provides insightful visualizations and clear metrics for ongoing experiments.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, Socket.IO
- **Architecture**: Monorepo structure

## Features

- Real-time data visualization and updates using WebSockets
- Responsive dashboard for both desktop and mobile
- Interactive charts showing experiment performance
- Event log system with filtering capabilities
- Key metrics display with real-time updates

## Project Structure

```
evolv-monitoring-tool/
├── packages/
│   ├── frontend/       # Next.js application
│   ├── backend/        # Express API server
│   └── shared/         # Shared types and utilities
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version in .nvmrc)
- pnpm

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd packages/backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

### Running the Application

Since this uses a monorepo structure, you can run the application using the following command:

```bash
# Run both frontend and backend
pnpm run dev
```

### API Endpoints

- `GET /api/experiments/live` - Get all live experiments
- `GET /api/experiments/:id/metrics` - Get metrics for a specific experiment
- `POST /api/experiments/:id/logs` - Add log to a specific experiment
