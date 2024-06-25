// script.js

// Example POST method implementation:
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

// Add event listener to the send button
sendButton.addEventListener("click", async () => {
  try {
    // Get the question input value
    const questionInput = document.getElementById("questionInput").value;

    // Clear the question input
    document.getElementById("questionInput").value = "";

    // Show the right2 div and hide the right1 div
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";

    // Set the question in both right2 sections
    document.getElementById("question1").innerText = questionInput;
    document.getElementById("question2").innerText = questionInput;

    // Get the answer and populate it
    const result = await postData("/api", { question: questionInput });
    console.log("Response:", result); // Log the response to the console
    if (result && result.answer) {
      console.log("Answer:", result.answer); // Log the answer to the console
      document.getElementById("solution").innerHTML = result.answer; // Display the answer using innerHTML
    } else {
      console.error("No answer found in response:", result);
    }
  } catch (error) {
    console.error("Error processing request:", error);
  }
});

// Function to copy text from button to search box
function copyToSearchBox(buttonId) {
  // Get the text content of the button
  const buttonText = document.getElementById(buttonId).innerText;

  // Set the text content of the search box
  document.getElementById("questionInput").value = buttonText;
}

// Get all chat elements
const chatElements = document.querySelectorAll(".chat");

// Add event listener to each chat element
chatElements.forEach((chatElement) => {
  chatElement.addEventListener("click", async () => {
    // Get the question from the clicked chat
    const question = chatElement.querySelector("span").textContent;

    // Show the right2 div and hide the right1 div
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";

    // Set the question in both right2 sections
    document.getElementById("question1").innerHTML = question;
    document.getElementById("question2").innerHTML = question;

    // Get the answer and populate it
    const result = await postData("/api", { question });
    document.getElementById("solution").innerHTML = result.answer;
  });
});

// Add event listener to "New Chat" button
document.getElementById("newChatButton").addEventListener("click", () => {
  // Clear the right2 section
  document.getElementById("question1").innerHTML = "";
  document.getElementById("question2").innerHTML = "";
  document.getElementById("solution").innerHTML = "";

  // Show the right1 div and hide the right2 div
  document.querySelector(".right1").style.display = "block";
  document.querySelector(".right2").style.display = "none";
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('hidden');
  });
});
