# ecommerce-backend/models.py
# This file defines the database models for the e-commerce application.
# It uses SQLAlchemy to define the structure of the database tables.
# The models include a Product table and an Order table.    


from sqlalchemy import (
    Table, Column, Integer, String, Float, MetaData,
    ForeignKey, DateTime, func
)

# Shared metadata
metadata = MetaData()

# Product Table
products = Table(
    "products",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50), nullable=False),
    Column("price", Float, nullable=False),
)

# Order Table
orders = Table(
    "orders",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("product_id", Integer, ForeignKey("products.id"), nullable=False),
    Column("amount", Float, nullable=False),
    Column("stripe_session_id", String(255), nullable=False),
    Column("created_at", DateTime, server_default=func.now())  # Optional: useful for logs/audit
)
