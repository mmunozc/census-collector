import json 

def readJson(filename):
    try:
        with open(filename, 'r') as file:
            jsonData = json.load(file)
        return jsonData
    except FileNotFoundError:
        print(f"El archivo {filename} no fue encontrado.")
        return None
    except json.JSONDecodeError as error:
        print(f"Hubo un error al decodificar el JSON en {filename}: {error}")
        return None
