from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample in-memory appointment data
appointments = []

@app.route("/")
def home():
    return "Welcome to Healthcare Appointment System!"

@app.route("/appointments", methods=["GET"])
def get_appointments():
    return jsonify(appointments)

@app.route("/appointments", methods=["POST"])
def book_appointment():
    data = request.get_json()
    appointments.append(data)
    return jsonify({"message": "Appointment booked!", "data": data}), 201

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
