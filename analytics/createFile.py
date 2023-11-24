import pandas as pd
import os


def createExcel(data, folder):
    if not os.path.exists(folder):
        os.mkdir(folder)

    firtsSheet = []
    adressSectionSheet = []
    personSectionSheet = []
    dwellingSectionSheet = []
    feedbackSectionSheet = []

    for key, value in data.items():
        firtsSheet.append(
            [
                key,
                value.get("CFN", ""),
                value.get("state", ""),
                value.get("completedPages", ""),
            ]
        )

        if value.get("adressSection"):
            adress_section_values_list = [value["CFN"]]
            adress_section_values = value["adressSection"].values()
            for question in adress_section_values:
                adress_section_values_list.append(question)
            adressSectionSheet.append(adress_section_values_list)

        if value.get("personSection"):
            person_section_values_list = [value["CFN"]]
            person_section_values = value["personSection"].values()
            for page in person_section_values:
                for question in page.values():
                    person_section_values_list.append(question)
            personSectionSheet.append(person_section_values_list)

        if value.get("dwellingSection"):
            dwelling_section_values_list = [value["CFN"]]
            dwelling_section_values = value["dwellingSection"].values()
            for page in dwelling_section_values:
                for question in page.values():
                    dwelling_section_values_list.append(question)
            dwellingSectionSheet.append(dwelling_section_values_list)

        if value.get("feedbackSection"):
            feedback_section_values_list = [value["CFN"]]
            feedback_section_values = value["feedbackSection"].values()
            for question in feedback_section_values:
                feedback_section_values_list.append(question)
            feedbackSectionSheet.append(feedback_section_values_list)

    dfFirtsSheet = pd.DataFrame(
        firtsSheet, columns=["ID ECN", "CFN", "State", "Completed Pages"]
    )

    addressKeys = list(data[list(data.keys())[0]]["adressSection"].keys())
    dfAdressSectionSheet = pd.DataFrame(
        adressSectionSheet, columns=["CFN"] + [f"{i}" for i in addressKeys]
    )

    personKeys = list(data[list(data.keys())[0]]["personSection"].keys())
    for page in list(data[list(data.keys())[0]]["personSection"].keys()):
        personKeys.append
    print()
    print(personKeys)
    print()
    dfPersonSectionSheet = pd.DataFrame(
        personSectionSheet, columns=["CFN"] + [f"{i}" for i in personKeys]
    )

    dwellingKeys = list(
        data[list(data.keys())[0]]["dwellingSection"][
            list(data[list(data.keys())[0]]["dwellingSection"].keys())[0]
        ].keys()
    )
    dfDwellingSectionSheet = pd.DataFrame(
        dwellingSectionSheet, columns=["CFN"] + [f"{i}" for i in dwellingKeys]
    )

    feedbackKeys = list(data[list(data.keys())[0]]["feedbackSection"].keys())
    dFfeedbackSectionSheet = pd.DataFrame(
        feedbackSectionSheet, columns=["CFN"] + [f"{i}" for i in feedbackKeys]
    )

    excelPath = os.path.join(folder, "stats.xlsx")
    with pd.ExcelWriter(excelPath, engine="xlsxwriter") as writer:
        dfFirtsSheet.to_excel(writer, sheet_name="Sections", index=False)
        dfAdressSectionSheet.to_excel(writer, sheet_name="AdressSection", index=False)
        dfPersonSectionSheet.to_excel(writer, sheet_name="PersonSection", index=False)
        dfDwellingSectionSheet.to_excel(
            writer, sheet_name="DwellingSection", index=False
        )
        dFfeedbackSectionSheet.to_excel(
            writer, sheet_name="FeedbackSection", index=False
        )

    return excelPath
