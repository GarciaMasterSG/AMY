from flask import Blueprint, jsonify
import Front_end.read_arduino as arduino

historial = Blueprint("historial", __name__)

@historial.route("/lastTemperatures")
def getLastTemperatures():
    return jsonify({"lastTemperatures" : arduino.temperaturesRegister, "lastHumidities" : arduino.humidityRegister, "lastTimes" : arduino.watch})

