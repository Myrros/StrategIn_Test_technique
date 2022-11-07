// This function is called at the beginning and contains all  event listeners.
async function start() {
    try {
        isLogged = await isLogged(localStorage.getItem("token"));
    } catch {
        console.log("You are not connected.");
        document.getElementById("part_not_log").style.display = "block";
        document.getElementById('login_button').onclick = async () => {
            const email = document.getElementById('email_input').value;
            const password = document.getElementById('password_input').value;
    
            // We send the event 'message' with the text entered by the user in data.
            await login(email, password);
    
            // Here, we reset the input placeholder.
            document.getElementById('email_input').value = "";
            document.getElementById('password_input').value = "";
            document.location.reload();
        }
        return;
    }

    // We create an event listener on the 'send' button.
    document.getElementById("part_log").style.display = "block";

    document.getElementById('logout_button').onclick = () => {
        window.localStorage.clear();
        document.location.reload()
    };
}

async function login(email, password) {
    try {
        await axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            data: {
                email,
                password
            }
        }).then(res => {
            console.log("Succesfully connected");
            localStorage.setItem("token", res.data.token);
        });
    } catch {
        alert('Impossible to log in. Please check your credentials.');
    };
};


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

// We call the start function in order to start listening to all events from the page.
start();