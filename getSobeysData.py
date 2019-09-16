from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
# options.add_argument('--headless')
driver = webdriver.Chrome("./chromedriver", options=options)
wait = WebDriverWait

# driver.get ("https://www.sobeys.com/en/flyer/")
# iframe = wait(driver,10).until(EC.presence_of_element_located((By.ID, "flipp-iframe")))
# driver.switch_to.frame(iframe)
# ontarioFlyer = driver.find_element_by_xpath("//div[@class='other_flyer_runs_wrapper']//tbody/tr[1]")
# ontarioFlyer.click()
# print("clicked")
# time.sleep(2)
# gridView = wait(driver,10).until(EC.element_to_be_clickable((By.CLASS_NAME, "grid-view-label")))
# gridView.click()
# print("clicked")

driver.get("https://flyers.sobeys.com/flyers/sobeys-sobeysontario?flyer_run_id=372464&hide=special%2Cpub&locale=en&postal_code=N6B1A1&store_code=852&type=2")
time.sleep(2)
gridView = wait(driver,10).until(EC.element_to_be_clickable((By.CLASS_NAME, "grid-view-label")))
gridView.click()
print("clicked")
page_source = driver.page_source

with open('page.html', 'w') as f:
    f.write(page_source)

print("page.html exported for parsing...")
# Selenium hands off the correct page to Beautiful Soup for parsing
