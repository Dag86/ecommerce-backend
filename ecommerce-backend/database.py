import databases           # Provides easy asynchronous support for database operations
import sqlalchemy          # SQLAlchemy is used for SQL abstraction and ORM functionality
import os                  # For accessing environment variables
from dotenv import load_dotenv  # To load environment variables from .env file

# Load environment variables from the '.env' file into the application's environment
load_dotenv()

# Get the database URL from the environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize asynchronous database connection
database = databases.Database(DATABASE_URL)

# Metadata instance to store table definitions and schemas
metadata = sqlalchemy.MetaData()

# Create a SQLAlchemy engine instance to manage connections to the database
engine = sqlalchemy.create_engine(DATABASE_URL)

# Create all tables defined in metadata (currently none defined yet)
metadata.create_all(engine)
