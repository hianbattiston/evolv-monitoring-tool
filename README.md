# Evolv Monitoring Tool

A real-time monitoring tool that provides insightful visualizations and clear metrics for ongoing experiments.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, Socket.IO
- **Architecture**: Nx Monorepo

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

## Tech stack explanation

- **Frontend**: Next.js was not a requirement but I've decided to use it because of my familiarity with it and the speed of development. I haven't implemented any state management, since it's consuming from the live API. I choose Chart.js because I've worked with it before and it's a good choice for this kind of visualization.
- **Backend**: Express was also a choice of familiarity, simplicity and ease to use. Socket.IO was added for real-time updates and again, familiarity, since I've used it before on multiple projects.
- **Architecture**: Nx Monorepo for the shared types and libs.

## Suggestions and improvements

Let's start with what was not done from requirements, the Event Log. In short, time constraint, if I had a bit more time, I would have added it!

Now, improvements:

- Add tests, specially for the backend APIs and the hook to consume the API on the frontend;
- Types improvements;
- Tailwind configuration, adding the color variables and some styles that I've ended up creating with plain CSS;
- A slightly better design, I choose simplicity, especially with the time constraint;
