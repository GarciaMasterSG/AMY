from flask import Blueprint, render_template, request, redirect, flash, session
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
import Front_end.gconfig as gconfig

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["GET", "POST"])
def login():
    try:
        if request.method == "POST":
            email = request.form.get("email")
            password = request.form.get("password")

            sql = "SELECT email, password, name FROM greenhouse_users WHERE email = %s"
            value = (email, )
            cursor = db.cursor()
            cursor.execute(sql,value)
            row = cursor.fetchone()
            cursor.close()

            if row == None:
                flash("Email didn't found")
                return redirect("/login")
        
            if check_password_hash(row[1], password):
                session["user_name"] = row[2]
                session["email"] = row[0]
                gconfig.email = row[0]
                return redirect("/")
            else:
                flash("Password is incorrect")
                return redirect("/login")
    except Exception as e:
        print(f"Ocurrio un error {e}")
        return redirect ("/login")
    
        


    return render_template("login.html")


@auth.route("/signup", methods=["GET", "POST"])
def signup():
    try :
        if request.method == "POST":
            name = request.form.get("user_name")
            email = request.form.get("email")
            password = request.form.get("password")

            hashed_password = generate_password_hash(password)

            sql = "INSERT INTO greenhouse_users(name, email,password) VALUES (%s, %s, %s)"
            values = (name, email, hashed_password)
            cursor = db.cursor()
            cursor.execute(sql, values)
            db.commit()
            cursor.close()
            return redirect("/login")
    except Exception as e:
        print(f"Ocurrio este error {e}")
        return redirect("/signup")

        

    return render_template("signup.html")

@auth.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return "", 204