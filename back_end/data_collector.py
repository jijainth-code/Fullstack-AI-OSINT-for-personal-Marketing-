import requests
from termcolor import colored
from config import config_


class collector():
    def __init__(self):
        self.api_url = config_.API_URL
        self.api_key = config_.API_KEY
        self.product_version = config_.PRODUCT_VERSION
        self.logo = config_.LOGO
        self.data:dict = {}

        
    def collect(self,name:str,key_words:str):
        print(colored(self.logo , 'magenta'))
        print('Retrival in process')
        
        url = f'{self.api_url}"{name} {key_words}"&type=link&key={self.api_key}'
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors
            self.data = response.json()# Parse the JSON response
            search_keys = {'user_search_key': {'name': name, 'keywords': key_words}}
            self.data.update(search_keys)
            return self.data
        
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


        
    def test(self , name):
        return name
