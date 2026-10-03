# 🚀 FlowBoard — Kanban Task Manager

Full-stack Kanban board built with **Spring Boot**, **JWT Authentication**, **MySQL**, and **vanilla JS/CSS**.

## ✨ Features
- 🔐 JWT-based login & registration
- 📋 Drag-and-drop Kanban board (To Do / In Progress / Done)
- ➕ Create, edit, delete tasks
- 🔒 Role-based security with Spring Security
- 🐳 Docker-ready MySQL setup

## 🛠️ Tech Stack
- **Backend:** Spring Boot 3, Spring Security, JWT, Spring Data JPA
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** MySQL 8
- **Build:** Maven

## 🚀 Quick Start

### 1. Start MySQL
```bash
docker-compose up -d
```

### 2. Run the app
```bash
mvn spring-boot:run
```

### 3. Open
http://localhost:8080

## 📸 Screenshots
<img width="1535" height="765" alt="Screenshot 2026-10-04 010730" src="https://github.com/user-attachments/assets/e4c93933-b2f9-435c-81f1-fd47b89a3153" />
<img width="1535" height="773" alt="Screenshot 2026-10-04 010720" src="https://github.com/user-attachments/assets/a202a1c1-a9a7-491f-9f80-54e43a2afb86" />



## 🔗 Deployed
(https://flowboard-production-3179.up.railway.app/)

## 📝 API Endpoints
| Endpoint | Method | Auth |
|----------|--------|------|
| /api/auth/register | POST | No |
| /api/auth/login | POST | No |
| /api/tasks | GET | Yes |
| /api/tasks | POST | Yes |
| /api/tasks/{id} | PUT | Yes |
| /api/tasks/{id} | DELETE | Yes |
