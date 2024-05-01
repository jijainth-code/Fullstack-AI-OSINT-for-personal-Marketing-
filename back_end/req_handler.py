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




@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    user_id =data.get('userId')
    print(colored(user_id , 'red'))
    data = data.get('formData' , {})

    name:str = data.get('name')  # Ensure 'name' field is correctly extracted
    key_words:str = data.get('companyName')  # Ensure 'companyName' field is correctly extracted
    print(colored(data , "green"))
    # Emit a message to all connected clients
    socketio.emit('message', {'text': f"Received data: Name - {data['name']}, Company Name - {data['companyName']}"})
    
    socketio.emit('message',{'text':'starting to fetch data !'})

    print(colored('PROCESSING' , "yellow"))
    
     
    data , request_id = collector_instance.collect(name ,key_words , user_id)
    print(colored(f'data :{request_id}','red'))

    links:list = collector_instance.get_link(data)
    print(colored(links , 'yellow'))
    

    socketio.emit('message',{'text':'The data is stored in the mongoDB'})

    print(colored('data is stored . PROCESS COMPLETED ' , "green"))

    return jsonify({'links': links , 'requestId':request_id })



@app.route('/submit-checked-links', methods=['POST'])
def submit_checked_links():
    data = request.json
    checked_links = data.get('links', [])
    form_data = data.get('formData', {})
    user_id = data.get('userId')
    request_id = data.get('requestId')
    name = form_data['name']
    keyword = form_data['companyName']
    full_name = name + ' ' + keyword
    # print(colored(f"Form Data Received: {full_name}", "blue"))
    # print(colored(f"Checked Links Received: {checked_links}", "green"))
    # Further processing can be added here
    print(colored(f"userid Received: {user_id}", "green"))


    generated_data = collector_instance.generate_info_from_link(checked_links , full_name)

    if collector_instance.store_generated_data_from_links(user_id , request_id , generated_data ):
        socketio.emit('message',{'text':'gen_link_info data stored in the MongoDb'})


    # print(colored(generated_data , 'light_magenta'))
    return jsonify(generated_data)
    





@app.route('/get-results', methods=['GET'])
def get_results():
    document_id = request.args.get('id')

    data = collector_instance.search_history(document_id)
    print(colored('loaded data using id ' , 'magenta'))
    return jsonify(data)

@app.route('/get-results-user', methods=['GET'])
def get_results_user():
    document_id = request.args.get('id')

    data = collector_instance.search_history_user(document_id)
    print(colored(f'loaded data using id {document_id}' , 'magenta'))
    print(colored(data , 'blue'))
    return jsonify(data)

@app.route('/save-user-data', methods=['POST'])
def save_user_data():
    userId = request.args.get('id')
    values = request.get_json()

    if not userId:
        return jsonify({'error': 'No user ID provided'}), 400

    if not values:
        return jsonify({'error': 'No data provided'}), 400
    
    data = collector_instance.set_user_data(userId, values)
    print(colored(f"Data saved for user {userId}: {data}", 'red'))
    return jsonify({'success': True, 'data': data}), 200


    

@app.route('/login', methods=['POST'])
def login():
    user_data = request.json
    email = user_data.get('email')
    google_id = user_data.get('googleId')
    print(colored(user_data, 'green'))
    if collector_instance.find_or_register_user_document(user_id= google_id ):
        return jsonify({'success': True, 'message': 'User is logged in or registered.'})
    collector_instance.register_user_document(user_data)
    return jsonify({'success': True, 'message': 'New User Created ! '})


@app.route('/create-submit', methods=['POST'])
def create_data():
    data = request.json
    personal_data_consent = data.get('personalDataConsent', False)  # Checkbox state
    content_type = data.get('contentType', '')  # Selected item from the combo box
    message = data.get('message', '')  # Text from the textarea
    form_data = data.get('formData', {})
    name = form_data['name']
    keyword = form_data['companyName']
    user_id = data.get('userId', '')  # User ID if needed for further processing
    request_id = data.get('requestId')
    # Logging for debugging
    query_data = f"Message: {message} ,User ID: {user_id}, Request ID : {request_id} , Consent: {personal_data_consent}, Content Type: {content_type}" 
    print(colored(query_data , 'blue'))

    personal_data = collector_instance.get_user_data(user_id , personal_data_consent)
    generated_data = collector_instance.get_generated_data_from_links(user_id , request_id)
    # print(colored(personal_data,'yellow'))
    # print(colored(generated_data,'blue'))
    # print(colored(content_type,'green'))
    # print(colored('generating chat response','magenta'))
    response = collector_instance.chat_response(generated_data,personal_data , content_type , message )
    # print(colored(generated_data , 'yellow'))

    if collector_instance.store_chat_response(user_id , request_id , query_data , response):
        socketio.emit('message',{'text':f'{response}'})

        return jsonify({
            'status': 'success',
            'message': 'Data processed successfully',
                    }), 200

    return jsonify({
            'status': 'failed',
            'message': 'Failed to process data and store chat response.',
                    }), 200
    


    # chat_response = chat_response


    





    


if __name__ == '__main__':
    socketio.run( app , port=8080, debug=True)

