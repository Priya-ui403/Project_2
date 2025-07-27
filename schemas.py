from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

class PrescriptionCreate(BaseModel):
    # Define the fields that should be in PrescriptionCreate
    doctor: str
    date: str
    patient: str
    medicines: str
    raw_text: str

class PrescriptionOut(PrescriptionCreate):
    # filename: str
    # text: str
    # result: str
    # user_id: int

    class Config:
        orm_mode = True