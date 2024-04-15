from ultralytics import YOLO
import numpy as np
import cv2  # Corrected import statement for OpenCV
import base64
import os
from ultralytics import YOLO

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, '../../MLmodels/best.pt')
model = YOLO(model_path)
# model = YOLO('yolov8s.pt') # delete this to test

def base64_to_image(base64_str):
    image_data = base64.b64decode(base64_str.split(',')[1])  # Ensure this handles data URI prefix
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Failed to decode image")
    return image


def preprocess_image(image_base64):    
    image = base64_to_image(image_base64)
    return image

def detect_fridge(file_path):
    image = preprocess_image(file_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = model(image)
    _, classes, names, _ = obtain_results(results)
    image = draw_detections(image, results)
    
    if not classes:
        return None
    return classes, names, image

def obtain_results(results):
    boxes = results[0].boxes.xyxy.tolist()
    classes = results[0].boxes.cls.tolist()
    names = results[0].names
    confidences = results[0].boxes.conf.tolist()

    # Iterate through the results
    for box, cls, conf in zip(boxes, classes, confidences):
        x1, y1, x2, y2 = box
        confidence = conf
        detected_class = cls
        name = names[int(cls)]
    
    return boxes, classes, names, confidences

def draw_detections(image, results):
    boxes = results[0].boxes.xyxy.tolist()
    classes = results[0].boxes.cls.tolist()
    names = results[0].names
    confidences = results[0].boxes.conf.tolist()
    print(classes, names)
    for box, cls, conf in zip(boxes, classes, confidences):
        x1, y1, x2, y2 = map(int, box)
        confidence = conf
        detected_class = cls
        class_name = names[int(cls)]

        # Draw the bounding box
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Put the label near the bounding box
        label = f"{class_name}: {confidence:.2f}"
        cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image

    

if __name__ == "__main__":
    
    image_path = "./test.jpg"
    image = cv2.imread(image_path)
    if image is None:
        print("Image not loaded correctly")
    else:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = model(image)
        drawn_image = draw_detections(image, results)
        cv2.imshow('Detections', drawn_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        
    
    
