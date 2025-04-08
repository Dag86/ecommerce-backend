# FastAPI eCommerce Backend with Stripe Integration
# This code is a simplified version of an eCommerce backend using FastAPI and Stripe.
# It includes product listing, checkout session creation, and order logging.    

# It is designed to be run locally or in a CI/CD environment.
# The code uses SQLAlchemy for database interactions and Stripe for payment processing. 
# It also includes a health check endpoint for monitoring purposes.
# The code is structured to be modular, with separate files for models, schemas, and database connections.


# Import necessary libraries and modules
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
import os
import stripe
from dotenv import load_dotenv

from models import products, orders, metadata
from database import database, engine
from schemas import Product, OrderCreate

# Load environment variables from .env (only in local dev)
if os.getenv("GITHUB_ACTIONS") != "true":
    load_dotenv()

# Securely fetch Stripe secret key with fallback handling
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
if not stripe.api_key:
    raise RuntimeError("Missing STRIPE_SECRET_KEY environment variable!")

# FastAPI  lifespan event handler (modern startup/shutdown)
@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()

    # OPTIONAL: Seed demo products only if none exist
    existing = await database.fetch_all(products.select())
    if not existing:
        await database.execute_many(products.insert(), [
            {"name": "Laptop", "price": 1199.99},
            {"name": "Smartphone", "price": 699.49}
        ])

    yield  # --- app runs here ---

    await database.disconnect()

# App instance
app = FastAPI(lifespan=lifespan)

# Health check endpoint (useful for CI/CD, uptime checks, etc.)
@app.get("/health")
async def health():
    return {"status": "ok"}

# Fetch all products
@app.get("/products", response_model=list[Product])
async def get_products():
    return await database.fetch_all(products.select())

# Checkout endpoint: create Stripe session, log order
@app.post("/checkout")
async def checkout(order: OrderCreate):
    product = await database.fetch_one(
        products.select().where(products.c.id == order.product_id)
    )

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": product["name"]},
                "unit_amount": int(product["price"] * 100)
            },
            "quantity": 1
        }],
        mode="payment",
        # ⚠️ NOTE: In production, set these URLs via environment variables
        success_url="http://127.0.0.1:8000/success",
        cancel_url="http://127.0.0.1:8000/cancel"
    )

    await database.execute(orders.insert().values(
        product_id=product["id"],
        amount=product["price"],
        stripe_session_id=session.id
    ))

    return {"checkout_url": session.url}

# Auto-create tables on app start (fine for dev)
metadata.create_all(engine)
