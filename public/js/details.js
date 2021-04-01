window.addEventListener("load", function() {
    let id = sessionStorage.getItem("id");
    let urlDetails = `http://localhost:9000/posts/${id}`;
    let urlComments = urlDetails + '/comments/';

    //OUTPUT DB DATA FROM POST-ID
    getPostData(urlDetails, function(response) {
        let db = response;
        let getTitle = document.getElementById("title");
        let getAuthor = document.getElementById("author");
        let getDate = document.getElementById("date");
        let getText = document.getElementById("description");
        let getContent = document.getElementById("content");
        let getImage = document.getElementById("image_url");

        //DISPLAY THE DB IN THE HTML
        getTitle.innerHTML = `${db.title}`;
        getAuthor.innerHTML = `${db.author}`;
        getDate.innerHTML = `${db.date}`;
        getText.innerHTML = `${db.description}`;
        getContent.innerHTML = `${db.content}`;
        getImage.src = `${db.image_url}`;
    });

    //WHEN THE SUBMIT BUTTON IS CLIKED
    let form = document.getElementById("form");
    let name = document.getElementById("name");
    let postComment = document.getElementById("post_comment");
    let feedback_name = document.getElementById("feedback_name");
    let feedback_message = document.getElementById("feedback_message");
    form.addEventListener('submit', function(){
        let success = document.getElementById("send_success");
        let error = document.getElementById("error");
        let postDb = { name: name.value, comment: postComment.value};

        axios.post(urlComments, postDb)
        .then(function (response) {
            success.classList.remove("d-none");
            response.data;
            form.reset();
        })
        .catch(function (err) {
            error.classList.remove("d-none");
            console.log('Error:', err);
          } 
        );
    });

    //ON INPUT VALIDATION
    name.addEventListener('change', function() {
        validateInputs(name,feedback_name);
    });
    
    postComment.addEventListener('change', function() {
        validateInputs(postComment,feedback_message);
    });

    viewComments(urlComments, function(response) {
        let db = response;
        let referenceNode = document.querySelector('#comments_db');
        
        db.forEach(c => {
            let container = document.createElement("div");
            let getName = document.createElement("h5");
            let getComment = document.createElement("p");

            //The ClassName property gets and sets the value of the class atribute of the specified element
            container.className = "mt-4 text-capitalize";
            getName.className = "text-uppercase";
            
            //DISPLAY THE DB IN THE HTML
            getName.innerHTML = `${c.name}`;
            getComment.innerHTML = `${c.comment}`;

            referenceNode.appendChild(container);
            container.append(getName, getComment);
        });     
    });
});

//VALIDATE ALL INPUTS
function validateInputs(input,feedback){
    if (input.value.length <= 3) {
      input.classList.add("is-invalid");
    }else{
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedback.style.display = 'block';
    }
}

// SEND REQUEST
const getPostData = (url,callback) => {
    axios.get(url)
    .then(response => {
        callback(response.data);
    })
    .catch(error => console.error(error));
};

const viewComments = (url, callback) => {
    axios.get(url)
    .then(response => {
        callback(response.data);
    })
    .catch(error => console.error(error));
};

