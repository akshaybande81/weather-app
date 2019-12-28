console.log("Client side javascript loaded");



let searchForm = document.querySelector("form");
let search = document.querySelector("input");
let msgOne = document.querySelector("#messageOne");
let msgTwo = document.querySelector("#messageTwo");
msgOne.textContent = "";
searchForm.addEventListener("submit", (e) => {
    msgOne.textContent = "Loading...";
    e.preventDefault();
    if (search.value) {
        let url = `http://localhost:3000/weather?address=${search.value}`;
        console.log(url, "url");
        fetch(url).then((response) => {
            return response.json().then((res) => {
                console.log(res);
                msgOne.textContent = `Weather: ${res.text ? res.text : res.error}`;
            })

        }).catch((err) => {
            console.log(err, "error");
            msgOne.textContent = res.error;
        })
    }
    else {
        console.log("You must enter some location");
        msgOne.textContent = "You must enter some location";
    }

})