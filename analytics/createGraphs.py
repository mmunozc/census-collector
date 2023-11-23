import pandas as pd
import matplotlib.pyplot as plt

# Por ahora, el método solo hace un gráfico de pastel con las respuestas de la Q1 de Person Section
def graph():
    # Cargo el excel
    excel_file = 'output.xlsx'
    adressSectionSheet = 'AdressSection'
    personSectionSheet = 'PersonSection'

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
    

    def graph_AdressSection():
        data_adressSection = pd.read_excel(excel_file, sheet_name=adressSectionSheet)
        column_q3 = data_adressSection['Q3']
        count_column = column_q3.value_counts().sort_index()
        barplot(count_column, 'Cantidad de Personas que viven en el Hogar', 'Cantidad de Personas', 'Frecuencia')

    def graph_PersonSection():
        # Leer el archivo y la hoja deseada
        data_personSection = pd.read_excel(excel_file, sheet_name=personSectionSheet)

        # Acceder a una columna específica
        column_q1 = data_personSection['Q1']
        # Filtrar las respuestas
        q1_si_no = data_personSection[data_personSection['Q1'].isin(['Si','No'])]
        # Total de valores en la columna
        count_column_q1 = column_q1.value_counts()

        # Crear un gráfico de pastel para ver las respuestas
        plt.figure(figsize=(8,8))
        plt.pie(count_column_q1, labels=count_column_q1.index, autopct='%1.1f%%', startangle=140, colors=['skyblue', 'lightgreen'])
        plt.title('Distribución de Respuestas "Sí" y "No" para Q1 en Person Section')
        plt.axis('equal')
        plt.tight_layout()
        plt.savefig('pastel_q1.png')    # Para guardar el gráfico generado como una imagen
        plt.show()


    graph_PersonSection()
    graph_AdressSection()