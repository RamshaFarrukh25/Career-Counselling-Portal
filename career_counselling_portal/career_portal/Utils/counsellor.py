import os
import shutil
from django.core.files.storage import FileSystemStorage

def makeDirectoy(path, name):
    path = os.path.join(path, name)
    os.mkdir(path)
    return path

def saveImage(path, requiredName, actualName, fileContent):
    extension = actualName.split('.')[-1]
    fileName = f"{requiredName}.{extension}"
    fs = FileSystemStorage(location=path)
    savedFile = fs.save(fileName, fileContent)
    fileUrl = fs.url(savedFile)
    return fileUrl

def deleteImage(path, name):
    path = os.path.join(path, name)
    os.remove(path)
    
    
def removeDirectory(path, name):
    path = os.path.join(path, name)
    try:
        shutil.rmtree(path)
        print(f"Directory '{path}' and its contents successfully removed.")
    except OSError as e:
        print(f"Error: {e}")


