from mi_cartera_js import app
from flask import render_template, request
from mi_cartera_js.models import MovementDAOsqlite, Movement
import sqlite3

dao = MovementDAOsqlite(app.config["PATH_SQLITE"]) #si no encuentra la clave da un key error
#dao = MovementDAOsqlite(app.config.get["PATH_SQLITE"]) # si no encuentra la clave da un none 

@app.route("/")
def intex():
    return render_template("index.html")

@app.route("/api/v1/all")
def todos():
    try:
        movements = dao.get_all()
        response = {
            "is_ok": True,
            "data": movements
        }
        return response
    except sqlite3.Error as e:
        response = {
            "is_ok": False,
            "data": "Error en base de datos"
        }
        return response, 400
    
    

    
@app.route("/api/v1/insert", methods=["POST"])
def insert():
    try:
        movement = Movement(request.json.get("date"),
                            request.json.get("abstract"),
                            request.json.get("amount"),
                            request.json.get("currency"))
        dao.insert(movement)
        response = {
            "is_ok": True,
            "data": None
        }
        return response
    except ValueError as e:
        response = {
            "is_ok": False,
            "data": str(e)
        }
        return response, 400
    except sqlite3.Error as e:
        response = {
            "is_ok": False,
            "data": "Error en base de datos"
        }
        return response, 400
