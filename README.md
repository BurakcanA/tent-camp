🎪 Tent Camp

Tent Camp is a simple full-stack Node.js practice project built with Express, MongoDB, and EJS. It demonstrates core concepts such as CRUD operations, server-side rendering, middleware, error handling, and basic database integration with Mongoose. This project is part of a full-stack learning journey and is ideal for junior developer portfolios.

⸻

🚀 Features
	•	Full CRUD functionality for campgrounds
	•	MongoDB database integration via Mongoose
	•	Server-side rendering with EJS and EJS-Mate
	•	Data validation using Joi
	•	Bootstrap 5 for basic UI styling
	•	Middleware and custom error handling
	•	Organized route structure

Authentication, Express Sessions, Flash Messages, Cookie handling, and MongoDB relationships are coming soon.

⸻

🛠️ Tech Stack
	•	Backend: Node.js, Express
	•	Database: MongoDB + Mongoose
	•	Templating Engine: EJS + EJS-Mate
	•	Validation: Joi
	•	Styling: Bootstrap 5

⸻

📦 Installation
	1.	Clone the repository

git clone https://github.com/BurakcanA/tent-camp.git
cd tent-camp


	2.	Install dependencies

npm install


	3.	Make sure MongoDB is running
You’ll need MongoDB installed and running locally.
	4.	Seed the database (optional)
Run the seed script to populate the database with sample data:

node seeds/index.js


	5.	Start the development server
It’s recommended to use nodemon for auto-restarting:

nodemon app.js



⸻

📂 Folder Structure (Simplified)

tent-camp/
│
├── app.js                 # Main application file
├── models/                # Mongoose schemas
├── routes/                # Express route handlers
├── public/                # Static assets (CSS, JS, images)
├── views/                 # EJS templates
├── seeds/                 # Seed script for dummy data
└── utils/                 # Error handling, validation helpers


⸻

👨‍💻 Usage

Once the server is running, open your browser and go to:

http://localhost:3000

Explore the basic campground creation, editing, deletion, and detail views.

⸻

📌 Notes

This is a practice project and does not include production-ready features like user authentication (yet). It’s a work in progress and will be updated as new features are added.

⸻

📜 License

MIT — feel free to fork and build upon it!

⸻
