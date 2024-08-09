# AI based Chatbot

AI based Chatbot is a web application built using Flask, MongoDB, HTML, Tailwind CSS, and JavaScript. It provides a platform for real-time communication and interaction with an AI-powered chatbot. This project is designed to facilitate collaborative work within a team environment, particularly aimed at groups working on projects together, such as in educational or small office settings.

## Deployed Application

🚀 **Check out the live version of AI Chatbot!** 🚀

[![Live Application](https://img.shields.io/badge/Live%20Application-Click%20Here-brightgreen)](https://ai-based-chat-bot.vercel.app/)


## Features

- **Chat Interface**: Interactive chat interface where users can input queries and receive responses from the AI chatbot.
  
- **Persistent Storage**: Chats are stored in MongoDB, allowing users to view past conversations and maintain continuity in discussions.
  
- **Deployment Ready**: Designed to be deployed on a Raspberry Pi, allowing team members to connect their devices to the same Wi-Fi network and access the chatbot application.

## Technologies Used

- **Flask**: Backend framework for handling HTTP requests and responses, as well as serving the web application.
  
- **MongoDB**: NoSQL database used for storing chat histories and managing data persistence.
  
- **HTML**: Markup language for structuring the frontend interface.
  
- **Tailwind CSS**: Utility-first CSS framework for styling the frontend components efficiently.
  
- **JavaScript**: Used for frontend interactivity and enhancing user experience.

## Deployment

To deploy this project on your Raspberry Pi or any other server, follow these steps:

1. **Clone the Repository**:
git clone <https://github.com/srihari-976/AI-Based-ChatBot.git>
cd AI-based-Chatbot


2. **Install Dependencies**:
pip install -r requirements.txt


3. **Set Up MongoDB**:
- Install MongoDB on your server.
- Configure MongoDB connection URI in the Flask application (`app.py`).

4. **Run the Application**:
python app.py


5. **Accessing the Application**:
- Open a web browser on any device connected to the same Wi-Fi network as your Raspberry Pi.
- Navigate to `http://<raspberry-pi-ip>:5000` (replace `<raspberry-pi-ip>` with the actual IP address of your Raspberry Pi).

## Contributing

Contributions to the AI based Chatbot project are welcome. Here's how you can contribute:

- Fork the repository.
- Create a new branch (`git checkout -b feature/improvement`).
- Make your changes.
- Commit your changes (`git commit -am 'Add new feature'`).
- Push to the branch (`git push origin feature/improvement`).
- Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by OpenAI's ChatGPT and similar AI-powered chatbot applications.
- Tailwind CSS for providing a streamlined approach to styling frontend components.

