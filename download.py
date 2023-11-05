# Selenium firefox

from selenium import webdriver
import chromedriver_autoinstaller
import threading
import urllib.request
import urllib.parse
import shutil
import os

chromedriver_autoinstaller.install()

URL = urllib.parse.urlparse("https://dedragames.com/games/ovo/CrashTest1.4.4b/")
OUTPUT_DIR = "versions/1.4.4b/"

driver = webdriver.Chrome()
driver.get(URL.geturl())

timings = []

if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)
os.mkdir(OUTPUT_DIR)

def download_file_process(url, path):
    print("Downloading", url, "to", path)
    urllib.request.urlretrieve(url, path)

def download_file(url, path):
    p = threading.Thread(target=download_file_process, args=(url, path))
    p.start()

while True:
    # get all requested files and put them in "files" dir
    new_timings = driver.execute_script("return window.performance.getEntriesByType('resource')")

    for timing in new_timings:
        if timing not in timings:
            timings.append(timing)
            url = urllib.parse.urlparse(timing["name"])
            path = OUTPUT_DIR + url.path[len(URL.path):]

            if url.netloc != URL.netloc:
                print("Skipping", timing["name"])
                continue

            # create dirs
            dirs = os.path.dirname(path)
            if dirs:
                os.makedirs(dirs, exist_ok=True)

            # download file
            print("Downloading", timing["name"], "to", path)
            # urllib.request.urlretrieve(timing["name"], path)
            download_file(timing["name"], path)