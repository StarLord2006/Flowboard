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
*(Add screenshots here for LinkedIn)*

## 🔗 Deployed
*(Add live URL here after deployment)*

## 📝 API Endpoints
| Endpoint | Method | Auth |
|----------|--------|------|
| /api/auth/register | POST | No |
| /api/auth/login | POST | No |
| /api/tasks | GET | Yes |
| /api/tasks | POST | Yes |
| /api/tasks/{id} | PUT | Yes |
| /api/tasks/{id} | DELETE | Yes |
