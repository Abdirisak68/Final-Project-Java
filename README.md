# Travel Agency System

A full-stack travel agency management system built with React (Frontend) and Java Spring Boot (Backend).

## Project Overview

This system allows users to browse and book travel packages, while admins can manage destinations, packages, bookings, and users.

### Key Features:
- **Authentication & Authorization**: User registration, login, role-based access (Admin/User)
- **Destination Management**: Add, edit, delete, and view travel destinations
- **Travel Package Management**: Create, edit, delete packages with flights, hotels, pricing, and availability
- **Booking Management**: Book packages, view bookings, update booking status
- **User Management**: Admin can manage all users
- **File Uploads**: Upload images for destinations
- **Email Notifications**: Send confirmation emails

### Tech Stack:
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Java Spring Boot, Spring Security, JPA/Hibernate
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Quick Start Guide

### 1. Clone the Project
```bash
git clone https://github.com/Abdirisak68/Travel-Agency-Booking-System.git
cd Travel-Agency-Booking-System
```

### 2. Prerequisites
- **Java 17+** (for backend)
- **Node.js & npm** (for frontend)
- **PostgreSQL** (database)
- **IntelliJ IDEA** (recommended for backend development)
- **VS Code** (recommended for frontend development)

### 3. Database Setup (PostgreSQL)
- Open PostgreSQL (using psql or pgAdmin)
- Create a database named `Travel_agency` (you can use a different name, but remember to update application.properties)
```sql
CREATE DATABASE Travel_agency;
```

### 4. Backend Setup
1. Open the `backend/` folder in IntelliJ IDEA
2. Check and update `backend/src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Travel_agency
spring.datasource.username=postgres  # update with your username
spring.datasource.password=root      # update with your password
```
3. Run `BackendApplication.java` (IntelliJ will help you run it)

### 5. Frontend Setup
1. Open the `frontend/` folder in VS Code
2. Install dependencies:
```bash
cd frontend
npm install
```
3. Verify the `.env` file has the correct backend URL:
```env
VITE_BACKEND_URL = 'http://localhost:8080'
```
4. Start the frontend:
```bash
npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080
