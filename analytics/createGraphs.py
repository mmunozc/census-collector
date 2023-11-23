import pandas as pd
import matplotlib.pyplot as plt

# Por ahora, el método solo hace un gráfico de pastel con las respuestas de la Q1 de Person Section
def graph():
    # Cargo el excel
    excel_file = 'output.xlsx'
    sectionsSheet = 'Sections'
    adressSectionSheet = 'AdressSection'
    personSectionSheet = 'PersonSection'
    feedbackSection = 'FeedbackSection'
    dwellingSection = 'DwellingSection'

    def barplot(count_answers, title, xlabel, ylabel):
        plt.figure(figsize=(8,6))
        count_answers.plot(kind='bar', color='skyblue')
        plt.title(title)
        plt.xlabel(xlabel)
        plt.ylabel(ylabel)
        plt.xticks(rotation=0)
        plt.grid(axis='y')
        plt.tight_layout()
        plt.show()
    
    
    def pieplot(count_answers, title):
        plt.figure(figsize=(8,8))
        plt.pie(count_answers, labels=count_answers.index, autopct='%1.1f%%', startangle=140, colors=['skyblue', 'lightgreen'])
        plt.title(title)
        plt.axis('equal')
        plt.tight_layout()
        plt.show()
    

    def graph_Sections():
        data_adressSection = pd.read_excel(excel_file, sheet_name=sectionsSheet)
        columnCompletedPages = data_adressSection['Completed Pages']
        countState = data_adressSection['State'].value_counts()
        countCompletedPages = columnCompletedPages.value_counts()
        barplot(countState, 'Estados de los formularios', 'Estados', 'Frecuencia')
        barplot(countCompletedPages, 'Paginas completadas', 'Paginas', 'Frecuencia')

    def graph_AdressSection():
        data_adressSection = pd.read_excel(excel_file, sheet_name=adressSectionSheet)
        column_q3 = data_adressSection['Q3']
        count_column = column_q3.value_counts().sort_index()
        barplot(count_column, 'Cantidad de Personas que viven en el Hogar', 'Cantidad de Personas', 'Frecuencia')

    def graph_PersonSection():
        data_personSection = pd.read_excel(excel_file, sheet_name=personSectionSheet)

        for i in range(1,22):
            column = data_personSection[f'Q{i}']
            count_column = column.value_counts()
            pieplot(count_column, f'Person Section Q{i}')

    def graph_dwellingSection():
        data_personSection = pd.read_excel(excel_file, sheet_name=dwellingSection)

        for i in range(1,10):
            column = data_personSection[f'Q{i}']
            count_column = column.value_counts()
            pieplot(count_column, f'Dwelling Section Q{i}')
    
    def graph_feedbackSection():
        data_personSection = pd.read_excel(excel_file, sheet_name=feedbackSection)

        for i in range(1,3):
            column = data_personSection[f'Q{i}']
            count_column = column.value_counts()
            pieplot(count_column, f'Feedback Section Q{i}')

    graph_Sections()
    #graph_PersonSection()
    #graph_AdressSection()
    #graph_feedbackSection()
    #graph_dwellingSection()