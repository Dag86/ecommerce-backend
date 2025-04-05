# FastAPI eCommerce Backend with Stripe Integration
# This code sets up a FastAPI application that connects to a PostgreSQL database using SQLAlchemy and asyncpg.
# It includes endpoints for fetching products and simulating a Stripe checkout session.
# It uses SQLAlchemy for ORM and asyncpg for asynchronous database operations.
# It also uses Stripe's API for payment processing.
# The code is structured to handle database connections and transactions efficiently using async context managers.


from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
import stripe
import os
from dotenv import load_dotenv
from models import products, orders, metadata
from database import database, engine
from schemas import Product, OrderCreate


# Load environment variables from .env only if it exists (for local dev)
if os.getenv("GITHUB_ACTIONS") != "true":
    from dotenv import load_dotenv
    load_dotenv()

# Get Stripe API key from env var (required in CI/CD and local)
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]



# Lifespan context (replaces deprecated startup/shutdown events)
@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()

    # OPTIONAL: seed products if none exist
    existing = await database.fetch_all(products.select())
    if not existing:
        query = products.insert()
        await database.execute_many(query, [
            {"name": "Laptop", "price": 1199.99},
            {"name": "Smartphone", "price": 699.49}
        ])

    yield  # Application runs here

    await database.disconnect()

# Initialize FastAPI app with lifespan handler
app = FastAPI(lifespan=lifespan)

# GET /products – fetch all products
@app.get("/products", response_model=list[Product])
async def get_products():
    query = products.select()
    return await database.fetch_all(query)

# POST /checkout – simulate Stripe checkout
@app.post("/checkout")
async def checkout(order: OrderCreate):
    product = await database.fetch_one(products.select().where(products.c.id == order.product_id))
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": product["name"]
                },
                "unit_amount": int(product["price"] * 100)
            },
            "quantity": 1
        }],
        mode="payment",
        success_url="https://your-site.com/success",
        cancel_url="https://your-site.com/cancel"
    )

    query = orders.insert().values(
        product_id=product["id"],
        amount=product["price"],
        stripe_session_id=session.id
    )
    await database.execute(query)

    return {"checkout_url": session.url}

# Create database tables (if not exist)
metadata.create_all(engine)