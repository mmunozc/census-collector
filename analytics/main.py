from getData import readJson
from createFile import createExcel
from createGraphs import graph

def main():
    json_filename = "forms.json"
    data = readJson(json_filename)
    
    createExcel(data)
    graph()




if __name__ == "__main__":
    main()
