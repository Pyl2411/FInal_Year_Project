from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client with your API key from environment variable
client = OpenAI(api_key=os.getenv("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"))

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"reply": "Please send a message"}), 400

    # Use OpenAI client here to create chat completion
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful AI career advisor."},
            {"role": "user", "content": user_message},
        ],
        max_tokens=200
    )

    reply = response.choices[0].message.content
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
