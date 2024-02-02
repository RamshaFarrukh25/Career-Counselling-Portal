import os
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

