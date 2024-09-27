import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'mysecretkey')
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:Root@localhost/formulario'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
