from flask import Flask, request, jsonify , send_file
from flask_cors import CORS  # Import CORS from flask_cors
from flask_socketio import SocketIO, emit
import json  # This line imports the json module
from termcolor import colored
import time
from data_collector import collector


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
collector_instance = collector()

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
    image_path = 'media\img.png'  # Adjust the path as needed
    return send_file(image_path, as_attachment=True)

@app.route('/signup', methods=['POST'])
def signup():
    user_data = request.json
    print(user_data)  # For debugging
    # Here you can store data in JSON or CSV as needed
    store_user_data(user_data)
    return jsonify({'status': 'success', 'data': user_data})

def store_user_data(data):
    # Example of storing data in a JSON file
    import json
    with open('users.json', 'a') as f:
        json.dump(data, f)
        f.write('\n')  # Add newline for each new entry

# @app.route('/login', methods=['POST'])
# def login():
#     user_credentials = request.json
#     email = user_credentials['email']
#     password = user_credentials['password']
#     # Read the users.json file to check credentials
#     with open('users.json', 'r') as file:
#         users = file.readlines()
#         for user in users:
#             user_data = json.loads(user)
#             if user_data['email'] == email and user_data['password'] == password:
#                 return jsonify({'success': True, 'message': 'User is logged in.'})
#     return jsonify({'success': False, 'message': 'Login failed. Check your email and password.'})


@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    name:str = data.get('name')  # Ensure 'name' field is correctly extracted
    key_words:str = data.get('companyName')  # Ensure 'companyName' field is correctly extracted
    print(colored(data , "green"))
    # Emit a message to all connected clients
    socketio.emit('message', {'text': f"Received data: Name - {data['name']}, Company Name - {data['companyName']}"})
    
    socketio.emit('message',{'text':'starting to fetch data !'})

    print(colored('PROCESSING' , "yellow"))
    
     
    data = collector_instance.collect(name ,key_words)
    print(colored(data,'red'))
    links:list = collector_instance.get_link(data)
    print(colored(links , 'yellow'))

 
        
    

    socketio.emit('message',{'text':'The data is stored in the mongoDB'})

    print(colored('data is stored . PROCESS COMPLETED ' , "green"))

    return jsonify({'links': links})

@app.route('/submit-checked-links', methods=['POST'])
def submit_checked_links():
    data = request.json
    checked_links = data.get('links', [])
    print(colored(f"Checked Links Received: {checked_links}", "green"))
    # Further processing can be added here
    return jsonify({'status': 'success', 'message': f'Received {len(checked_links)} links.'})

@app.route('/get-results', methods=['GET'])
def get_results():
    document_id = request.args.get('id')

    data = collector_instance.search_history(document_id)
    print(colored('loaded data using id ' , 'magenta'))
    return jsonify(data)

@app.route('/login', methods=['POST'])
def login():
    user_data = request.json
    email = user_data.get('email')
    google_id = user_data.get('googleId')
    print(colored(user_data, 'green'))
    # Assume a function to check or register the user
    if collector_instance.find_or_register_user_document(user_id= google_id):
        return jsonify({'success': True, 'message': 'User is logged in or registered.'})
    return jsonify({'success': False, 'message': 'Failed to log in or register.'})




if __name__ == '__main__':
    socketio.run( app , port=8080, debug=True)

