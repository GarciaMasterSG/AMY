from flask import Blueprint, jsonify
import Front_end.read_arduino as arduino

data = Blueprint("data", __name__)

@data.route("/data")
def getData():
    return jsonify({"temperature" : arduino.temperature, "humidity" : arduino.humidity})