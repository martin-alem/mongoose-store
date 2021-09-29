const agent = (function(){

    function handleRequest(url, config){

        const init = {
            method: config["method"] || "GET",
            body: JSON.stringify(config["body"]),
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            mode: "same-origin"
        }

        return fetch(url, init);
    }

    return {
        handleRequest: handleRequest
    }
})();


/**
 * Handle the submission of the registration form
 */
(function(){

    // Get references to form elements
    const firstName = document.getElementById('first_name');
    const lastName = document.getElementById('last_name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submit = document.getElementById('submit');

    submit.addEventListener('click', handleSubmit);

    function validateFormFields(){
        //validate the input fields
        if(firstName.value !== "" && lastName.value !== "" && email.value !== "" && password.value !== ""){
            return true;
        }
        else{
           return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(validateFormFields()){
            const formDate = {"first_name": firstName, "last_name": lastName, "email": email, "password": password};
            config = {method: 'POST', body: formDate}
            agent.handleRequest("http://localhost:3000/signup", config)
                .then(response =>{
                    if(response.status){
                        response.json()
                            .then(data => console.log(data));
                    }
                })
                .catch(err =>{
                    console.error(err);
                })
            //disable submit button
            submit.setAttribute("disabled", "disabled");
            submit.textContent = "Please wait...";
        }else{
            alert("Please enter all required fields");
        }
    }

})();