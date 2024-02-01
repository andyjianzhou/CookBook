import base64
import requests
import os
from dotenv import load_dotenv
import json
from operator import itemgetter
from pprint import pprint

load_dotenv()


def encode_image(image_path):
    with open(os.path.join(os.path.dirname(__file__), image_path), "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def complete(prompt, image):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
    }

    payload = {
        "model": "gpt-4-vision-preview",
        "temperature": 0,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt,
                    },
                ],
            }
        ],
        "max_tokens": 1000,
    }
    if image is not None:
        payload["messages"][0]["content"].append(
            {
                "type": "image_url",
                "image_url": {
                    "url": image,
                    "detail": "high",
                },
            },
        )

    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )

    try:
        response.raise_for_status()  # Check if the request was successful
        response_data = response.json()

        if 'choices' in response_data and response_data['choices']:
            content = response_data["choices"][0]["message"]["content"]
            pprint(content)
            return json.loads(content)
        else:
            print("No content in response")
            return None
    except requests.HTTPError as e:
        print(f"HTTP error occurred: {e}")
        return None
    except json.JSONDecodeError:
        print("The response is not a valid JSON.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None
    
def analyze_image(image):
    prompt = """
    Please analyze the receipt in the provided image. Identify the store name, each product listed along with its brand 
    (if the brand is not available, put 'null'), and the price of each product. If there is ANY food detected, lets say an apple, orange, then add it into a single array list. Else, make it an empty array. Make sure you only get the product, not the Subtotals, etc etc. Output the information in JSON format 
    with the following structure:
    {
    'store': '[store name]',
    'foods': '[food name]',
    'products': [
        {
            'product': '[product name]',
            'brand': '[brand or null]',
            'price': '[price]'
        },
        // additional products here,
    ],
    }
    Make sure that you output only valid JSON in the format above. Start your response with '{' and NOTHING else. Start your response with '{'.
    """
    response = complete(prompt, image)
    
    # Check the type of response and convert to Python dictionary if necessary
    if isinstance(response, str):
        response_dict = json.loads(response)
    elif isinstance(response, dict):
        response_dict = response
    else:
        print("Unexpected response format")
        return None

    print(response_dict)

    # Convert the dictionary back to a JSON string to return
    return json.dumps(response_dict)

if __name__ == "__main__":
    json_response = analyze_image("https://upload.wikimedia.org/wikipedia/commons/0/0b/ReceiptSwiss.jpg")

    if json_response:
        # Convert the JSON string back to a Python dictionary
        response_dict = json.loads(json_response)

        # Extract the store name
        store = response_dict.get('store')

        # Extract the list of products
        products = response_dict.get('products', [])

        # Iterate over each product and print its details
        for product in products:
            product_name = product.get('product')
            brand = product.get('brand', 'null')  # Default to 'null' if brand is not available
            price = product.get('price')
            foods = product.get('foods', [])

            print(f"Store: {store}, Product: {product_name}, Brand: {brand}, Price: {price}, Foods: {foods}")
    else:
        print("Failed to get a valid response.")