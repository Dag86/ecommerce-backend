# This file defines the database models for the application using SQLAlchemy.
# It includes the Product and Order tables with their respective columns.

from sqlalchemy import Table, Column, Integer, String, Float, MetaData

# Use the same metadata object from database.py
metadata = MetaData()

# Product Table
products = Table(
    "products",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("price", Float),
)

# Order Table
orders = Table(
    "orders",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("product_id", Integer),
    Column("amount", Float),
    Column("stripe_session_id", String(255))
)
