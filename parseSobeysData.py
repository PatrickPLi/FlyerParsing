from bs4 import BeautifulSoup
import csv
import os

# Delete existing csv file if one exists
if os.path.exists("SobeysItems.csv"):
    os.remove("SobeysItems.csv")

# Open page.html created by getSobeysData.py (Selenium)
content = BeautifulSoup(open("./page.html"), "html.parser")

# List of rows for csv file
rows = []
firstRow = ["Store","Date","Item","Price","UnitType","Units"]
rows.append(firstRow)

items_selector = content.find_all('li', class_='item')
for item_selector in items_selector:
    itemName = item_selector.find('div', class_="item-name").get_text()
    if "Goat Cheddar" in itemName:
        print("Goattttt")
    itemPrice = item_selector.find('div', class_="item-price").get_text()
    unitType = "count"
    if "BUY" in itemPrice:
        continue
    itemPrice = itemPrice.strip()
    if len(itemPrice) < 1:
        continue
    units = "1"

    if itemPrice[0] == "$" or "/lb" in itemPrice or "/kg" in itemPrice:
        if "/" in itemPrice:
            idx = itemPrice.find("/")
            units = itemPrice[idx + 1:]
            if " " in units:
                unitsIdx = units.find(" ")
                unitType = units[:unitsIdx].strip()
            if "1234567890" not in units:
                units = "1"
            itemPrice = itemPrice[:idx-1].strip()    
    elif "/" in itemPrice:
        idx = itemPrice.find("/")
        units = itemPrice[:idx]
        itemPrice = itemPrice[idx + 1:].strip()
    translation_table = dict.fromkeys(map(ord, '¢'), None)
    itemPrice = itemPrice.translate(translation_table)
    translation_table = dict.fromkeys(map(ord, '\n'), " ")
    itemPrice = itemPrice.translate(translation_table)
    if len(itemPrice) < 1:
        continue
    if units[len(units) - 1] in "234567890":
        unitType = "count"
    print(itemName + ": " + itemPrice + "/" + units + " " + unitType)

    # Write to csv file
    row = ["testing", "9/12/2019", itemName, itemPrice, unitType, units]
    rows.append(row)

with open("SobeysItems.csv", mode="a") as f:
    writer = csv.writer(f)
    for row in rows:
        writer.writerow(row)