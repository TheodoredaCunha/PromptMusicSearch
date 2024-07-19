from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from pymilvus import connections, Collection
from msclap import CLAP

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

connections.connect("default", host="localhost", port="19530")
collection = Collection('music_vector_db')
collection.load()  # Load the collection into memory
clap_model = CLAP(version = '2023', use_cuda=False)

search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10},
}


@app.route('/api/process-data', methods=['POST'])
def process_data():
    data = request.get_json()
    input_data = data.get('inputData', '')

    # Example processing (convert to uppercase)
    query_embeddings = list(clap_model.get_text_embeddings([input_data])[0])

    search_results = collection.search(
            data=[query_embeddings],
            anns_field="vector",
            param=search_params,
            limit=3,
            expr=None,
            output_fields=["filename"]
        )
    
    results = []

    for hit in search_results[0]:
        hit_split = hit.entity.get('filename').split('\\')
        title = '/gtzan/Data/genres_original/' + hit_split[-2] + '/' + hit_split[-1]

        results.append(title)

    return jsonify({'message': f'Result for songs from query: {input_data}', 'songs': results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)