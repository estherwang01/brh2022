from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrome()

driver.get("https://www.concertarchives.org/bands/harry-styles")

cities_list = []
table = driver.find_element(By.ID, "band-show-table-condensed")
for row in table.find_elements(By.TAG_NAME, 'tr'):
    for cell in row.find_elements(By.TAG_NAME, 'a'):
        if cell.get_attribute("href") != None:
          url = cell.get_attribute("href")
          if url.find("/locations/") != -1 and len(cell.text) > 0:
            cities_list.append(cell.text)

print(cities_list)

driver.quit()