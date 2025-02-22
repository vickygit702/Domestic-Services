from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/find-provider', methods=['POST'])

def find_provider():

    data = request.get_json()

    # Get user location as (lng, lat)
    user_location = np.array(data['userLocation']).reshape(1, -1)

    providers = data['providers']
    if not providers:
        return jsonify({"message": "No providers found"}), 400

    # Extract provider locations in (lng, lat) format
    provider_locations = np.array([p['location'] for p in providers])

    # Apply KMeans clustering with k=1 (find closest point)
    kmeans = KMeans(n_clusters=1, random_state=42, n_init=10)
    kmeans.fit(provider_locations)

    closest_index = np.argmin(np.linalg.norm(provider_locations - user_location, axis=1))
    nearest_provider = providers[closest_index]  # Get nearest provider details

    return jsonify({"nearestProvider": nearest_provider})


    
    # data = request.get_json(force=True)
    # user_location = np.array(data['userLocation'])
    # providers = data['providers']

    
    # provider_locations = np.array([p['location'] for p in providers])
    
    # kmeans = KMeans(n_clusters=len(providers), random_state=0, n_init=10).fit(provider_locations)

    # distances = np.linalg.norm(provider_locations - user_location, axis=1)
    # nearest_provider_index = np.argmin(distances)
    # nearest_provider = providers[nearest_provider_index]

    # return jsonify(nearest_provider)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
