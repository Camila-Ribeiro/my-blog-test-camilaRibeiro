
//GET ALL POSTS
// SEND REQUEST
const getPosts = () => {
  axios.get('http://localhost:9000/posts')
  .then(response => {
   const allPosts = response.data;
   populatePosts(allPosts);

  })
  .catch(error => console.error(error));
};

const populatePosts = (posts) => {
  let referenceNode = document.querySelector('#posts_db');

  //POSTS SORTED BY PUBLISH DATE FROM NEWEST FIRST
  sortByDate(posts);

  posts.forEach(db => {
    let cardElement = document.createElement("div");
    let postTitle = document.createElement("h1");
    let authorName = document.createElement("span");
    let date = document.createElement("span");
    let description = document.createElement("p");
    let btnElement = document.createElement("a");
    postTitle.id = `${db.id}`;
    authorName.id = `${db.id}`;
    
    //THE className PROPERTY GETS AND SETS THE VALUE OF THE CLASS ATRIBUTE OF THE SPECIFIED ELEMENT
    cardElement.className = "card pl-5 pr-5 mb-5 mt-5 mx-auto w-75";
    postTitle.className = "text-uppercase";
    authorName.className = "text-uppercase";
    date.className = "font-weight-lighter font-italic date-font";
    description.className = "text-capitalize mt-4 text-font";
    btnElement.className = "btn-custom btn mb-5";

    //SETS THE VALUE OF THE CLASS ATRIBUTE OF THE SPECIFIED ELEMENT
    btnElement.setAttribute("href", "post-detail.html");
    
    
    btnElement.onclick = function(){
      handleClickDetails(authorName.id);
    };
    
    //DISPLAY BUTTON TEXT
    btnElement.innerText = "Read More";
    
    //DISPLAY THE DB IN THE HTML
    authorName.innerHTML = `${db.author}`;
    postTitle.innerHTML = `${db.title}`;
    date.innerHTML = `${db.date}`;
    description.innerHTML = `${db.description}`;
    
    referenceNode.appendChild(cardElement);
    cardElement.append(postTitle, authorName, date, description, btnElement);
  });
};

getPosts();

//SORTS PUBLISH DATE FROM NEWEST FIRST
function sortByDate(el){
  el.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
}

//HANDLE CLICK TO ADD ID TO THE SESSION STORAGE AND GO TO POST DETAIL PAGE
function handleClickDetails(id){
  sessionStorage.setItem("id",id);
}