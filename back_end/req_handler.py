from flask import Flask, request, jsonify , send_file
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes




store1 = 0


@app.route('/capture-data', methods=['POST'])
def capture_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the data and trigger the Python function

    print(data)

    # Use the global keyword to modify the global variable
    global store1
    store1 = data["key"]
    return jsonify(data)

@app.route('/get-captured-data', methods=['GET'])
def get_captured_data():
    # In this example, we'll just return a dummy processed data
    processed_data = store1*2
    return jsonify(processed_data)
    captured_data = process_data(data)
    return jsonify(captured_data)

def process_data(data):
    # Your Python function to process the data
    # Example: Print the data
    print("Captured Data:", data)
    return data

@app.route('/download-image', methods=['GET'])
def download_image():
    # Provide the path to your image file
    image_path = 'img.png'  # Adjust the path as needed
    return send_file(image_path, as_attachment=True)


if __name__ == '__main__':
    app.run(port=8080, debug=True)  # Run Flask on port 8080
