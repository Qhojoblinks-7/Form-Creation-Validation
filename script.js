const form = document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('registration-form').addEventListener('submit',
        async function(event){
            event.preventDefault()

            const userName = document.getElementById('username').value; //Obtain username from html
            const email = document.getElementById('email').value;//obtain email from html
            const password = document.getElementById('password').value;//obtain passcode from html

            //variables for awaiting inputs
            const isUserNameValid = await ValidateUsername(userName.trim());
            const isEmailValid = await validateEmail(email.trim());
            const isPasswordValid = await validatePassword(password.trim());

            try{
                //validate user name
            if (!isUserNameValid){
                message.push('Invalid username! Username must be 6-15 characters long, alphanumeric, and start with a letter.');
                return false;
            }
            
            
            //validate email
            if (!isEmailValid){
                message.push('Invalid email address! Please enter a valid email format.');
                return false;
            }

            
            //validate password
            if (!isPasswordValid) {
                messages.push('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
                return false;
            }

            }catch(error){
                document.getElementById('form-feedback').textContent = "form not valid!";
            }
            

            alert('Form submitted successfully!');
            return true;

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
