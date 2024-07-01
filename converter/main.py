import os
import re

# json regex to find all strings that end in .json" and start with "
json_regex = re.compile(b'"([a-z]*?)\.json"', re.MULTILINE)

os.chdir(os.path.dirname(__file__))
VERSION = b"1.4.4"

with open("data.js", "rb") as file:
    data = file.read()

renamed_scripts = {
    b"ovo-level-editor.js": b"ovoLevelEditor.js",
    b"websdkwrapper.js": b"webSDKWrapper.js",
    b"unlockalllevels.js": b"unlockAllLevels.js",
}
start = data.find(b'lzma.js')
end = data.find(b'"', start + 1)
scripts = data[start:end].split(b";")
fixed_scripts = [b"scripts/" + renamed_scripts.get(script, script).replace(b".js", b".min.js") for script in scripts]
data = data[:start] + b';'.join(fixed_scripts) + data[end:]

data = re.sub(json_regex, b'"projects/' + VERSION + b'/data/\\1.min.json"', data)

data = data.replace(b"style.css", b"styles/style.min.css")
data = data.replace(b"fonts.css", b"styles/fonts.min.css")

with open("output.js", "wb") as file:
    file.write(data)