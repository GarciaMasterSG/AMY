from flask import Blueprint, render_template, redirect, session
from Front_end import read_arduino
import time

view = Blueprint("view", __name__)

@view.route("/")
def home():
    if "user_name" not in session:
        return redirect("/login")
    user_name = session.get("user_name")
    email = session.get("email")
    return render_template("index_en.html", user_name=user_name, email=email)