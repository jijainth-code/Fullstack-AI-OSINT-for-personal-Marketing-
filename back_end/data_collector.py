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
        self.product_version = config_.PRODUCT_VERSION
        self.db_url = config_.DB_URL
        self.logo = config_.LOGO
        self.data:dict = {}
        self.db_client = MongoClient(self.db_url, server_api=ServerApi('1'))
        self.searches:list = []
        self.document = None
        
    def collect(self,name:str,key_words:str):
        print(colored(self.logo , 'magenta'))
        print('Retrival in process')
        
        url = f'{self.api_url}"{name} {key_words}"&type=link&key={self.api_key}'
        try:
            # response = requests.get(url)
            # response.raise_for_status()  # Raise an exception for HTTP errors
            # self.data = response.json()# Parse the JSON response
            search_keys = {'user_search_key': {'name': name, 'keywords': key_words}}
            current_time = {'search_timestamp': datetime.now().strftime("%Y-%m-%d %H:%M")}
            # the below line is used for testing purpous
            self.data = {"meta": {"requestid": "e584dc774eba452a859c6fb2a4d1b67e", "http_code": 200, "network": "all", "query_type": "realtime", "limit": 20, "page": 0, "status": "finished"}, "posts": [{"network": "web", "posted": "2024-04-24 13:10:41 +00000", "postid": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "text": "", "lang": "en", "type": "link", "sentiment": "negative", "url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "user": {"name": "www.huawei.com", "url": "https:://www.huawei.com"}, "urls": [{"url": "https://www.huawei.com/en/media-center/multimedia/videos/2023/transform-talks-patrick-glauner-ai", "text": "80% of AI projects fail. Patrick Glauner says that's okay"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.glauner.info/", "text": "Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology (Germany) since age 30. He has been ranked by CDO Magazine\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.glauner.info/", "user": {"name": "www.glauner.info", "url": "https:://www.glauner.info"}, "urls": [{"url": "https://www.glauner.info/", "text": "Professor Patrick Glauner"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "text": "Patrick GLAUNER. Deggendorf Institute of Technology. Verified email at glauner.info - Homepage \u00b7 Artificial IntelligenceMachine Learning\u00a0...", "type": "link", "sentiment": "neutral", "url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "user": {"name": "scholar.google.com", "url": "https:://scholar.google.com"}, "urls": [{"url": "https://scholar.google.com/citations?user=Z8kbRT4AAAAJ&hl=en", "text": "Patrick GLAUNER"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "text": "", "type": "link", "sentiment": "neutral", "url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "user": {"name": "www.imperial.ac.uk", "url": "https:://www.imperial.ac.uk"}, "urls": [{"url": "https://www.imperial.ac.uk/alumni/alumni-stories/patrick-glauner/", "text": "Patrick Glauner | Alumni"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "text": "", "lang": "fr", "type": "link", "sentiment": "neutral", "url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "user": {"name": "www.th-deg.de", "url": "https:://www.th-deg.de"}, "urls": [{"url": "https://www.th-deg.de/en/Patrick-Glauner-Fakult%C3%A4t%20Angewandte%20Informatik-Professor:innen-2940", "text": "Prof. Dr. Patrick Glauner"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://de.linkedin.com/in/glauner", "text": "Regensburg, Bayern, Deutschland \u00b7 Deggendorf Institute of TechnologyProf. Dr. Patrick Glauner. Deggendorf Institute of Technology Imperial College London. Regensburg, Bayern, Deutschland.", "type": "link", "sentiment": "neutral", "url": "https://de.linkedin.com/in/glauner", "user": {"name": "de.linkedin.com", "url": "https:://de.linkedin.com"}, "urls": [{"url": "https://de.linkedin.com/in/glauner", "text": "Prof. Dr. Patrick Glauner \u2013 Deggendorf Institute of ..."}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "text": "Patrick Glauner. PROFESSIONAL EXPERIENCE. Since 2022 Speaker and Consultant at Fuhrmann Leadership; Since 2020: Professor of Artificial Intelligence\u00a0...", "type": "link", "sentiment": "neutral", "url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "user": {"name": "www.fuhrmann-leadership.de", "url": "https:://www.fuhrmann-leadership.de"}, "urls": [{"url": "https://www.fuhrmann-leadership.de/en/berater/prof-dr-patrick-glauner/", "text": "Prof. Dr. Patrick Glauner - Karlsruhe"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.researchgate.net/profile/Patrick-Glauner", "text": "Patrick GLAUNER, Professor (Full) | Cited by 595 | of Deggendorf Institute of Technology, Deggendorf (HDU) | Read 38 publications | Contact Patrick GLAUNER.", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.researchgate.net/profile/Patrick-Glauner", "user": {"name": "www.researchgate.net", "url": "https:://www.researchgate.net"}, "urls": [{"url": "https://www.researchgate.net/profile/Patrick-Glauner", "text": "Patrick Glauner Deggendorf Institute of Technology | HDU"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "text": "Dr. Patrick Glauner is a Full Professor of Artificial Intelligence at Deggendorf Institute of Technology since age 30. He has been ranked by CDO Magazine\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "user": {"name": "www.amazon.com", "url": "https:://www.amazon.com"}, "urls": [{"url": "https://www.amazon.com/stores/Patrick%20Glauner/author/B086JYFRB8", "text": "Patrick Glauner: books, biography, latest update"}]}, {"network": "web", "posted": "2024-04-24 13:10:40 +00000", "postid": "https://www.glauner.info/teaching", "text": "Professor Patrick Glauner \u00b7 Home \u00b7 Books and Publications \u00b7 Consulting \u00b7 CV \u00b7 Expert Evidence \u00b7 News Coverage \u00b7 Teaching ... Professor Patrick Glauner. Deggendorf\u00a0...", "lang": "en", "type": "link", "sentiment": "neutral", "url": "https://www.glauner.info/teaching", "user": {"name": "www.glauner.info", "url": "https:://www.glauner.info"}, "urls": [{"url": "https://www.glauner.info/teaching", "text": "Professor Patrick Glauner - Teaching"}]}], "user_search_key": {"name": "Patrick Glauner", "keywords": ""}}
            request_id = self.data["meta"]["requestid"]
            self.data.update(search_keys)
            print(colored(current_time,'light_green'))
            self.data.update(current_time)

            filename = 'results.json'
            with open(filename, 'a') as f:
                json.dump(self.data, f)
                f.write('\n')
                
            print(colored('the data is recieved from osint and data stored into the file ' , 'yellow'))
            
            if self.store_api_data(self.data):
                print(colored('the data is stored into mongoDB' , 'yellow'))
                data = self.fetch_search_data(search_id=request_id)
                print(colored(data , 'cyan'))
                return data
        
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

    

    #mongodb

    def search_history(self, id ):
        db = self.db_client.get_database('osint')
        collection = db.users
        document = collection.find_one({"user_data.googleid": id})

        if document:
            self.searches = document['searches']['results']
            return document['searches']['results']
        
        return 'no data found'




    def store_api_data(self,data) :
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.user_name": "jijainth"}#change this later after implementing login functionality
        document = collection.find_one(filter_query)


        if document :
            collection.update_one(filter_query, {"$push": {"searches.results":data}} )
            return 1
        return 0

    def find_or_register_user_document(self, user_id = "109680984892289690141"):#will be used in later improvement 
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.googleid": user_id}
        document = collection.find_one(filter_query)
        self.document = document

        if self.document is None:
            print(colored("User document not found.Need to register" , 'red'))
            return False

        return True
    

    
    def fetch_search_data(self, search_id = "dce82ef7011e4966838fef3746951586" , user_id = "jijainth"):
        db = self.db_client.get_database('osint')
        collection = db.users
        filter_query = {"user_data.user_name": user_id}#change this later after implementing login functionality
        document = collection.find_one(filter_query)

        for result_item in document["searches"]["results"]:
            if result_item["meta"]["requestid"] == search_id:
                return result_item
            
        








