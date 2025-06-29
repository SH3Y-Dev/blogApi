```markdown
# 📝 Full Stack Blog App

A secure and responsive full-stack blogging platform.

## 🔧 Tech Stack

| Layer      | Tech                                   |
|------------|----------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript    |
| Styling    | TailwindCSS                            |
| Backend    | Node.js, Express.js, MongoDB, Mongoose |
| Auth       | JWT (stored in cookie via `js-cookie`) |

## 🚀 Features

### 🌐 Frontend (Next.js)

- `/` – Public **Home page** listing all blogs with author's email
- `/login` – User login
- `/signup` – User registration
- `/dashboard` – **Protected route**
  - View own blog posts
  - Create new blog posts
- 🔒 Auth token is stored securely in cookies
- 🚪 Logout clears session and redirects to login
- 💡 UI using TailwindCSS

### 🔙 Backend (Express.js + MongoDB)

- `POST /auth/signup` – Register a new user and returns JWT
- `POST /auth/login` – Authenticate user and return JWT
- `POST /post` – Create a blog post (Requires Auth)
- `GET /posts` – Fetch all blog posts with author info
- `GET /posts/author` – Fetch posts for logged-in user (Requires Auth)

---

## ⚙️ Getting Started

### 🧩 Backend Setup

1. Navigate to the backend directory
2. Create a `.env` file with the following content:

```env
PORT=3001
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

### 🎨 Frontend Setup

1. Navigate to the frontend directory
2. Create a `.env` file with the following content:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 🐳 Docker Setup

Run the following command from the root of the project:

```bash
docker compose up
```

> 💡 Make sure Docker Daemon is installed and running on your machine.

---

## ✅ TODO / Improvements

* 🔁 Add pagination to improve performance on the Home page
* 🧠 Improve data modeling and relationships
* ✏️ Add edit/delete functionality for posts
* 👤 Add user profile with avatars

---

## 📬 Contact

Maintainer: [shreyas.19.dev@gmail.com](mailto:shreyas.19.dev@gmail.com)
