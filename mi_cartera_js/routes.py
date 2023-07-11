from mi_cartera_js import app
from flask import render_template

@app.route("/")
def intex():
    return render_template("index.html")