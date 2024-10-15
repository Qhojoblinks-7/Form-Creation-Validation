document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registration-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve form values
        const userName = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const feedbackDiv = document.getElementById('form-feedback');

        let isValid = true; // Track form validity
        let messages = [];  // Collect error messages

        // Basic client-side validation
        // Username validation: Must be between 6 and 15 characters
        if (userName.length < 6 || userName.length > 15) {
            messages.push("Username must be between 6 and 15 characters.");
            isValid = false;
        }

        // Email validation: Must contain "@" and "."
        if (!email.includes('@') || !email.includes('.')) {
            messages.push("Email must contain both '@' and '.' characters.");
            isValid = false;
        }

        // Password validation: At least 8 characters
        if (password.length < 8) {
            messages.push('Password must be at least 8 characters long.');
            isValid = false;
        }

        // Early exit if basic validation fails
        if (!isValid) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545'; // Red color for errors
            return false; // Stop further execution
        }

        // Server-side validation (async)
        try {
            const isUserNameValid = await validateUsername(userName);
            const isEmailValid = await validateEmail(email);
            const isPasswordValid = await validatePassword(password);

            // Username validation via API
            if (!isUserNameValid) {
                messages.push('Invalid username! Username must be 6-15 characters long, alphanumeric, and start with a letter.');
                isValid = false;
            }

            // Email validation via API
            if (!isEmailValid) {
                messages.push('Invalid email address! Please enter a valid email format.');
                isValid = false;
            }

            // Password validation via API
            if (!isPasswordValid) {
                messages.push('Password must include an uppercase letter, a lowercase letter, a number, and a special character.');
                isValid = false;
            }

        } catch (error) {
            feedbackDiv.textContent = "An error occurred during validation.";
            feedbackDiv.style.color = '#dc3545'; // Red color for errors
            feedbackDiv.style.display = 'block';
            return;
        }

        // Display feedback after all validation
        feedbackDiv.style.display = 'block';
        if (isValid) {
            feedbackDiv.textContent = "Registration successful!";
            feedbackDiv.style.color = '#28a745'; // Green color for success
        } else {
            feedbackDiv.innerHTML = messages.join('<br>');
            feedbackDiv.style.color = '#dc3545'; // Red color for errors
        }
    });

    // Function to validate username via API
    async function validateUsername(userName) {
        try {
            const response = await fetch('https://api.example.com/validate-username', {
                method: 'POST',
                body: JSON.stringify({ username: userName }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            return data.isValid;
        } catch (error) {
            console.error("Error validating username:", error);
            return false;
        }
    }

    // Function to validate email via API
    async function validateEmail(email) {
        try {
            const response = await fetch('https://api.example.com/validate-email', {
                method: 'POST',
                body: JSON.stringify({ email: email }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            return data.isValid;
        } catch (error) {
            console.error("Error validating email:", error);
            return false;
        }
    }

    // Function to validate password via API
    async function validatePassword(password) {
        try {
            const response = await fetch('https://api.example.com/validate-password', {
                method: 'POST',
                body: JSON.stringify({ password: password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            return data.isValid;
        } catch (error) {
            console.error("Error validating password:", error);
            return false;
        }
    }
});
