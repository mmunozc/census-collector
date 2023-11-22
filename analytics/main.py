from getData import readJson
from createFile import createExcel

def main():
    json_filename = "forms.json"
    data = readJson(json_filename)
    
    createExcel(data)




if __name__ == "__main__":
    main()
