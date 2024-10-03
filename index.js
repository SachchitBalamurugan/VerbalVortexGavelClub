// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR-Iy2PBZ8QX1q5sW44dQTDCfhj0YFcbk",
    authDomain: "un-sdg-bddcc.firebaseapp.com",
    projectId: "un-sdg-bddcc",
    storageBucket: "un-sdg-bddcc.appspot.com",
    messagingSenderId: "912540545037",
    appId: "1:912540545037:web:f3e56785be062c5c576544",
    measurementId: "G-CGX1L88HTD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_field(email) || !validate_field(password)) {
        alert("Email and Password cannot be empty");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Logged in successfully!");
            // Redirect to a different page if needed
            window.location.href = "dashboard.html"; // Example redirection
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
            console.error("Error signing in:", error);
        });
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validate_email(email) || !validate_password(password)) {
        alert("Email or Password format wrong");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            const user = auth.currentUser;
            const userData = {
                email: email,
                last_login: Date.now()
            };
            database.ref('users/' + user.uid).set(userData);
            alert('User Created');
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            console.error("Error creating user:", error);
        });
}

// Validation Functions
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6; // Firebase only accepts lengths greater than or equal to 6
}

function validate_field(field) {
    return field && field.length > 0; // Check if field is not null and has length
}
