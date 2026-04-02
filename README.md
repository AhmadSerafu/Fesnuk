# Fesnuk 🌐

Fesnuk adalah platform media sosial sederhana yang dibuat sebagai Pair Project. Pengguna dapat membuat postingan, memberikan komentar, menyukai postingan, dan mengelola profil mereka.

---

## Features

- 🔐 Register & Login
- 📝 Create & Edit Post (dengan upload foto atau URL)
- ❤️ Like & Unlike Post
- 💬 Comment pada Post
- 🔍 Search Post
- 👤 Edit User Profile
- 🛡️ Admin: Delete Post

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Template Engine**: EJS
- **CSS Framework**: Bootstrap 5
- **Authentication**: Express Session & Bcryptjs
- **File Upload**: Multer

---

## Installation

1. Clone repository
```bash
   git clone <repo-url>
   cd fesnuk
```

2. Install dependencies
```bash
   npm install
```

3. Setup database di `config/config.json`
```json
   {
     "development": {
       "username": "postgres",
       "password": "your_password",
       "database": "Fesnuk",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }
```

4. Jalankan migration & seeder
```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
```

5. Jalankan server
```bash
   node app.js
```

6. Buka browser dan akses `http://localhost:3000`

---

## Default Accounts

| Username | Email | Password | Role |
|---|---|---|---|
| ceo_dawei | dawei@mail.com | hashedpassword1 | Admin |
| lumine_hotaru | lumine@mail.com | hashedpassword2 | User |
| aether_sora | aether@mail.com | hashedpassword3 | User |
| akira_masbijak | masbijak@mail.com | hashedpassword4 | User |
| rin_belle | belle@mail.com | hashedpassword5 | User |
| zenka | zenka@mail.com | hashedpassword6 | User |

---

## ERD

![ERD Fesnuk](./fesnuk-schema.drawio.png)

---

## Project Structure
```
Fesnuk/
├── config/
├── controllers/
├── data/
├── helpers/
├── migrations/
├── models/
├── public/
├── routes/
├── seeders/
├── views/
└── app.js
```
