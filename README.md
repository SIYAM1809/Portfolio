# 🚀 My Portfolio - Professional MERN Stack Application

A dynamic, high-performance portfolio application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project features a modern responsive design, secure authentication, and a comprehensive project management system.

## ✨ Features

- **🎨 Modern UI/UX**: Built with **React** (Vite), **TailwindCSS**, and **Framer Motion** for smooth animations and a premium feel.
- **🔐 Secure Authentication**: Robust admin authentication system using **JWT (JSON Web Tokens)** and **bcryptjs**.
- **📂 Dynamic Project Management**: Full CRUD (Create, Read, Update, Delete) capabilities for managing portfolio projects.
- **📱 Fully Responsive**: Optimized for all devices, from desktops to mobile phones.
- **⚡ High Performance**: Fast load times and optimized assets using Vite.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & Bcryptjs
- **Security**: CORS, Dotenv

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)
- **Git**

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/SIYAM1809/Portfolio.git
    cd Portfolio
    ```

2.  **Backend Setup**
    Navigate to the `Backend` directory and install dependencies:
    ```bash
    cd my-portfolio/Backend
    npm install
    ```

    Create a `.env` file in the `Backend` directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    *Note: Replace the values with your actual configuration.*

    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Frontend Setup**
    Open a new terminal, navigate to the `Frontend` directory (inside `my-portfolio` if applicable, check structure):
    ```bash
    cd my-portfolio/Frontend
    npm install
    ```

    Start the development server:
    ```bash
    npm run dev
    ```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Admin login |
| **GET** | `/api/projects` | Get all projects |
| **POST** | `/api/projects` | Add a new project (Protected) |
| **PUT** | `/api/projects/:id` | Update a project (Protected) |
| **DELETE** | `/api/projects/:id` | Delete a project (Protected) |

## 📄 License

This project is licensed under the ISC License.