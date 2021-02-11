// This function is written to provide html and css for a single meme
function getContent(object) {
    meme_post = `<div class="col-sm" style="margin: 20px;">`;
    meme_post += `<div class="card px-2 py-2" style="
    width: 330px;
    height: 440px;
  ">
    <img src=${object.url} style="align: center; height: 320px; width:320px" onerror="this.onerror=null; this.src='images.jpeg'" class="rounded float-start" alt="Image not found">
    <div class="card-body">
      <h5 class="card-title">Posted By : ${object.name}</h5>
      <p class="card-text">Caption : ${object.caption}</p>
      <button class="btn btn-primary" type="submit" id=${object.id} onclick="editMeme(${object.id})">Edit Meme</button>
    </div>
  </div>
  </div>`

    return meme_post;
}

function getMemeList() {
    // Making a request to api to fetch latest 100 memes
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/memes", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        //console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            //console.log(typeof (this.response));
            let meme_array = JSON.parse(this.response);
            meme_array.reverse();
            let meme_posts = `<div class="card text-center">`;
            // making each row with max three memes
            for (let i = 0; i < meme_array.length; i += 3) {
                meme_posts += `<div class="container"><div class="row">`
                if (i < meme_array.length) {
                    let object = meme_array[i];
                    meme_posts += getContent(object);
                }

                if (i + 1 < meme_array.length) {
                    let object = meme_array[i + 1];
                    meme_posts += getContent(object);
                }

                if (i + 2 < meme_array.length) {
                    let object = meme_array[i + 2];
                    meme_posts += getContent(object);
                }

                meme_posts += `</div></div></div>`;
            }

            //console.log(meme_posts);
            document.getElementById("display-container").innerHTML = meme_posts;
        } else {
            document.getElementById("display-container").innerHTML = this.status + this.statusText + "<h1>Sorry!! Server Crashed We are looking into it. Keep Refreshing the page<h1>";
        }
    }

    return;
}

function eventHandler(event) {
    event.preventDefault();
    // Get the input given by user
    var name = document.getElementById("owner_name").value;
    var caption = document.getElementById("caption").value;
    var url = document.getElementById("meme_url").value;

    // forming request based on input given by user
    var req = JSON.stringify({ "id": 0, "name": name, "caption": caption, "url": url, "date": Date() });


    // posting the request to express backend
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/memes", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(req);
    //console.log("Post is called");
    // after the server is updated change the front-end
    xhr.onreadystatechange = function () {
        console.log(xhr.status);
        if (xhr.status == 200) {
            let response_object = JSON.parse(this.responseText);
            getMemeList();
            document.getElementById("meme-submission").reset();
            return;
        } else if (xhr.status == 404) {
            window.alert("Invalide URL !!! Please provide valid url.")
            xhr.abort();
        }
    };
}

const form_element = document.getElementById("meme-submission");
form_element.addEventListener("submit", eventHandler);