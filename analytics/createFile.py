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
    aSize = 0
    pSize = 0
    dSize = 0
    fSize = 0
    addressSize = 1
    personSize = 1
    dwellingSize = 1
    feedbackSize = 1

    for key, value in data.items():
        if aSize < addressSize:
            aSize = addressSize
        if pSize < personSize:
            pSize = personSize
        if dSize < dwellingSize:
            dSize = dwellingSize
        if fSize < feedbackSize:
            fSize = feedbackSize

        addressSize = 1
        personSize = 1
        dwellingSize = 1
        feedbackSize = 1
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
                addressSize += 1
                adress_section_values_list.append(question)
            adressSectionSheet.append(adress_section_values_list)

        if value.get("personSection"):
            person_section_values_list = [value["CFN"]]
            person_section_values = value["personSection"].values()
            for page in person_section_values:
                for question in page.values():
                    personSize += 1
                    person_section_values_list.append(question)
            personSectionSheet.append(person_section_values_list)

        if value.get("dwellingSection"):
            dwelling_section_values_list = [value["CFN"]]
            dwelling_section_values = value["dwellingSection"].values()
            for question in dwelling_section_values:
                dwellingSize += 1
                dwelling_section_values_list.append(question)
            dwellingSectionSheet.append(dwelling_section_values_list)

        if value.get("feedbackSection"):
            feedback_section_values_list = [value["CFN"]]
            feedback_section_values = value["feedbackSection"].values()
            for question in feedback_section_values:
                feedbackSize += 1
                feedback_section_values_list.append(question)
            feedbackSectionSheet.append(feedback_section_values_list)

    dfFirtsSheet = pd.DataFrame(
        firtsSheet, columns=["ID ECN", "CFN", "State", "Completed Pages"]
    )

    dfAdressSectionSheet = pd.DataFrame(
        adressSectionSheet,
        columns=["CFN"] + [f"Q{i}" for i in range(1, aSize)],
    )

    dfPersonSectionSheet = pd.DataFrame(
        personSectionSheet, columns=["CFN"] + [f"Q{i}" for i in range(1, pSize)]
    )

    dfDwellingSectionSheet = pd.DataFrame(
        dwellingSectionSheet,
        columns=["CFN"] + [f"Q{i}" for i in range(1, dSize)],
    )

    dFfeedbackSectionSheet = pd.DataFrame(
        feedbackSectionSheet,
        columns=["CFN"] + [f"Q{i}" for i in range(1, fSize)],
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

    return excelPath, [aSize, pSize, dSize, fSize]
