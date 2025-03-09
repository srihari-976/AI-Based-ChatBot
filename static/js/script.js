// script.js

// DOM Elements
const chatContainer = document.querySelector('.chat-container');
const messagesContainer = document.getElementById('messagesContainer');
const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');
const welcomeScreen = document.getElementById('welcomeScreen');
const chatScreen = document.getElementById('chatScreen');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const mobileMenu = document.getElementById('mobileMenu');
const sidebar = document.getElementById('sidebar');
const newChatButton = document.getElementById('newChatButton');

// State
let isDarkMode = false;
let isSoundEnabled = true;
let isTyping = false;

// Sound effects
const messageSound = new Audio('/static/sounds/message.mp3');
const sendSound = new Audio('/static/sounds/send.mp3');

// Theme handling
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Sound handling
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    soundToggle.classList.toggle('muted', !isSoundEnabled);
    localStorage.setItem('sound', isSoundEnabled ? 'on' : 'off');
}

// Mobile menu handling
function toggleMobileMenu() {
    sidebar.classList.toggle('open');
}

// Typing indicator
function showTypingIndicator() {
    if (!isTyping) {
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function hideTypingIndicator() {
    isTyping = false;
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Message handling
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    // Add timestamp
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Format code blocks if present
    const formattedContent = formatCodeBlocks(content);
    
    messageDiv.innerHTML = `
        ${formattedContent}
        <span class="timestamp">${timestamp}</span>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (isSoundEnabled) {
        (isUser ? sendSound : messageSound).play();
    }
}

// Code block formatting
function formatCodeBlocks(content) {
    // Replace code blocks with formatted HTML
    return content.replace(/```([\s\S]*?)```/g, (match, code) => {
        return `
            <div class="code-block">
                <button class="copy-button" onclick="copyCode(this)">Copy</button>
                <pre><code>${escapeHtml(code.trim())}</code></pre>
            </div>
        `;
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function copyCode(button) {
    const codeBlock = button.nextElementSibling.textContent;
    navigator.clipboard.writeText(codeBlock);
    
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000);
}

// API handling
async function postData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    } catch (error) {
        console.error("Error sending POST request:", error);
        throw error;
    }
}

// Event listeners
sendButton.addEventListener("click", async () => {
    const question = questionInput.value.trim();
    if (!question) return;
    
    // Clear input and show chat screen
    questionInput.value = "";
    welcomeScreen.style.display = "none";
    chatScreen.style.display = "block";
    
    // Add user message
    addMessage(question, true);
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get response from API
        const result = await postData("/api", { question });
        
        // Hide typing indicator and add bot message
        hideTypingIndicator();
        if (result && result.answer) {
            addMessage(result.answer);
        }
    } catch (error) {
        console.error("Error processing request:", error);
        hideTypingIndicator();
        addMessage("Sorry, I encountered an error. Please try again.");
    }
});

// Handle prompt buttons
document.querySelectorAll('.prompt-btn').forEach(button => {
    button.addEventListener('click', () => {
        questionInput.value = button.dataset.prompt;
        sendButton.click();
    });
});

// Handle chat history
document.querySelectorAll('.chat').forEach(chat => {
    chat.addEventListener('click', async () => {
        const question = chat.dataset.question;
        welcomeScreen.style.display = "none";
        chatScreen.style.display = "block";
        
        addMessage(question, true);
        showTypingIndicator();
        
        try {
            const result = await postData("/api", { question });
            hideTypingIndicator();
            if (result && result.answer) {
                addMessage(result.answer);
            }
        } catch (error) {
            console.error("Error processing request:", error);
            hideTypingIndicator();
            addMessage("Sorry, I encountered an error. Please try again.");
        }
    });
});

// Handle new chat button
newChatButton.addEventListener('click', () => {
    welcomeScreen.style.display = "block";
    chatScreen.style.display = "none";
    messagesContainer.innerHTML = '';
});

// Handle Enter key in input
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
    }
});

// Event listeners for theme and sound toggles
themeToggle.addEventListener('click', toggleTheme);
soundToggle.addEventListener('click', toggleSound);
mobileMenu.addEventListener('click', toggleMobileMenu);

// Initialize theme and sound from localStorage
document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
isDarkMode = localStorage.getItem('theme') === 'dark';
isSoundEnabled = localStorage.getItem('sound') !== 'off';
soundToggle.classList.toggle('muted', !isSoundEnabled);

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('hidden');
  });
});
