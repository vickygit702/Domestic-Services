from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/find-provider', methods=['POST'])

def find_provider():
    
    data = request.get_json(force=True)
    user_location = np.array(data['userLocation'])
    providers = data['providers']

    
    provider_locations = np.array([p['location'] for p in providers])
    
    kmeans = KMeans(n_clusters=len(providers), random_state=0, n_init=10).fit(provider_locations)

    distances = np.linalg.norm(provider_locations - user_location, axis=1)
    nearest_provider_index = np.argmin(distances)
    nearest_provider = providers[nearest_provider_index]

    return jsonify(nearest_provider)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
