# NutriAssist – Nutrition Assistant

NutriAssist is a full-stack web application designed to help users make informed decisions about their nutrition and maintain a healthier lifestyle through personalized nutrition guidance, food tracking, diet planning, and progress monitoring.

The application provides personalized nutrition recommendations based on user-specific information such as age, weight, height, gender, activity level, and health goals.

---

## Project Overview

Maintaining a healthy lifestyle requires personalized guidance and consistent monitoring. NutriAssist provides a centralized platform where users can manage their nutrition and health-related information.

Users can create an account, enter their personal and health details, select a goal such as weight loss, weight maintenance, or weight gain, and receive personalized nutrition recommendations.

The application provides:

- BMI calculation and classification
- Daily calorie estimation
- Macronutrient recommendations
- Personalized nutrition guidance
- Food intake tracking
- Diet plan management
- Progress and nutrition monitoring

---

## Key Features

### 1. User Authentication

- User registration
- User login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected user-specific routes
- Logout functionality

---

### 2. Personalized Nutrition Dashboard

The dashboard provides users with an overview of their health and nutrition information.

Users can:

- View their personal profile information
- Select their health goal
- Generate a personalized nutrition plan
- View recommended daily calorie intake
- View recommended macronutrient targets
- Access food tracking, diet plans, and progress reports

Supported goals include:

- Weight Loss
- Weight Maintenance
- Weight Gain

---

### 3. Nutrition Analysis

The application generates personalized nutrition insights based on user information.

The nutrition analysis includes:

- Body Mass Index (BMI)
- BMI category
- Estimated daily calorie requirements
- Daily protein target
- Daily carbohydrate target
- Daily fat target
- Personalized nutrition recommendations

---

### 4. Food Tracker

The Food Tracker enables users to record and monitor their daily food intake.

Users can:

- Add food items
- Record calories
- Record protein, carbohydrates, and fats
- View logged food records
- Track daily nutrition intake
- Delete food records

---

### 5. Diet Plan Management

Users can create and manage personalized diet plans.

Features include:

- Create customized diet plans
- Add meal information
- Add nutrition details
- View saved diet plans
- Delete existing diet plans

---

### 6. Progress and Reports

The Progress and Reports section helps users monitor their nutrition and health-related progress.

Users can view:

- Nutrition-related information
- Food tracking data
- Health progress
- Nutrition reports

---

## Application Screens

The application consists of the following major screens:

- Landing Page
- User Registration
- User Login
- Personalized Dashboard
- Nutrition Plan
- Food Tracker
- Diet Plans
- Progress and Reports

---

## Technology Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- MongoDB Atlas

### Authentication and Security

- JSON Web Token (JWT)
- bcrypt
- Environment variables for sensitive configuration

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  React Router      │
                    │  Axios             │
                    │  CSS               │
                    └──────────┬──────────┘
                               │
                    HTTP Requests / REST APIs
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │                     │
                    │  Authentication    │
                    │  API Processing    │
                    │  Business Logic    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │                     │
                    │  User Data         │
                    │  Food Records      │
                    │  Diet Plans        │
                    │  Progress Data     │
                    └─────────────────────┘
Project Structure
Nutrition-Assistant/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── Demo Screenshots/
│
├── Demo Video/
│
├── .gitignore
│
└── README.md
Installation and Setup
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB Atlas account
Git
1. Clone the Repository
git clone https://github.com/238x1a05h5-code/NutritionAssistant.git

Navigate into the project directory:

cd NutritionAssistant
2. Install Frontend Dependencies
cd client
npm install
3. Install Backend Dependencies

Open another terminal and run:

cd server
npm install
4. Configure Environment Variables

Create a .env file inside the server directory.

Example:

PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret

Never commit the .env file to GitHub. Environment variables contain sensitive information such as database credentials and secret keys.

5. Start the Backend Server

Inside the server directory:

node index.js

The backend server will run on:

http://localhost:8000
6. Start the Frontend

Inside the client directory:

npm run dev

The frontend application will be available at the URL provided by Vite, usually:

http://localhost:5173
API Overview

The backend provides REST API endpoints for authentication, user management, food tracking, diet planning, nutrition suggestions, and progress monitoring.

Authentication
POST /api/auth/register
POST /api/auth/login
Nutrition Suggestions
POST /api/suggestions
Food Tracking
GET    /api/food
POST   /api/food
DELETE /api/food/:id
Diet Plans
GET    /api/diet-plans
POST   /api/diet-plans
DELETE /api/diet-plans/:id
Security

The application follows basic security practices, including:

Password hashing using bcrypt
JWT-based authentication
Protected API routes
User-specific data access
Environment variables for sensitive configuration
.env excluded from version control using .gitignore
Project Screenshots

Screenshots of the application interfaces and major features are available here:

## Project Screenshots

Screenshots of the application interfaces and major features are available here:

📄 **[View Project Screenshots](https://docs.google.com/document/d/1uXGS1rZoCBe6wyZcIDoPdhB0cn77MN2h/edit?usp=sharing&ouid=116142877459962683813&rtpof=true&sd=true)**

The screenshots include:

- Landing Page
- Registration Page
- Login Page
- Dashboard
- Nutrition Analysis
- Food Tracker
- Diet Plans
- Progress and Reports

---

## Project Demo Video

A complete demonstration of the NutriAssist application is available below:

🎥 **[Watch the Project Demo Video](https://drive.google.com/file/d/148h4f4LLpj4HliZAgK630olMpM3j4BxF/view?usp=sharing)**

The demo demonstrates:

- User registration and login
- Personalized dashboard
- Nutrition plan generation
- Food tracking
- Diet plan management
- Progress and report features

## Author

**Project:** NutriAssist – Nutrition Assistant

**Repository:**  
https://github.com/238x1a05h5-code/NutritionAssistant
