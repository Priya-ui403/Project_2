# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from models import User  # your SQLAlchemy User model
# from database import get_db  # your DB dependency
# from schemas import UserCreate, UserLogin  # your Pydantic schemas
# from passlib.context import CryptContext
# from datetime import datetime, timedelta
# from jose import JWTError, jwt  # Make sure python-jose is installed

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # JWT settings
# SECRET_KEY = "your-secret-key"  # Replace with a secure key in production
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "FastAPI backend is running"}

# # ✅ Must be added BEFORE any routes
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Frontend origin
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/signup")
# def signup(user: UserCreate, db: Session = Depends(get_db)):
#     existing_user = db.query(User).filter(User.email == user.email).first()
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed_password = pwd_context.hash(user.password)
#     new_user = User(
#         username=user.username,
#         email=user.email,
#         password=hashed_password
#     )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"message": "User registered successfully"}

# @app.post("/login")
# def login(user: UserLogin, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.email == user.email).first()
#     if not db_user or not pwd_context.verify(user.password, db_user.password):
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     access_token = create_access_token(
#         data={"sub": db_user.email},
#         expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     )
#     return {
#         "access_token": access_token,
#         "token_type": "bearer",
#         "username": db_user.username
#     }



from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import Prescription, User  # ✅ Make sure User is in models.py
from database import SessionLocal, get_db  # ✅ Ensure get_db is defined in database.py
from schemas import UserCreate, UserOut, UserLogin
from passlib.hash import bcrypt
from passlib.context import CryptContext  
import pytesseract
import numpy as np
import cv2
import shutil
import os
import re

app = FastAPI()

# Set Tesseract path (Windows only)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Entity extractor
def extract_entities(text):
    doctor = re.search(r'Dr\.?\s+[\w\s]+', text)
    date = re.search(r'\d{2}[/-]\d{2}[/-]\d{4}', text)
    patient = re.search(r'Patient\s*[:\-]?\s*([\w\s]+)', text)
    medicines = "\n".join([line.strip() for line in text.split('\n') if line.strip() and not line.lower().startswith("dr")])

    return {
        "doctor": doctor.group() if doctor else "Unknown",
        "date": date.group() if date else "Unknown",
        "patient": patient.group(1) if patient else "Unknown",
        "medicines": medicines
    }

# Test route
@app.get("/")
def read_root():
    return {"message": "Welcome to the Prescription OCR API"}

# ✅ Signup route
@app.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password
    hashed_password = bcrypt.hash(user.password)

    # Create new user
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/login")
def login(request: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not pwd_context.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful", "user_id": user.id, "username": user.username}

# ✅ OCR route
@app.post("/extract-text/")
async def extract_text(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        file_location = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        nparr = np.fromfile(file_location, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        text = pytesseract.image_to_string(gray)
        entities = extract_entities(text)

        prescription = Prescription(
            filename=file.filename,
            text=text,
            result="Under Investigation",
            doctor=entities['doctor'],
            date=entities['date'],
            patient=entities['patient'],
            medicines=entities['medicines'],
            user_id=1  # Replace later with actual user ID
        )
        db.add(prescription)
        db.commit()
        db.refresh(prescription)

        return {"success": True, "text": text, "data": entities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

