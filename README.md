# BlogNest
# 🪄 BlogNest – Developer-Friendly Markdown Blogging Platform

BlogNest is a full-stack blogging platform designed for developers. It enables users to write, preview, and publish Markdown-based blog posts with tag support, commenting features, and admin-level user management.



---

### 👤 Authentication
- User signup, login, logout
- Secure password hashing (bcrypt)
- JWT-based authentication and route protection

### 📝 Blog Writing
- Real-time **Markdown editor**
- Live HTML preview
- Create, edit, and delete blog posts
- Download posts as `.md` or `.html`

### 🔖 Tagging & Search
- Add tags to posts
- Filter posts by tags
- Keyword search support

### 💬 Comment System
- Add comments to posts
- View all comments per post

### 📊 Admin Dashboard
- View total posts, users, comments, and tags
- Manage users: promote to admin, delete
- Manage posts: delete/edit any post
- Secure access via admin-only JWT check

---

## 🛠️ Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | HTML, CSS, JavaScript           |
| Backend     | Node.js, Express.js             |
| Database    | MongoDB, Mongoose               |
| Auth        | JWT, bcrypt                     |
| Styling     | Custom CSS (Dark Theme)         |
| API Test    | Postman, RESTful API design     |
