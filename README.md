frontend :- https://cult-fitness-ten.vercel.app/
backend :- https://cult-fitness-1.onrender.com
# Cult Fitness

Cult Fitness is a modern fitness web application designed to help users manage their workout plans, diet plans, and fitness subscriptions. It offers personalized workout and diet plans, progress tracking, and seamless payment integration.

## Features

- User authentication and authorization
- Dynamic workout and diet plans
- Subscription plans with payment integration via Razorpay
- Facilities overview and booking
- Responsive and interactive UI built with React and Tailwind CSS
- Backend API built with Node.js, Express, and MongoDB

## Project Structure

- `frontend/`: React frontend application using TypeScript and Vite
- `backend/`: Node.js backend API with Express and MongoDB
- `frontend/src/pages/`: React pages including Plans, Dashboard, Login, Signup, etc.
- `backend/src/routes/`: API route handlers for authentication, workouts, nutrition, payments, and users
- `frontend/src/data/mockData.ts`: Mock data used during development (replaced with real data fetching)
- `frontend/src/lib/`: API and authentication utilities
- `backend/src/models/`: Mongoose models for User, Workout, Nutrition, Payment, etc.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd project
```

2. Install backend dependencies and start the backend server:

```bash
cd backend
npm install
npm run dev
```

3. Install frontend dependencies and start the frontend development server:

```bash
cd ../frontend
npm install
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` to access the app.

## Usage

- Register a new user or login with existing credentials.
- Browse available workout and diet plans.
- Choose a subscription plan and complete payment via Razorpay.
- Track your progress and manage your fitness journey.

## Technologies Used

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT
- Payment: Razorpay

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact the Cult Fitness team.
# cult-fitness
