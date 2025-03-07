from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/find-technicians', methods=['POST'])

def find_technicians():

    data = request.get_json()

    # Get user location as (lng, lat)
    user_location = np.array(data['userLocation']).reshape(1, -1)

    technicians = data['technicians']
    if not technicians:
        return jsonify({"message": "No technicians found"}), 400

    # Extract provider locations in (lng, lat) format
    technicians_locations = np.array([p['location'] for p in technicians])

    # Apply KMeans clustering with k=1 (find closest point)
    kmeans = KMeans(n_clusters=1, random_state=42, n_init=10)
    kmeans.fit(technicians_locations)

    closest_index = np.argmin(np.linalg.norm(technicians_locations - user_location, axis=1))
    details = technicians[closest_index]  

    return jsonify( details)


    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
