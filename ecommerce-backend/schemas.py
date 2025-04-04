# File: ecommerce-backend/schemas.py
# Description: This file contains the Pydantic schemas used for data validation and serialization in the FastAPI application.
# It includes schemas for product details and order creation.

from pydantic import BaseModel

# Schema used to return product details in API responses
class Product(BaseModel):
    id: int
    name: str
    price: float

    class Config:
        orm_mode = True  # allows compatibility with SQLAlchemy result objects

# Schema used to receive data when someone places an order (via POST /checkout)
class OrderCreate(BaseModel):
    product_id: int
