from flask import Blueprint, request, jsonify
from Front_end.read_arduino import whenNotify

sendEmail = Blueprint("sendEmail", __name__)

@sendEmail.route("/email", methods=["POST"])
def toEmail():
    data = request.json
    temp = float(data.get("temp"))

    if temp > 35 or temp < 8:
        whenNotify(temp)

    return jsonify({"status" : "ok"})