import json
import requests


def readJson(filename):
    api_url = "https://vj0bqk5t-4000.use2.devtunnels.ms/"

    # Make a GET request
    response = requests.get(api_url)

    # Check if the request was successful (status code 200)
    if response.status_code >= 200 and response.status_code <= 209:
        # Print the response content (usually in JSON format for APIs)
        print(response.json())
        return response.json()
    else:
        try:
            with open(filename, "r") as file:
                jsonData = json.load(file)
            return jsonData
        except FileNotFoundError:
            print(f"El archivo {filename} no fue encontrado.")
            return None
        except json.JSONDecodeError as error:
            print(f"Hubo un error al decodificar el JSON en {filename}: {error}")
            return None
