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
            const email = document.getElementById('email_input').value;
            const password = document.getElementById('password_input').value;
            await register(email, password);
    
            // Here, we reset the input placeholder.
            document.getElementById('email_input').value = "";
            document.getElementById('password_input').value = "";
            document.location.reload();
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
        alert('Impossible to register. The email address may already be taken.');
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
