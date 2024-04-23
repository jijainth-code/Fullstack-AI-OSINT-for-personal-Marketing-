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

@app.route('/login', methods=['POST'])
def login():
    user_credentials = request.json
    email = user_credentials['email']
    password = user_credentials['password']
    # Read the users.json file to check credentials
    with open('users.json', 'r') as file:
        users = file.readlines()
        for user in users:
            user_data = json.loads(user)
            if user_data['email'] == email and user_data['password'] == password:
                return jsonify({'success': True, 'message': 'User is logged in.'})
    return jsonify({'success': False, 'message': 'Login failed. Check your email and password.'})


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
    
     
    # data = collector_instance.collect(name ,key_words)

    # links:list = collector_instance.get_link(data)
    # print(colored(links , 'yellow'))

    # filename = 'results.json'

    # with open(filename, 'a') as f:
    #     json.dump(data, f)
    #     f.write('\n')
    # links = ['https://de.linkedin.com/in/ssterjo', 'https://www.xing.com/profile/Stiv_Sterjo', 'https://www.credential.net/87a1d4e6-6da2-4f56-914c-6b4927abeb4e', 'https://contactout.com/Stiv-Sterjo-69071354', 'https://www.linkedin.com/posts/ssterjo_cloud-googlecloud-activity-6644140715393720320-xGgA', 'https://www.credential.net/8f76c16b-7a43-427b-bd0a-beabbfcd2ba7', 'https://www.scrum.org/user/321890']
    links = [{'post_id': 'https://de.linkedin.com/in/ssterjo', 'detail': 'München, Bayern, Deutschland · GoogleEhrenamt · Mentor for Foreign Students. MINGA Program, TUM. Feb. 2013 – Sept. 2013 8 Monaten. Education · IT Support & Event Planner. FRESSH (Euro-Socialist\xa0...'}, {'post_id': 'https://www.xing.com/profile/Stiv_Sterjo', 'detail': ''}, {'post_id': 'https://www.credential.net/87a1d4e6-6da2-4f56-914c-6b4927abeb4e', 'detail': 'A Professional Cloud Network Engineer implements and manages network architectures in Google Cloud. This individual may work on networking or cloud teams\xa0...'}, {'post_id': 'https://contactout.com/Stiv-Sterjo-69071354', 'detail': "View Stiv Sterjo's business profile as Consultant Data Analytics at Teradata. Get Stiv Sterjo's email: s****o@gmail.com, phone: (**) *** *** 410, and more."}, {'post_id': 'https://www.linkedin.com/posts/ssterjo_cloud-googlecloud-activity-6644140715393720320-xGgA', 'detail': "Stiv Sterjo's Post. View profile for Stiv Sterjo. Stiv Sterjo. Entrepreneur // Innovation Evangelist // Googler // Tech Leader // Author\xa0..."}, {'post_id': 'https://www.credential.net/8f76c16b-7a43-427b-bd0a-beabbfcd2ba7', 'detail': 'A Google Cloud Certified - Professional Cloud Architect enables organizations to leverage Google Cloud technologies. Through an understanding of cloud\xa0...'}, {'post_id': 'https://www.scrum.org/user/321890', 'detail': "Stiv Sterjo · Social Media · Stiv's Certifications · Classes Attended by Stiv · Footer Navigation · Footer."}]
    #comment links in real code

    socketio.emit('message',{'text':'The data is stored in results.json'})

    print(colored('data is stored . PROCESS COMPLETED ' , "green"))

    return jsonify({'links': links})

@app.route('/submit-checked-links', methods=['POST'])
def submit_checked_links():
    data = request.json
    checked_links = data.get('links', [])
    print(colored(f"Checked Links Received: {checked_links}", "green"))
    # Further processing can be added here
    return jsonify({'status': 'success', 'message': f'Received {len(checked_links)} links.'})



if __name__ == '__main__':
    socketio.run( app , port=8080, debug=True)