from flask import Flask, jsonify
import mysql.connector
# from Front_end.read_arduino import arduinoConnection, start_arduino_treat, threadingLastTemperatures, threadingLastHumidities
import time
import os
'''
if arduinoConnection():
    start_arduino_treat()
    threadingLastTemperatures()
    threadingLastHumidities() 
'''  

db = mysql.connector.connect(
    host = os.environ.get("DB_Host"),
    port = os.environ.get("DB_Port"),
    database = os.environ.get("DB_Database") ,
    user = os.environ.get("DB_Username"),
    password = os.environ.get("DB_Password")
    )

cursor = db.cursor()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "Amy_es_una_gata_odiosa"

    from .view import view
    from .auth import auth
    from .data import data
    from .storageData import historial
    from .email import sendEmail

    app.register_blueprint(data, url_prefix="/")
    app.register_blueprint(view, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(sendEmail, url_prefix="/")
    app.register_blueprint(historial, url_prefix="/")


    return app






