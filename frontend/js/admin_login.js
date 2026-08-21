const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const API_URL = "http://https://parlour-backend-smg5.onrender.com";

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;


  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);


  try {

    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded"
        },

        body: formData
      }
    );


    const data = await response.json();


    if (!response.ok) {
      throw new Error(
        data.detail || "Login failed"
      );
    }


    // jwt saving to loc sess.
    localStorage.setItem(
      "access_token",
      data.access_token
    );


    // redr to dbrd
    window.location.href = "dashboard.html";


  } catch (error) {

    console.error("Login error:", error);

    loginMessage.textContent =
      error.message || "Unable to login.";

  }

});


