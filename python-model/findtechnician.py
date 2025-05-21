from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/find-technicians', methods=['POST'])
def find_technicians():
    data = request.get_json()
    user_location = np.array(data['userLocation']).reshape(1, -1)
    technicians = data['technicians']
    if not technicians:
        return jsonify({"message": "No technicians found"}), 400

    technicians_locations = np.array([p['location'] for p in technicians])
    kmeans = KMeans(n_clusters=1, random_state=42, n_init=10)
    kmeans.fit(technicians_locations)

    closest_index = np.argmin(np.linalg.norm(technicians_locations - user_location, axis=1))
    details = technicians[closest_index]
    return jsonify(details)

if __name__ == '__main__':
    app.run()
