from database import Base, engine
from models import User, Prescription

print("Creating MySQL tables...")
Base.metadata.create_all(bind=engine)
print("Tables created.")
