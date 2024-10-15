const form = document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('registration-form').addEventListener('submit',
        async function(event){
            event.preventDefault()

            const userName = document.getElementById('username').value.trim(); //Obtain username from html
            const email = document.getElementById('email').value.trim();//obtain email from html
            const password = document.getElementById('password').value.trim();//obtain passcode from html
            const feedbackDiv = document.getElementById('form-feedback');

            let isValid = true;
            let message = [];

            // Check username length (6-15 characters)
            if (userName.length < 6 || userName.length > 15) {
                message.push("Username must be between 6 and 15 characters.");
                isValid = false;
            }

            if (password.length < 8) {
                message.push('Password must be at least 8 characters long.');
                isValid = false;
            }

            if (email.length === 0) {
                message.push('Email cannot be empty.');
                isValid = false;
            }
    
            // Early exit if there are messages
            if (message.length > 0) {
                feedbackDiv.style.display = 'block';
                feedbackDiv.innerHTML = messages.join('<br>'); // Use '<br>' for line breaks
                feedbackDiv.style.color = '#dc3545';
                return false; // Stop further execution
            }

            try{

                //variables for awaiting inputs
            const isUserNameValid = await ValidateUsername(userName);
            const isEmailValid = await validateEmail(email);
            const isPasswordValid = await validatePassword(password);
                
                //validate user name
            if (!isUserNameValid){
                message.push('Invalid username! Username must be 6-15 characters long, alphanumeric, and start with a letter.');
                isValid = false;
            }
            
            
            //validate email
            if (!isEmailValid){
                message.push('Invalid email address! Please enter a valid email format.');
                isValid = false;
            }

            
            //validate password
            if (!isPasswordValid) {
                message.push('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
                isValid = false;
            }

            }catch(error){
                feedbackDiv.textContent = "An error occurred during validation.";
                feedbackDiv.style.color = '#dc3545'; // Red color for errors
                feedbackDiv.style.display = 'block';
                return;
            }
            

            feedbackDiv.style.display= 'block';


            if (isValid){
                feedbackDiv.textContent="Registration successful";
                feedbackDiv.style.color = '#28a745';
            }else{
                feedbackDiv.innerHTML = messages.join('<br>');
                feedbackDiv.style.color = '#dc3545';
            }

            async function ValidateUsername(userName){

                try{
                    const fetchUserName = fetch('https://api.example.com/validate-username',{
                        method: 'POST',
                        body: JSON.stringify({ username: userName }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const data = await fetchUserName.json();
                    return data.isValid;
                }catch(error){
                    console.error("Error validating username:", error);
                    return false;
                }
            }

            async function validateEmail(email){
                try{
                    const fetchEmail = await fetch('https://api.example.com/validate-email',{
                        method: 'POST',
                        body: JSON.stringify({ email: email }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const data =await fetchEmail.json();
                    return data.isValid;
                }catch{
                    console.error("Error validating email:", error);
                    return false;
                }
            }

            async function validatePassword(password){
                try{
                    const fetchPassword = await fetch('https://api.example.com/validate-password',{
                        method: 'POST',
                        body: JSON.stringify({ password: password }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                    const data = await fetchPassword.json();
                    return data.isValid;
                }catch(error){
                    console.error("Error validating password:", error);
                    return false;
                }
            
            }

    })
})
