import os
import subprocess

OPTIVORBIS_PATH = os.path.join(os.path.dirname(__file__), "bin", "optivorbis")
FFMPEG_PATH = "ffmpeg"

# loop through all directories and files in the current directory using os.walk and optimize all .ogg files

before_size = 0
after_size = 0

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".ogg"):
            print("Optimizing " + os.path.join(root, file))
            path = os.path.join(root, file)
            minified_path = path.replace(".ogg", "_minified.ogg")
            out_path = path.replace(".ogg", "_optimized.ogg")

            before_size += os.path.getsize(path)

            subprocess.call([FFMPEG_PATH, "-i", path, "-map_metadata", "-1", "-c:v", "copy", "-c:a", "copy", minified_path])
            subprocess.call([OPTIVORBIS_PATH, minified_path, out_path])

            after_size += os.path.getsize(out_path)

            os.remove(path)
            os.remove(minified_path)
            os.rename(out_path, path)

print("Optimization complete!")

before_size = round(before_size / 1000000, 3)
after_size = round(after_size / 1000000, 3)

print("Before: " + str(before_size) + " MB")
print("After: " + str(after_size) + " MB")
print("Saved: " + str(round((before_size - after_size) / before_size * 100, 3)) + "%")