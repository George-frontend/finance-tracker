const API_URL = "http://localhost:5000";

const form = document.getElementById("signinForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},

            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        };
        
        window.location.href = "./profile.html";
    } catch (err) {
        alert("Server error");
    };    

});