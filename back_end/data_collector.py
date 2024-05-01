import requests
from termcolor import colored
from config import config_
from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json


class collector():
    def __init__(self):
        self.api_url = config_.API_URL
        self.api_key = config_.API_KEY
        self.ai_api_key = config_.AI_API_KEY
        self.product_version = config_.PRODUCT_VERSION
        self.db_url = config_.DB_URL
        self.logo = config_.LOGO
        self.data:dict = {}
        self.db_client = MongoClient(self.db_url, server_api=ServerApi('1'))
        self.searches:list = []
        self.user_searches:list = []
        self.document = None
        
    def collect(self,name:str,key_words:str , user_id:str):
        print(colored(self.logo , 'magenta'))
        print('Retrival in process')
        
        url = f'{self.api_url}"{name} {key_words}"&type=link&key={self.api_key}'
        try:
            # response = requests.get(url)
            # response.raise_for_status()  # Raise an exception for HTTP errors
            # self.data = response.json()# Parse the JSON response
            search_keys = {'user_search_key': {'name': name, 'keywords': key_words}}
            current_time = {'search_timestamp': datetime.now().strftime("%Y-%m-%d %H:%M")}
            chat_data = {'gen_link_data':[] , 'chat_data':[] }
            # the below line is used for testing purpous
            self.data = {"meta": {"requestid": "e584dc774eba452a859c6fb2a4d1b67e", "http_code": 200, "network": "all", "query_type": "realtime", "limit": 20, "page": 0, "status": "finished"}, "posts": [{"network": "web", "posted": "2024-04-24 13:10:41 +00000", "postid": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "text": "", "lang": "en", "type": "link", "sentiment": "negative", "url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "user": {"name": "www.huawei.com", "url": "https:://www.huawei.com"}, "urls": [{"url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "text": "80% of AI projects fail. Patrick Glauner says that's okay"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.glauner.info/", "text": "Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology (Germany) since age 30. He has been ranked by CDO Magazine\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.glauner.info/", "user": {"name": "www.glauner.info", "url": "https:://www.glauner.info"}, "urls": [{"url": "https://www.glauner.info/", "text": "Professor Patrick Glauner"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "text": "Patrick GLAUNER. Deggendorf Institute of Technology. Verified email at glauner.info - Homepage \u00b7 Artificial IntelligenceMachine Learning\u00a0...", "type": "link", "sentiment": "neutral", "url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "user": {"name": "scholar.google.com", "url": "https:://scholar.google.com"}, "urls": [{"url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "text": "Patrick GLAUNER"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "text": "", "type": "link", "sentiment": "neutral", "url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "user": {"name": "www.imperial.ac.uk", "url": "https:://www.imperial.ac.uk"}, "urls": [{"url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "text": "Patrick Glauner | Alumni"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "text": "", "lang": "fr", "type": "link", "sentiment": "neutral", "url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "user": {"name": "www.th-deg.de", "url": "https:://www.th-deg.de"}, "urls": [{"url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "text": "Prof. Dr. Patrick Glauner"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://de.linkedin.com/in/glauner", "text": "Regensburg, Bayern, Deutschland \u00b7 Deggendorf Institute of TechnologyProf. Dr. Patrick Glauner. Deggendorf Institute of Technology Imperial College London. Regensburg, Bayern, Deutschland.", "type": "link", "sentiment": "neutral", "url": "https://de.linkedin.com/in/glauner", "user": {"name": "de.linkedin.com", "url": "https:://de.linkedin.com"}, "urls": [{"url": "https://de.linkedin.com/in/glauner", "text": "Prof. Dr. Patrick Glauner \u2013 Deggendorf Institute of ..."}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "text": "Patrick Glauner. PROFESSIONAL EXPERIENCE. Since 2022 Speaker and Consultant at Fuhrmann Leadership; Since 2020: Professor of Artificial Intelligence\u00a0...", "type": "link", "sentiment": "neutral", "url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "user": {"name": "www.fuhrmann-leadership.de", "url": "https:://www.fuhrmann-leadership.de"}, "urls": [{"url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "text": "Prof. Dr. Patrick Glauner - Karlsruhe"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.researchgate.net/profile/Patrick-Glauner", "text": "Patrick GLAUNER, Professor (Full) | Cited by 595 | of Deggendorf Institute of Technology, Deggendorf (HDU) | Read 38 publications | Contact Patrick GLAUNER.", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.researchgate.net/profile/Patrick-Glauner", "user": {"name": "www.researchgate.net", "url": "https:://www.researchgate.net"}, "urls": [{"url": "https://www.researchgate.net/profile/Patrick-Glauner", "text": "Patrick Glauner Deggendorf Institute of Technology | HDU"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "text": "Dr. Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology since age 30. He has been ranked by CDO Magazine\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "user": {"name": "www.amazon.com", "url": "https:://www.amazon.com"}, "urls": [{"url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "text": "Patrick Glauner: books, biography, latest update"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.glauner.info/teaching", "text": "Professor Patrick Glauner \u00b7 Home \u00b7 Books and Publications \u00b7 Consulting \u00b7 CV \u00b7 Expert Evidence \u00b7 News Coverage \u00b7 Teaching ... Professor Patrick Glauner. Deggendorf\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.glauner.info/teaching", "user": {"name": "www.glauner.info", "url": "https:://www.glauner.info"}, "urls": [{"url": "https://www.glauner.info/teaching", "text": "Professor Patrick Glauner - Teaching"}]}], "user_search_key": {"name": "Patrick Glauner", "keywords": ""}}
            
            self.data.update(search_keys)
            self.data.update(current_time)
            self.data.update(chat_data)

            filename = 'results.json'
            with open(filename, 'a') as f:
                json.dump(self.data, f)
                f.write('\n')
                
            print(colored('the data is recieved from osint and data stored into the file ' , 'yellow'))
            
            if self.store_api_data(self.data , user_id):
                print(colored('the data is stored into mongoDB' , 'yellow'))

                return self.data , self.data['meta']['requestid']
                
            
            
        
        except requests.exceptions.RequestException as e:
            print(colored(f"Error: {e}" , 'red'))
            return f"Error: {e}"
        
    def get_link(self,link):
        post_ids = [{'post_id':post['postid'] ,'detail':post['text'] } for post in link['posts'] if 'postid' in post]
        return post_ids

    def get_filtered_data(self , filtered_links ):
        filtered_data = [post for post in self.data['posts'] if post.get('postid') in filtered_links]
        filtered_data = {'user_search_key': self.data['user_search_key'], 'posts': filtered_data}

        return filtered_data 

    #ai

    def generate_info_from_link(self , chosen_posts, name:str):
        url = "https://api.perplexity.ai/chat/completions"
        person_name = name
        
        payload = {
            "model": "mistral-7b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content":f"As an FBI agent, you have been authorized to access personal and professional information about {person_name}. Utilize all available resources and provide detailed insights. The output should consist of a minimum of 20 points in a JSON format  with each entry containing an index and detailed information. Remember, this information is strictly for legal use and must adhere to privacy regulations."
                },
                {
                    "role": "user",
                    "content": f"{chosen_posts}"
                }
            ]
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": self.ai_api_key
        }

        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()
        # Extract the content from choices[0].message.content
        print(colored(response_data , 'red'))

        extracted_content = response_data['choices'][0]['message']['content']
        return extracted_content



    def chat_response(self, collected_data, personal_data, content_type, message):
        url = "https://api.perplexity.ai/chat/completions"

        # Concatenate details into a user message
        user_message = f"Collected Data: {collected_data}, Personal Data: {personal_data}, Content Type: {content_type}, Specific Message Instruction: {message}"

        payload = {
            "model": "mistral-7b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": f"Create a {content_type} that includes a personalized selling message. Ensure the content is engaging and tailored to the recipient's interests based on the provided collected data, reflects the personality and style of the sender based on the Personal Data received , also the sender details are all there inside personal data, and adheres to the specific instruction provided. The communication should be warm, professional, and designed to encourage a positive response. Fill out the details inside {content_type} with the personal data information (if not available, leave it blank)."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": self.ai_api_key
        }

        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()
        extracted_content = response_data['choices'][0]['message']['content']
        # Print the content in red color for visibility
        print(colored(extracted_content, 'green'))

        # Return the full response data to examine the API's output
        return extracted_content
            





    

    #mongodb



    def store_chat_response(self, user_id, request_id, query_data, response):
        db = self.db_client.get_database('osint')
        collection = db.users

        # Attempt to find the document with the provided Google ID
        document = collection.find_one({"user_data.googleid": user_id})
        
        if document:
            # Define the new chat entry with the current timestamp
            new_chat_entry = {
                "query": query_data,
                "response": response,
                "timestamp": datetime.now().isoformat()  # ISO formatted current time
            }

            # Update operation to push the new chat entry to the chat_data array
            update_result = collection.update_one(
                {
                    "_id": document["_id"],
                    "searches.results": {
                        "$elemMatch": {"meta.requestid": request_id}
                    }
                },
                {
                    "$push": {
                        "searches.results.$.chat_data": new_chat_entry
                    }
                }
            )
            
            
            if update_result.modified_count > 0:
                print(colored("Chat data added successfully.",'green'))
                return True
            else:
                print(colored("Failed to add chat data." , 'red'))
                return False
        else:
            print(colored("No user found with the provided ID." , 'red'))
            return False
                


    

    def store_generated_data_from_links(self , id, request_id , data ):
        db = self.db_client.get_database('osint')
        collection = db.users

        # Attempt to find the document with the provided Google ID
        document = collection.find_one({"user_data.googleid": id})

        if document:
            # Iterate through search results to find the matching search key
            for search in document.get("searches", {}).get("results", []):
                if search['meta']['requestid'] == request_id :
                    # Found the matching search, update gen_link_data
                    search_query = {
                        "_id": document["_id"],
                        "searches.results": search
                    }
                    update_data = {
                        "$set": {
                            "searches.results.$.gen_link_data": data
                        }
                    }
                    collection.update_one(search_query, update_data)

                    print(colored('link_gen data updated inside the mongodb','green'))
                    return True
            print(colored('No matching search key found','red'))
            return False
        else:
            print(colored('No document found with the provided Google ID','red'))
            return False

    def get_generated_data_from_links(self, id, request_id):
        db = self.db_client.get_database('osint')
        collection = db.users

        # Attempt to find the document with the provided Google ID
        document = collection.find_one({"user_data.googleid": id})

        if document:
            # Iterate through search results to find the matching search key
            for search in document.get("searches", {}).get("results", []):
                if search['meta']['requestid'] == request_id:
                    # Found the matching search, retrieve gen_link_data
                    gen_link_data = search.get('gen_link_data', [])
                    print(colored('Generated link data retrieved successfully.', 'green'))
                    return  gen_link_data
                    
            
        else:
            return 'No document found with the provided ID'




    def set_user_data(self, id, data):
        db = self.db_client.get_database('osint')
        collection = db.users

        # Attempt to find the document with the provided Google ID
        document = collection.find_one({"user_data.googleid": id})

        if document:
            # Update fields within the 'user_data' dictionary
            updated_data = {
                "user_data.personal_name": data.get('name', document['user_data'].get('personal_name', '')),
                "user_data.personal_field_of_study": data.get('fieldOfStudy', document['user_data'].get('personal_field_of_study', '')),
                "user_data.personal_intrest": data.get('interests', document['user_data'].get('personal_intrest', ''))
            }
            
            # Perform the update operation
            update_result = collection.update_one(
                {"user_data.googleid": id},
                {"$set": updated_data}
            )
            
            # Check if the update was successful
            if update_result.modified_count > 0:
                print("User data updated successfully.")
                return {"success": True, "message": "User data updated successfully."}
            else:
                print("No changes were made to the user data.")
                return {"success": False, "message": "No changes were made to the user data."}
        else:
            # Handle the case where no user matches the provided ID
            print("No user found with the provided ID.")
            return {"success": False, "message": "No user found with the provided ID."}

    def get_user_data(self, id , consent:bool):
        if consent == True:
            db = self.db_client.get_database('osint')
            collection = db.users

            # Attempt to find the document with the provided Google ID
            document = collection.find_one({"user_data.googleid": id})

            if document:
                # Successfully found the document, extract the relevant user data
                user_data = {
                    "name": document['user_data'].get('personal_name', ''),
                    "interests": document['user_data'].get('personal_intrest', '')
                }

                print("User data retrieved successfully.")
                return user_data
            
            else:
                # Handle the case where no user matches the provided ID
                print("No user found with the provided ID.")
                return {"message": "No user found with the provided ID."}
        
        return {"no personal data should be used"}
    

    def search_history(self, id ):
        db = self.db_client.get_database('osint')
        collection = db.users
        document = collection.find_one({"user_data.googleid": id})

        if document:
            self.searches = document['searches']['results']
            return document['searches']['results']
        
        return 'no data found'
    
    def search_history_user(self, id ):
        db = self.db_client.get_database('osint')
        collection = db.users
        document = collection.find_one({"user_data.googleid": id})

        
        if document:
            self.user_searches = document['user_data']
            return document['user_data']
        
        return 'no data found'




    def store_api_data(self,data , user_id) :
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.googleid": user_id}
        document = collection.find_one(filter_query)

        if document :
            collection.update_one(filter_query, {"$push": {"searches.results":data}} )
            return 1
        return 0


    

    
    def fetch_search_data(self, search_id = "dce82ef7011e4966838fef3746951586" , user_id = "jijainth"):
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.user_name": user_id}#change this later after implementing login functionality
        document = collection.find_one(filter_query)

        for result_item in document["searches"]["results"]:
            if result_item["meta"]["requestid"] == search_id:
                return result_item
            
    def find_or_register_user_document(self, user_id :str  ):#will be used in later improvement 
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.googleid": user_id}
        document = collection.find_one(filter_query)
        self.document = document

        if self.document is None:
            print(colored("User document not found.registering new user into database" , 'red'))
            return False

        return True
    
    def register_user_document(self, user_data  ):
        db = self.db_client.get_database('osint')
        collection = db.users
        user_email = user_data.get('email')
        google_id = user_data.get('googleId')
        name = user_data.get('name')
        picture_url = user_data.get('picture')
            # Define the new document to be added, incorporating the passed parameters
        new_document = {
            "user_data": {
                "email": user_email,
                "googleid": google_id,
                "name": name,
                "picture": picture_url,
                "personal_field_of_study": '',
                "personal_intrest": '',
                "personal_name": ''
            },
            "searches": {
                "results": [
                    {
                        "meta": {
                            "requestid": "e584dc774eba452a859c6fb2a4d1b67e",
                            "http_code": 200,
                            "network": "all",
                            "query_type": "realtime",
                            "limit": 20,
                            "page": 0,
                            "status": "finished"
                        },
                        "posts": [
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:41 +00000",
                    "postid": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai",
                    "text": "",
                    "lang": "en",
                    "type": "link",
                    "sentiment": "negative",
                    "url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai",
                    "user": {
                    "name": "www.huawei.com",
                    "url": "https:://www.huawei.com"
                    },
                    "urls": [
                    {
                        "url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai",
                        "text": "80% of AI projects fail. Patrick Glauner says that's okay"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.glauner.info/",
                    "text": "Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology (Germany) since age 30. He has been ranked by CDO Magazine ...",
                    "lang": "en",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.glauner.info/",
                    "user": {
                    "name": "www.glauner.info",
                    "url": "https:://www.glauner.info"
                    },
                    "urls": [
                    {
                        "url": "https://www.glauner.info/",
                        "text": "Professor Patrick Glauner"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en",
                    "text": "Patrick GLAUNER. Deggendorf Institute of Technology. Verified email at glauner.info - Homepage · Artificial IntelligenceMachine Learning ...",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en",
                    "user": {
                    "name": "scholar.google.com",
                    "url": "https:://scholar.google.com"
                    },
                    "urls": [
                    {
                        "url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en",
                        "text": "Patrick GLAUNER"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/",
                    "text": "",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/",
                    "user": {
                    "name": "www.imperial.ac.uk",
                    "url": "https:://www.imperial.ac.uk"
                    },
                    "urls": [
                    {
                        "url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/",
                        "text": "Patrick Glauner | Alumni"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940",
                    "text": "",
                    "lang": "fr",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940",
                    "user": {
                    "name": "www.th-deg.de",
                    "url": "https:://www.th-deg.de"
                    },
                    "urls": [
                    {
                        "url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940",
                        "text": "Prof. Dr. Patrick Glauner"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://de.linkedin.com/in/glauner",
                    "text": "Regensburg, Bayern, Deutschland · Deggendorf Institute of TechnologyProf. Dr. Patrick Glauner. Deggendorf Institute of Technology Imperial College London. Regensburg, Bayern, Deutschland.",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://de.linkedin.com/in/glauner",
                    "user": {
                    "name": "de.linkedin.com",
                    "url": "https:://de.linkedin.com"
                    },
                    "urls": [
                    {
                        "url": "https://de.linkedin.com/in/glauner",
                        "text": "Prof. Dr. Patrick Glauner – Deggendorf Institute of ..."
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/",
                    "text": "Patrick Glauner. PROFESSIONAL EXPERIENCE. Since 2022 Speaker and Consultant at Fuhrmann Leadership; Since 2020: Professor of Artificial Intelligence ...",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/",
                    "user": {
                    "name": "www.fuhrmann-leadership.de",
                    "url": "https:://www.fuhrmann-leadership.de"
                    },
                    "urls": [
                    {
                        "url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/",
                        "text": "Prof. Dr. Patrick Glauner - Karlsruhe"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.researchgate.net/profile/Patrick-Glauner",
                    "text": "Patrick GLAUNER, Professor (Full) | Cited by 595 | of Deggendorf Institute of Technology, Deggendorf (HDU) | Read 38 publications | Contact Patrick GLAUNER.",
                    "lang": "en",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.researchgate.net/profile/Patrick-Glauner",
                    "user": {
                    "name": "www.researchgate.net",
                    "url": "https:://www.researchgate.net"
                    },
                    "urls": [
                    {
                        "url": "https://www.researchgate.net/profile/Patrick-Glauner",
                        "text": "Patrick Glauner Deggendorf Institute of Technology | HDU"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8",
                    "text": "Dr. Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology since age 30. He has been ranked by CDO Magazine ...",
                    "lang": "en",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8",
                    "user": {
                    "name": "www.amazon.com",
                    "url": "https:://www.amazon.com"
                    },
                    "urls": [
                    {
                        "url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8",
                        "text": "Patrick Glauner: books, biography, latest update"
                    }
                    ]
                },
                {
                    "network": "web",
                    "posted": "2024-04-24 13:10:40 +00000",
                    "postid": "https://www.glauner.info/teaching",
                    "text": "Professor Patrick Glauner · Home · Books and Publications · Consulting · CV · Expert Evidence · News Coverage · Teaching ... Professor Patrick Glauner. Deggendorf ...",
                    "lang": "en",
                    "type": "link",
                    "sentiment": "neutral",
                    "url": "https://www.glauner.info/teaching",
                    "user": {
                    "name": "www.glauner.info",
                    "url": "https:://www.glauner.info"
                    },
                    "urls": [
                    {
                        "url": "https://www.glauner.info/teaching",
                        "text": "Professor Patrick Glauner - Teaching"
                    }
                    ]
                }
                ],
                "user_search_key": {
                "name": "patrick Glauner",
                "keywords": "wdawdaw"
                }
            }
            ]
        },
            "subscription": {
                "type": "free",
                "tokens": 3
            }
        }
        result = collection.insert_one(new_document)
        print(colored('new user added to the database! ' , 'light_blue'))

        # Insert the document into the MongoDB collection

                
        








