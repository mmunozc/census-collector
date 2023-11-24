import pandas as pd
import matplotlib.pyplot as plt
import os


# Por ahora, el método solo hace un gráfico de pastel con las respuestas de la Q1 de Person Section
def graph(folder, excel_file, sectionSizes):
    sectionsSheet = "Sections"
    adressSectionSheet = "AdressSection"
    personSectionSheet = "PersonSection"
    feedbackSection = "FeedbackSection"
    dwellingSection = "DwellingSection"

    def savePlot(plot, title, subfolder):
        os.makedirs(os.path.join(folder, subfolder), exist_ok=True)
        plot.savefig(os.path.join(folder, subfolder, f"{title}.png"))

    def barplot(count_answers, title, xlabel, ylabel, subfolder):
        plt.figure(figsize=(8, 6))
        count_answers.plot(kind="bar", color="skyblue")
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        plt.xticks(rotation=0)
        plt.grid(axis="y")
        plt.tight_layout()
        savePlot(plt, title, subfolder)
        # plt.show()
        plt.close()

    def pieplot(count_answers, title, subfolder):
        plt.figure(figsize=(8, 8))
        plt.pie(
            count_answers,
            labels=count_answers.index,
            autopct="%1.1f%%",
            startangle=140,
            colors=["skyblue", "lightgreen"],
        )
        plt.title(title)
        plt.axis("equal")
        plt.tight_layout()
        savePlot(plt, title, subfolder)
        # plt.show()
        plt.close()

    def graph_Sections():
        data_adressSection = pd.read_excel(excel_file, sheet_name=sectionsSheet)
        columnCompletedPages = data_adressSection["Completed Pages"]
        countState = data_adressSection["State"].value_counts()
        countCompletedPages = columnCompletedPages.value_counts()
        barplot(
            countState,
            "Estados de los formularios",
            "Estados",
            "Frecuencia",
            "Sections",
        )
        barplot(
            countCompletedPages,
            "Paginas completadas",
            "Paginas",
            "Frecuencia",
            "Sections",
        )

    def graph_AdressSection():
        data_adressSection = pd.read_excel(excel_file, sheet_name=adressSectionSheet)
        column_q3 = data_adressSection["Q3"]
        count_column = column_q3.value_counts().sort_index()
        barplot(
            count_column,
            "Cantidad de Personas que viven en el Hogar",
            "Cantidad de Personas",
            "Frecuencia",
            "Adress Section",
        )

    def graph_PersonSection():
        data_personSection = pd.read_excel(excel_file, sheet_name=personSectionSheet)

        for i in range(1, sectionSizes[1]):
            column = data_personSection[f"Q{i}"]
            count_column = column.value_counts()
            pieplot(count_column, f"Person Section Q{i}", "Person Section")

    def graph_dwellingSection():
        data_dwellingSection = pd.read_excel(excel_file, sheet_name=dwellingSection)

        for i in range(1, sectionSizes[2]):
            column = data_dwellingSection[f"Q{i}"]
            count_column = column.value_counts()
            pieplot(count_column, f"Dwelling Section Q{i}", "Dwelling Section")

    def graph_feedbackSection():
        data_feedbackSection = pd.read_excel(excel_file, sheet_name=feedbackSection)

        for i in range(1, sectionSizes[3]):
            column = data_feedbackSection[f"Q{i}"]
            count_column = column.value_counts()
            pieplot(count_column, f"Feedback Section Q{i}", "FeedBack Section")

    graph_Sections()
    graph_PersonSection()
    graph_AdressSection()
    graph_feedbackSection()
    graph_dwellingSection()
