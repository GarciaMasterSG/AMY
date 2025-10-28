from flask import Flask, jsonify
import mysql.connector
from Front_end.read_arduino import arduinoConnection, start_arduino_treat, threadingLastTemperatures, threadingLastHumidities
import time

if arduinoConnection():
    start_arduino_treat()
    threadingLastTemperatures()
    threadingLastHumidities()
    

db = mysql.connector.connect(
    host = "sql7.freesqldatabase.com",
    port = "3306",
    database = "sql7804854" ,
    user = "sql7804854",
    password = "qdND4SGgvP")

cursor = db.cursor()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "Amy_es_una_gata_odiosa"

    from .view import view
    from .auth import auth
    from .data import data
    from .storageData import historial

    app.register_blueprint(data, url_prefix="/")
    app.register_blueprint(view, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(historial, url_prefix="/")


    return app






