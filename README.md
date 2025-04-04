# 🛒 E-commerce Backend (FastAPI + Stripe)

This project is a minimal backend for an e-commerce application, built with **FastAPI**, **SQLite**, and **Stripe** (Test Mode) for payment processing.

It is designed to serve as a backend for UI testing automation using **Playwright (TypeScript)** in a CI/CD pipeline with **GitHub Actions**.

---

## 🚀 Features

- REST API with FastAPI (Python)
- Stripe Checkout integration (sandbox/test mode)
- SQLite database using SQLAlchemy
- Environment variable support via `.env`
- Modular and clean project structure
- Prepped for full E2E test automation & CI/CD integration

---

## 🧱 Tech Stack

- FastAPI
- Stripe (sandbox)
- SQLite + SQLAlchemy + Databases
- Python-dotenv
- Git & GitHub (for version control)

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Dag86/ecommerce-backend.git
cd ecommerce-backend

### 2. Create and activate a virtual environment

python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

### 3. Install dependencies

pip install -r requirements.txt

###4. Create a .env file

# .env
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
DATABASE_URL=sqlite:///./test.db

# Replace sk_test_your_stripe_test_key with your Stripe Test Key.

### 5. Run the application locally

uvicorn main:app --reload

# Visit http://localhost:8000/products in your browser.

📚 API Endpoints

#Method |	Endpoint   |	 Description

#GET	  | /products  |  Get list of available products
#POST   |	/checkout	 |  Start Stripe checkout session

🧪 Upcoming Testing Features

#✅ UI Test Automation with Playwright (TypeScript)

#✅ CI/CD using GitHub Actions

#⏳ Simulated Stripe payments (end-to-end)

#⏳ Email confirmation integration via Mailtrap

📌 Project Goals

#This project is part of a QA Engineer Portfolio to demonstrate:

#Backend API & database testing

#Third-party integration testing (Stripe, Email)

#Full-stack automation (UI + API + CI)

#Clean, testable backend architecture

🤝 Contributing

#Contributions welcome — this is a sandbox project to experiment and build out quality pipelines. PRs, issues, and forks are appreciated!