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
- Fully integrated with Playwright E2E automation
- GitHub Actions CI/CD with:
  - Headless browser testing
  - Stripe sandbox session validation
  - Screenshots, video, and trace upload on failure
  - Backend service health checks
  - HTML test reports as artifacts

---

## 🧱 Tech Stack

- FastAPI
- Stripe (sandbox)
- SQLite + SQLAlchemy + Databases
- Python-dotenv
- Playwright (TypeScript)
- Git & GitHub Actions

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Dag86/ecommerce-project.git
cd ecommerce-backend
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate         # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Create a .env file

```env
# .env
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
DATABASE_URL=sqlite:///./test.db
```

> Replace `sk_test_your_stripe_test_key` with your Stripe Test Key.

### 5. Run the application locally

```bash
uvicorn main:app --reload
```

> Visit [http://localhost:8000/products](http://localhost:8000/products) in your browser.

---

## 📚 API Endpoints

| Method | Endpoint     | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/products`  | Get list of available products       |
| POST   | `/checkout`  | Start Stripe checkout session        |

---

## 🧪 End-to-End Testing

- ✅ UI Test Automation with Playwright (TypeScript)
- ✅ Stripe test cards and checkout flow
- ✅ GitHub Actions CI integration
- ✅ Test data abstraction with `testData.ts`
- ✅ Trace, video, and HTML reports on failure

---

## 📌 Project Goals

This project is part of a QA Engineer Portfolio to demonstrate:

- Backend API & database testing
- Third-party integration testing (Stripe)
- Full-stack automation (UI + API + CI)
- Clean, testable backend architecture
- CI/CD reporting and diagnostics

---

## 🤝 Contributing

Contributions welcome — this is a sandbox project to experiment and build out quality pipelines. PRs, issues, and forks are appreciated!

---

> echo "// trigger CI"