from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(100))

    prescriptions = relationship("Prescription", back_populates="user")

class Prescription(Base):
    __tablename__ = "prescriptions"


    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    text = Column(Text)
    doctor = Column(String(100))
    patient = Column(String(100))
    date = Column(String(50))
    medicines = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))

    # id = Column(Integer, primary_key=True, index=True)
    # filename = Column(String(255))
    # text = Column(Text)
    # result = Column(String(50))  # Real / Fake
    # user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="prescriptions")
