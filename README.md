# Web App project - Anna Guccione

## Instructions
1. Open a terminal in the root folder of the project.
2. Run:
   ```bash
   docker compose up --build
   ```

## Access Points
* **Frontend (Web Application):** [http://localhost](http://localhost) (standard port 80; also mapped to [http://localhost:5173](http://localhost:5173) for compatibility)
* **Backend API (via Reverse Proxy):** [http://localhost/api](http://localhost/api) (or directly at [http://localhost:3000/api](http://localhost:3000/api))
* **Database (MongoDB):** Initialized and seeded automatically on first startup; persisted across restarts using Docker volume `mongo-data`.

## Production Architecture
* **Frontend:** Built with Vite and served statically via **Nginx**. Nginx handles client-side routing fallback (`try_files`) and acts as a reverse proxy forwarding `/api` requests to the Node.js backend.
* **Backend:** Express REST API communicating with MongoDB within the private Docker network.
* **Database:** MongoDB 7.0 with data persistence on dedicated Docker volume and no public host exposure.
* **Security & Configuration:** Environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`), no hardcoded origins, and `.dockerignore` for clean builds.
