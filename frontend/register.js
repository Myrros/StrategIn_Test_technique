// This function is called at the beginning and contains the event listeners.
// It also verifies whether the user is logged or not.
async function start() {

    // We try and call the 'isLogged' function, which sends a request to the "islogged" endpoint, that is used to verify whether the user is connected or not.
    try {
        await isLogged(localStorage.getItem('token'));
    } catch {
        console.log('You are not connected.');

        // If the user is not connected, we display the html part for not connected users and we prepare the register button.
        document.getElementById('part_not_log').style.display = "block";
        document.getElementById('register_button').onclick = async () => {
            console.log("ok 0");
            register_user();
    
            // Here, we reset the input placeholder.
            document.getElementById('email_input').value = "";
            document.getElementById('password_input').value = "";
        }
        return;
    }

    // If the user is connected, we display the html part for connected users (a link to the 'users' page and a log out button).
    document.getElementById("part_log").style.display = "block";

    // If the user wants to log out, we clear the local storage and refresh the page.
    document.getElementById('logout_button').onclick = () => {
        window.localStorage.clear();
        document.location.reload()
    };
}

function register_user() {
    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;

    // We check that the email is valide ( [x char]@[x char].[2-3 char] )
    if (!validate_email(email)) {
        swal("Account could not be created.", "Please enter a valid email.", "error");
        return;
    }

    // We check that the password is valid (8 char long, 1 letter uppercase, 1 lowercase, 1 number)
    if (!validate_password(password)) {
        swal("Account could not be created.", "Please enter a valid password (At least:\n-8 characters,\n-1 number,\n-1 lowercase letter,\n-1 uppercase letter.)", "error");
        return;
    }
    swal({
        title: "Account succesfully created !",
        type: "success"
    });

    // If both inputs are correct, we register the user.
    register(email, password);
}

// This function is used to check the email input using regex.
function validate_email(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return true;
    }
        return false;
}

// This function is used to check the password input using regex.
function validate_password(password) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=.*[A-Z])([\w|\W]{8,})$/.test(password))
    {
        return true;
    }
        return false;
}

// This function takes the information entered as inputs and create an account out of them.
// It will send a request to the 'register' endpoint.
async function register(email, password) {
    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            data: {
            email,
            password
            }
        }).then(res => {
            console.log(res.data);
        });
    } catch {
        swal("Impossible to register.", "The email address may already be taken.");
    };
};

// This function checks whether the user is logged in or not.
async function isLogged(token) {
    let islogged;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/islogged',
        headers: {
        authorization: 'Bearer ' + token
        }
    }).then(res => {
        console.log(res.data);
        islogged = res.data;
    });
    return islogged
}

// We can call the 'start' function.
start();
