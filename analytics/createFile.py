import pandas as pd

def createExcel(data):
    firtsSheet = []
    adressSectionSheet = []
    personSectionSheet = []
    dwellingSectionSheet = []
    feedbackSectionSheet = []

    for key, value in data.items():
        firtsSheet.append([key, value.get('CFN', ''), value.get('state', ''), value.get('completedPages', '')])

        if value.get('adressSection'):
            adressSectionSheet.append([value['CFN'], value['adressSection']['Q1'], value['adressSection']['Q2'], value['adressSection']['Q3']])

        if value.get('personSection'):
            personSectionSheet.append([value['CFN']] + [value['personSection'].get('Page1', {}).get(f'Q{i}', '') for i in range(1, 21)])

        if value.get('dwellingSection'):
            dwellingSectionSheet.append([value['CFN']] + [value['dwellingSection'].get('Page1', {}).get(f'Q{i}', '') for i in range(1, 10)])

        if value.get('feedbackSection'):
            feedbackSectionSheet.append([value['CFN']] + [value['feedbackSection'].get(f'Q{i}', '') for i in range(1, 4)])

    dfFirtsSheet = pd.DataFrame(firtsSheet, columns=['ID ECN', 'CFN', 'State', 'Completed Pages'])
    dfAdressSectionSheet = pd.DataFrame(adressSectionSheet, columns=['CFN'] + [f'Q{i}' for i in range(1, 4)])
    dfPersonSectionSheet= pd.DataFrame(personSectionSheet, columns=['CFN'] + [f'Q{i}' for i in range(1, 21)])
    dfDwellingSectionSheet = pd.DataFrame(dwellingSectionSheet, columns=['CFN'] + [f'Q{i}' for i in range(1, 10)])
    dFfeedbackSectionSheet = pd.DataFrame(feedbackSectionSheet, columns=['CFN'] + [f'Q{i}' for i in range(1, 4)])

    with pd.ExcelWriter('output.xlsx', engine='xlsxwriter') as writer:
        dfFirtsSheet.to_excel(writer, sheet_name='Sections', index=False)
        dfAdressSectionSheet.to_excel(writer, sheet_name='AdressSection', index=False)
        dfPersonSectionSheet.to_excel(writer, sheet_name='PersonSection', index=False)
        dfDwellingSectionSheet.to_excel(writer, sheet_name='DwellingSection', index=False)
        dFfeedbackSectionSheet.to_excel(writer, sheet_name='FeedbackSection', index=False)