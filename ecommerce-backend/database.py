# ecommerce-backend/database.py
# This file contains the database connection and metadata setup for the FastAPI application.
# It uses SQLAlchemy and Databases for async database operations.


import databases
import sqlalchemy
import os
from dotenv import load_dotenv

# Load local env variables
load_dotenv()

# Get DB URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is missing!")

# Async DB interface for queries
database = databases.Database(DATABASE_URL)

# Metadata shared across models
metadata = sqlalchemy.MetaData()

# Sync engine for table creation and schema inspection
engine = sqlalchemy.create_engine(DATABASE_URL)