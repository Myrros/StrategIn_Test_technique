// This function is called at the beginning and contains the event listeners.
// It also verifies whether the user is logged or not.
async function start() {

    // We try and call the 'isLogged' function, which sends a request to the "islogged" endpoint, that is used to verify whether the user is connected or not.
    try {
        await isLogged(localStorage.getItem("token"));
    } catch {
        console.log("You are not connected.");

        // If the user is not connected, we display the html part for not connected users.
        document.getElementById("part_not_log").style.display = "block";
        return;
    }

    // If the user is connected, we fetch the list of users.
    let users = await getUsers(localStorage.getItem("token"));
    let tableId = document.getElementById('users_table');

    // We fill the table with the users fetched.
    for (let user of users) {
        let newLine = document.createElement('tr');
        for (n of ["email", "_id"]) {
            Tmp = document.createElement('td');
            Tmp.textContent = user[n];
            Tmp.className = "border-2 border-black";
            newLine.appendChild(Tmp);
        }
        tableId.appendChild(newLine);
    }

    // We display the html part for connected users (the table of users).
    document.getElementById("part_log").style.display = "block";

    // If the user wants to log out, we clear the local storage and refresh the page.
    document.getElementById('logout_button').onclick = () => {
        window.localStorage.clear();
        document.location.reload()
    };
}

// This function fetches the './users' endpoint, that requires authentification and returns the list of all user's mail and ID.
async function getUsers(token) {
    let users;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: {
        authorization: 'Bearer ' + token
        }
    }).then(res => {
        console.log(res.data);
        users = res.data;
    });
    return users
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
