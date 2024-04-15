import base64
import requests
import os
from dotenv import load_dotenv
import json
from operator import itemgetter
from pprint import pprint

load_dotenv()

def complete(prompt):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
    }

    payload = {
        "model": "gpt-4-turbo",
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
    
def analyze_text(json_response):
    prompt = f"""
Please analyze the JSON format. {json_response}. It consists of ingredients and their measurements. However, you don't have to follow the measurements, and you can use the ingredients to generate a recipe. Make it as accurate as possible. If youu can't, you can add a FEW ingredients.
Please generate a recipe for a dish, and return your response ONLY in JSON format. Nothing else. Ensure that your recipe adheres to the following structure. Make sure it's a valid JSON structure. Be sure to add an EXISTING reference recipe link. Here is an example:
{{
    'title': 'samosas',
    'ingredients': [
        {{
            'name': 'potatoes',
            'measure': '2 cups'
        }},
        {{
            'name': 'onions',
            'measure': '1 cup'
        }}
    ],
    'description': 'Cut the potatoes into small cubes. Add minced garlic, minced onion, minced tomato, and minced green chili. Mix well. Heat a griddle or frying pan over medium heat. Place the samosas on the griddle and cook until golden brown on both sides. Reference: Add a reference link to the recipe.'
}}
"""
    pprint(prompt)
    response = complete(prompt)
    
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
    json_response = analyze_text("""
                                 {recipe_id: 'a12cf049-f8f4-4568-8428-6249abe486f3', title: 'New Recipe from Kitchen', description: 'Generated from kitchen inventory.', ingredients: Array(6), createdAt: '2024-04-15 10:41:03'}
createdAt
: 
"2024-04-15 10:41:03"
description
: 
"Generated from kitchen inventory."
ingredients
: 
Array(6)
0
: 
{name: 'Garlic', measure: ''}
1
: 
{name: 'Onion', measure: '1 item'}
2
: 
{name: 'Potato', measure: '2 items'}
3
: 
{name: 'Milk', measure: '2 cups'}
4
: 
{name: 'Oil', measure: '2 tbsp'}
5
: 
{name: 'Chicken breast', measure: '1 lb'}""")

    if json_response:
        # Convert the JSON string back to a Python dictionary
        response_dict = json.loads(json_response)
    
        title = response_dict.get('title')
        ingredients = response_dict.get('ingredients')
        description = response_dict.get('description')
        pprint(title)
        pprint(ingredients)
        pprint(description)
    else:
        print("Failed to get a valid response.")


# template = """Question: {question}: """
# prompt = PromptTemplate(template=template, input_variables=["question"])
    
# llm_chain = LLMChain(prompt=prompt, 
#                      llm=HuggingFaceHub(repo_id="flax-community/t5-recipe-generation", 
#                                     model_kwargs={"temperature": 0.3, "max_length": 512}))
    
# question = ', '.join(unique_names)
# recipe = llm_chain.run(question)