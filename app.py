#Main.py
from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo # type: ignore
from openai import OpenAI
import os

os.environ["OPENAI_API_KEY"] = "sk-proj-NLuWxbOmiL5eeuvRgaeQT3BlbkFJ9NrSjgDVRkgjHDiUX9Xl"
client = OpenAI()

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://chatbot:Rasp%4012@chatbot.gpcs8iy.mongodb.net/chatbot"
mongo = PyMongo(app)

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    print(myChats)
    return render_template("index.html", myChats = myChats)

@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        print(request.json)
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        print(chat)
        if chat:
            data = {"question": question, "answer": f"{chat['answer']}"}
            return jsonify(data)
        else:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo-0125",
                messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": question}])
            print(response)
            answer = response.choices[0].message.content
            data = {"question": question, "answer": answer}
            mongo.db.chats.insert_one({"question": question, "answer": answer})
            return jsonify(data)
    data = {"result": "Thank you! I'm just a machine learning model designed to respond to questions and generate text based on my training data. Is there anything specific you'd like to ask or discuss? "}

    return jsonify(data)
