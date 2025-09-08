import cv2
import numpy as np
from tensorflow.keras.models import load_model
from fastapi import UploadFile

# Load pre-trained FER model
model = load_model("app/models/emotion_model.h5")
emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

async def analyze_emotion(file: UploadFile):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face = cv2.resize(gray, (48, 48))
    face = face.astype("float32") / 255.0
    face = np.expand_dims(face, axis=0)
    face = np.expand_dims(face, axis=-1)

    predictions = model.predict(face)
    emotion = emotion_labels[np.argmax(predictions)]
    return emotion
