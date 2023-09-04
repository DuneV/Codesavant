from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/process-file', methods=['POST'])

def process_file():

    data = request.json
    file_content = data.get('content')
    print(file_content)

    return jsonify({'message': 'Archivo procesado correctamente'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)