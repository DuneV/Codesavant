import os
import requests
import json
import openai

openai.api_key = "API_KEY"
openai.api_base = "https://cog-r64zdcyjshwjk.openai.azure.com/"
openai.api_type =  'azure'
openai.api_version = '2023-05-15'
model_name = 'gpt-35-turbo-mic'
model_name2 = 'davinci'
model_name3 = 'embedding'
chat_gpt = "chat"

response = openai.Completion.create(
    engine = 'chat',
    prompt = "Escribe un código que sume dos numeros en python",
    max_tokens=100,
    n=1,
    stop=None,
    temperature=0.5,
)