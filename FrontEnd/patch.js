// Javascript code to update a meme

// Function to display the pop-up for editing meme
function editMeme (id) {
    // set the id so that we can access the data in db
    document.getElementById("submit-edit")["data-id"] = id;
    document.querySelector('.bg-modal').style.display = "flex";
}

// Code for closing the pop-up window
const button = document.getElementById("closeButton");
button.onclick = function close() {
    document.querySelector('.bg-modal').style.display = "none";
}

// Function to make patch request to api
function patch() {
    // Form the request object
    let data_id = document.getElementById("submit-edit")["data-id"];
    let updated_caption = document.getElementById("floatingInput").value;
    let updated_url = document.getElementById("floatingPassword").value;

    // Handling if any position is not filled
    if (updated_caption === "" && updated_url === "") {
        window.alert("please fill atleast any of the field");
        return;
    }

    var req = JSON.stringify({"url": updated_url ,"caption": updated_caption});

    // posting the request to express backend to update the db
    const xhr_patch = new XMLHttpRequest();
    xhr_patch.open("PATCH", `http://localhost:8081/memes/${data_id}`, true);
    xhr_patch.setRequestHeader("Content-type", "application/json");
    xhr_patch.send(req);

    xhr_patch.onreadystatechange = function () {
        getMemeList();
        document.querySelector('.bg-modal').style.display = "none";
        document.getElementById("update-form").reset();
        return;
    };
}