from getData import readJson
from createFile import createExcel
from createGraphs import graph


def main():
    folder = "stats"
    json_filename = "forms.json"
    data = readJson(json_filename)
    excelPath, sectionSizes = createExcel(data, folder)
    graph(folder, excelPath, sectionSizes)


if __name__ == "__main__":
    main()
