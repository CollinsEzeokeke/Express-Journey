const output = document.querySelector("#output");
const getPosts = document.querySelector("#getPosts");

// Get and show posts

async function showPosts() {
  try {
    const response = await fetch("http://localhost:8000/api/posts");
    if (response.ok) {  
    const posts = await response.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.textContent = post.title;
      output.appendChild(postElement);
    });
  }else{
    throw new Error("Error getting posts");
  }
}catch (error) {
    console.log(error);
  }
}

// Submit a new post
const add = document.querySelector("#add");

async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get("title");

    try{
        const res = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title})
        });
        if (!res.ok) {
            throw new Error("Error adding post");
        }else{
            const data = await res.json();
            
            const postElement = document.createElement("div");
            postElement.textContent = data.title;
            output.appendChild(postElement);
            showPosts();
        }
    }catch(error){
        console.log(error);
    }
}


//Event Listeners
getPosts.addEventListener("click", showPosts);
add.addEventListener("submit", addPost);



