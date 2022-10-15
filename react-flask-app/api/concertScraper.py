from selenium import webdriver
driver = webdriver.Chrome()

driver.get("https://www.concertarchives.org/bands/harry-styles")

table = driver.find_element("id", "band-show-table-condensed")
print(table)


driver.quit()