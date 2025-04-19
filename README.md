# Employee Analytics Dashboard

## Project Architecture

This application uses:
- React + TypeScript for the frontend
- Supabase for backend services (database, authentication, and REST API)
- OpenAPI/Swagger for API documentation
- Docker for containerization

## API Documentation

The API documentation is available in OpenAPI/Swagger format. You can view it by:

1. Installing `swagger-ui` globally:
```bash
npm install -g swagger-ui
```

2. Serving the documentation:
```bash
swagger-ui-serve src/api-docs/swagger.yaml
```

## Docker Setup

To run the application using Docker:

```bash
# Build and start the containers
docker-compose up -d

# Stop the containers
docker-compose down
```

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f883106f-14d8-4399-8b8a-690e95d02116

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f883106f-14d8-4399-8b8a-690e95d02116) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f883106f-14d8-4399-8b8a-690e95d02116) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Environment Variables

The application uses the following environment variables:

```
VITE_SUPABASE_URL=https://dvqtxzigrpeoopgeamqw.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are already configured in the application for demo purposes.

## Development Setup

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
