async function start() {
    // We create an event listener on the 'send' button.
    try {
        isLogged = await isLogged(localStorage.getItem("token"));
    } catch {
        console.log("You are not connected.");
        document.getElementById("part_not_log").style.display = "block";
        return;
    }

    let users = await getUsers(localStorage.getItem("token"));
    let tableId = document.getElementById('users_table');

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
    document.getElementById("part_log").style.display = "block";
    document.getElementById('logout_button').onclick = () => {
        window.localStorage.clear();
        document.location.reload()
    };
}

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

start();