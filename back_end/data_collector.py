import requests
from termcolor import colored
from config import config_

class collector():
    def __init__(self):
        self.api_url = config_.API_URL
        self.api_key = config_.API_KEY
        self.product_version = config_.PRODUCT_VERSION

        
    def collect(self,name:str,company:str):
        print('Retrival in process')
        
        url = f'{self.api_url}"{name} {company}"&type=link&key={self.api_key}'
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors
            data = response.json()  # Parse the JSON response
            return data
        except requests.exceptions.RequestException as e:
            print(colored(f"Error: {e}" , 'red'))
            return f"Error: {e}"
        
    def test(self , name):
        return name
