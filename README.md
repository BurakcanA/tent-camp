# 🎪 Tent Camp


Tent Camp is a full-stack Node.js project built with Express, MongoDB, and EJS. It demonstrates core web development concepts, including CRUD operations, authentication, sessions, middleware, error handling, and database relationships. This project was built as part of a full-stack learning journey and serves as a portfolio piece.

---

## 🚀 Features

- Full CRUD functionality for campgrounds  
- User authentication & authorization (register/login/logout)  
- Session handling & flash messages  
- Cookie parsing and management  
- MongoDB relationships with Mongoose (users ↔ campgrounds ↔ reviews)  
- Server-side rendering with EJS & EJS-Mate  
- Data validation with Joi  
- Bootstrap 5 for UI styling  
- Middleware and custom error handling  
- Organized routing structure  

> **Coming soon**: Interactive maps with clustering support 🌍

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Templating Engine**: EJS + EJS-Mate
- **Validation**: Joi
- **Styling**: Bootstrap 5

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BurakcanA/tent-camp.git
   cd tent-camp

   2.	Install dependencies
   ```

npm install

    3.	Make sure MongoDB is running

You’ll need MongoDB installed and running locally. 4. Seed the database (optional)
Run the seed script to populate the database with sample data:

node seeds/index.js

    5.	Start the development server

It’s recommended to use nodemon for auto-restarting:

nodemon app.js

---

## 📂 Folder Structure (Simplified)

- tent-camp/
- app.js # Main application file
- models/ # Mongoose schemas
- routes/ # Express route handlers
- controllers/ # Controllers
- cloudinary/ # Cloudinary config folder
- public/ # Static assets (CSS, JS, images)
- views/ # EJS templates
- seeds/ # Seed script for dummy data
- utils/ # Error handling, validation helpers

---

👨‍💻 Usage

Once the server is running, open your browser and go to:

http://localhost:3000

Explore the basic campground creation, editing, deletion, and detail views.

📌 Notes

## This is a practice project and may not be production-ready. It’s actively evolving, with map integration and clustering planned as the final major feature.

📜 License

MIT — feel free to fork and build upon it!
