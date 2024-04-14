from ultralytics import YOLO
import numpy as np
import cv2  # Corrected import statement for OpenCV
import base64
import os
from ultralytics import YOLO

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, '../../MLmodels/best.pt')
model = YOLO(model_path)

def base64_to_image(base64_str):
    image_data = base64.b64decode(base64_str)
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return image

def preprocess_image(image_base64):    
    image = base64_to_image(image_base64)
    return image

def detect_fridge(file_path):
    image = preprocess_image(file_path)
    results = model(image)
    return results.pred[0].np().tolist()

def draw_image(image, results):
    for *xyxy, conf, cls in results:
        x1, y1, x2, y2 = map(int, xyxy)
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
    return image

if __name__ == "__main__":
    image = "./iC7HBvohbJqExqvbKcV3pP-970-80.jpg.webp"
    results = model(image)
    print(results)
    image = draw_image(image, results)
    print(image)
    
