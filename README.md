
# 📝 To-Do List App

A simple To-Do List application built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

---

## 🚀 Features

- ✅ Add new tasks  
- 📋 View all tasks  
- ✏️ Edit task title and completion status  
- 🗑️ Delete tasks  

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)  
- [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas)  
- [Docker](https://www.docker.com/) *(optional, for containerization)*  

---

## ⚙️ Setup

1. **Clone the repository**  
```bash
git clone https://github.com/Sanskruti2209/todo-app.git
cd todo-app
```

2. **Install dependencies**  
```bash
npm install
```

3. **Create a `.env` file** in the root directory  
```env
MONGO_URI=mongodb://localhost/todoapp
PORT=3000
```

4. **Start MongoDB** (if using local MongoDB)

5. **Run the application**  
```bash
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Running with Docker

1. **Build the Docker image**  
```bash
docker build -t todo-app .
```

2. **Run the container**  
```bash
docker run -p 3000:3000 --env-file .env -d todo-app
```

---

## ✅ Testing

Run tests with:

```bash
npm test
```

---

## 📁 Project Structure

```bash
todo-app/
│
├── app.js                # Main application file
├── config/
│   └── db.js             # MongoDB connection setup
├── models/
│   └── Task.js           # Task schema and model
├── routes/
│   └── tasks.js          # Task routes for CRUD operations
├── views/                # EJS templates for UI
├── public/               # Static files (CSS)
├── tests/                # Test files
├── Dockerfile            # Docker configuration
├── .env                  # Environment variables
└── package.json          # Project metadata and scripts
```

<!-- hello world1 -->
