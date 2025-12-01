# 🛍️ Full Stack E-Commerce App

A modern e-commerce platform with user authentication, admin dashboard, shopping cart, wishlist, and Stripe payment integration.

## ✨ Features

- User authentication with JWT
- Product catalog with filters
- Shopping cart & wishlist
- Admin dashboard with analytics
- Stripe payment processing
- Order management
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Redux, Axios
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Stripe API

## 📋 Prerequisites

- Node.js v18+
- MongoDB
- Stripe account

## 🚀 Installation

### Backend
```bash
cd backend
npm install
```

Create `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

Start server:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
```

Create `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Start dev server:
```bash
npm run dev
```

## 📱 Live Demo

**Trendhive-Store:** [LIVE](https://full-stack-e-commerce-app-jade.vercel.app/)

**Admin:** [LIVE](https://trendhive-app-admin.onrender.com/)

**Test Stripe Card:** `4242 4242 4242 4242` | Exp: `12/25` | CVC: `123`

## 🔑 Main API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/products` | Get all products |
| POST | `/api/cart/add` | Add to cart |
| POST | `/api/wishlist/add` | Add to wishlist |
| POST | `/api/orders/create` | Create order |
| POST | `/api/payments/create-intent` | Stripe payment |

## 📊 Admin Features

- Dashboard with sales analytics
- Product management (create, edit, delete)
- Order tracking & status updates
- User management
- Revenue reports

## 🔐 Security

- JWT authentication
- Bcrypt password hashing
- CORS protection
- Input validation
- Stripe PCI compliance

## 📦 Deployment

**Frontend:** Deploy to Vercel
**Backend:** Deploy to Heroku or Railway

## 📄 License

MIT License
