//-------------------------------
//Revealing Module Patterm using IIFE Module Design pattern//
//------------------------------------------------
 const superHeroApp = (() => {
   // Variable Declarations//
   const videos = document.getElementsByClassName("headerVideo");
   const footerVideo = document.getElementsByClassName("footerVideo")[0];
   const template = document.querySelector(".template ul li");
   const suggestionBox = document.getElementsByClassName("autocomplete-box")[0];
   const input = document.getElementsByTagName("input")[0];
   const UL = document.querySelector(".search-box ul");
   const footerRect = document.querySelector("footer").getBoundingClientRect();
   const height = Math.max (
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight
   );
   let i = 0;
   let flag = "not found";
   let superheroes = [];
   //------------------------------------------
   //Function: Toggle the favourites Heart Icon in the Suggestions//
      const heartToggle = (favouriteBtn,name) => {
        let arr = [];
        let item = name.trim().toLowerCase();
        //If Favourites exist in localstorage
        if("favourites" in localStorage) {
            // Convert the string to array

 arr = JSON.parse(localStorage.getItem("favourites"));
 // If the superhero is already in the favourites
 if(arr.includes(items)){
    favouriteBtn.style.color = "red";
 }       
 // If the superhero is not in the favourites
 else {
    favouriteBtn.style.color = "black";
 }
}
// If Favourites don't exist in localStorage
 else {
    favouriteBtn.style.color = "black";
 }
      };
      //------------------------------------
      //Function: plays the superhero Intro Videos in  the background
      const videoPlay = () => {
        document.querySelectorAll(".homepage-header")
        //Superhero Hunter App API Initialization
        (async function initialize (){
            try {
				const url = "https://superhero-hunter-app-mini-server.onrender.com";
                const response = await fetch (url);
            } catch(error){
                console.log(error);
            }
        })();
      };
   //----------------------------------------------
   //Function: Fetches all the Superheroes//
   const fetchSuperhero = async (value) =>{
 if(value.length === 0 || value.trim()=== ""){
    //If input is empty then hide the suggestion box
    UL.style.visibility = "hidden";
    flag = "not found";
    return;
 } else {
    //Fetching the Superheroes from the Superhero API
 try {
				const url = `https://superhero-hunter-app-mini-server.onrender.com/api/v1/superheroes/${value}`;
                const response = await fetch(url);
                let data = await response.json();
                data = data.data;
// If the response is Error then hide the suggestion box
                if(data.response === "error") {
                    UL.style.visibility = "hidden";
                    flag = "not found";
                    return;
                }
                const superheroList = data.results;
                //Remove the previous suggestions
                suggestionBox.querySelectorAll("li").forEach((li)=>{
                    li.remove();
                });
   // Clone the templates for each superhero            
    superheroes = superheroList.map((superhero)=>{
      const suggestion = template.cloneNode(true);
      const name = suggestion.querySelector("div span");
      const image = suggestion.querySelector("div img");
      const favouriteBtn = suggestion.querySelector(".fav-btn");
      //Setting the name and iamge of the superhero
      if(superhero.name.toLowerCase().includes(value.toLowerCase())){
         name.textContent = superhero.name;
         image.src = superhero.image.url;
         suggestion.setAttribute("data-id",superhero.id);
         suggestion.setAttribute(
            "data-image-url",
             superhero.image.url
         );
      // Setting the favourite button  color
      heartToggle(favouriteBtn,superhero.name); 
      }
      // If the content is emoty then return null
      if(
         name.textContent === "" ||
         name.textContent === null ||
         name.textContent === undefined
      ) {
         return null;
      }
      // Return the superhero
      return suggestion;
    });
    // If the content is empty (Array is null) then hide the suggestion box
 if(superheroes[0] === null){
   UL.style.visibility = "hidden";
   flag = "found";
    return; 
}
// Showing the suggestions in the suggestion box
 suggestionBox.append(...superheroes);
 UL.style.visibility = "visible";
 flag = "found";
} catch (error) {
   UL.style.visibility = "hidden";
   if(error.message === "Failed to fetch") {
      // If there is an error,hide the suggestion box
      console.log(error);
   } else if (error.name === "TypeError") {
      // If superhero not found,hide the suggestion box
      console.log(error);
   }
   flag = "not found";
}
   }
};
   //-----------------------------------------
   //  Function: Handle the Click Events//
 const handleClick = (event) =>{
   // Stops Event Bubbling
   event.stopPropagation();
   // Fetch the clicked element
   const target = event.target;
   const li = document.querySelectorAll(".search-box ul li");
   const toast = document.querySelector(".toast");

   // If the clicked element is not Search Bar or Suggestion Box
   if (target.id === "form" || target.id === "wrapper"){
      // Hide the suggestion box
      UL.style.visibility = "hidden";
   }
   // If the clicked element Search Bar
   if(
      target.id === "search-input" && 
      target.value.length > 0 && 
      flag === "found"
   ) {
      // Show the suggestion box
      UL.style.visibility = "visible";
   }
   // If the clicked element is a SUggestion from suggestion box
   li.forEach((li)=> {
      // If list item is clicked
      if (target === li) {
         // Store the superhero name in local storage
         localStorage.setItem(
            "superhero",
            target.textContent.trim().toLowerCase()
         );
         // Redirect to the superhero Page
         window.location.href = "./superhero-page.html";
         return;
      }
      // If list item div is clicked
      if (target === li.children[0]) {
         // Store the superhero name in local storage
         localStorage.setItem(
            "superhero",
      target.children[1].textContent.trim().toLowerCase()      
         );
         // Redirect to the superhero page
   window.location.href = "./superhero-page.html";
   return;      
      }
      // If list item span is clicked
  if (target === li.children[0].children[1]) {
 // Store the superhero name in local Storage
 localStorage.setItem(
   "superhero",
   target.textContent.trim().toLowerCase()
 );  
 // Redirect to the superhero page
 window.location.href = "./superhero-page.html";
 return;
  }    
  // If list item image is clicked
  if(target === li.children[0].children[0]) {
   // Store the superhero name is local storage
   localStorage.setItem(
      "superhero",
   target.nextElementSibling.textContent.trim().toLowerCase()
  );
  // Redirect to the superhero page
  window.location.href = "./superhero-page.html";
  return;
  }
  // If Heart is clicked
  if (target === li.children[1]) {
   let arr = [];
   let iamg = [];
   let item = target.previousElementSibling.children[1].textContent
         .trim()
         .toLowerCase()
         .toLowerCase();
 let url = target.parentElement.getAttribute("data-image-url");
  toast.children[0].children[0].textContent = item;

  // If favourites exist in localStorage
  if("favourites" in localStorage) {
   // Convert the string to array
   arr = JSON.parse(localStorage.getItem("favourites"));
   // Convert the string to array
   images = JSON.parse(localStorage.getItem("images"));

   // If the superhero is already in favourites
   if(arr.includes(item)) {
      // Remove the superhero from favourites
      arr = arr.filter((i)=> i !==item);
      // Remove the superhero image URL from the favourites
      images = images.filter((obj)=> obj.name !==item);
      // Change color of the heart icon
      target.style.color = "black";
      // Change toast message
      toast.children[1].children[0].textContent = 
      "Removed from Favourites !!!";
   }
   // If the superhero is not in the favourites
   else {
      // Push the favourites superhero to the array
      arr.push(item);
      // Push the favourite superhero image URL to the array
      images.push({ name: item, image: url });
      // Changes color of the heart icon
      target.style.color = "red";
      // Change toast message
      toast.children[1].children[0].textContent = 
      "Added to Favourites!!!!!";
   }
  }
  // If Favourites don't exist localStorage
  else {
   // Push the favourites superhero to the array
   arr.push(item);
   // Push the favourite superhero image URL to the array
   images.push({ name : item, image : url});
   // Changes color of the heart icon 
   target.style.color = "red";
   // Change toast message
   toast.children[1].children[0].textContent = 
   "Added to favourites!!!!!"
  }

  // Convert the array to string and store it in localStorage
     localStorage.setItem("favourites",JSON.stringify(arr));
     // Convert the array to string and store it in localStorage
     localStorage.setItem("images",JSON.stringify(images));
     //show the toast
     toast.classList.add("show","fadeLeft");
     // Hide the toast after 2 seconds
     setTimeout(()=> {
      toast.classList.remove("show","fadeLeft");
     },2000);
     return;
      }
   });
   // If the clicked element is the search Button
   if (target.id === "search-button") {
      event.preventDefault();
      const val = target.previousElementSibling.children[0].value;
       if(val.length > 0){
         // Store the superhero name in localStrong
         localStorage.setItem("superhero",val.toLowerCase());
         // Redirect to the superhero page
         window.location.href = "./superhero-page.html";
         return;
       }
       return;
   }
 };
 //------------------------------------
//  Debounce is a mechanism which forces a Function/API-call to wait
// a certain amount of time before running again.This is used to
// prevent the API-call from being called multiple times.

// Function : Debouncing mechanism for the API calls
 const debounce = (callback,delay = 180) => {
   let timeoutID;
   // Returns a function
   return(...value) => {
      // If there is a previous timeoutId then clear it, so that if we stop typing then open it registers the input as the final word after the delay & displays it.
      clearTimeout(timeoutID);
      // Set the timeoutID along with running the callback with a delay
      timeoutID = setTimeout(()=> {
         callback(...value);
      },delay);
   };
 };
 //----------------------------------------------
 // Function : It is used to invoke debounce() &  receives a function in return 
  const search = debounce((value)=> {
   // calls the fetchSuperheroes() function
  fetchSuperhero(value);
   },180);
   //----------------------------------------
   // Function: Handles the click Events//
   const handleInput = (event) => {
      // Stops Event Bubbling
      event.stopPropagation();
      //Value of the input field as we type
      const value = event.target.value;
      // calls search()
      search(value);
   };
   //------------------------------------
   // Function: Handles the press Events//
    const handlePress = (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
         event.stopPropagation();
         const submit = document.getElementById("search-button");
         const val = submit.previousElementSibling.children[0].value;
         if(val.length > 0) {
            // Click the search button
            submit.click();
            // Store the superhero name in LocalStorage
            localStorage.setItem("superhero",val.toLowerCase());
            // Redirect to the superhero page
            window.location.href = "./superhero-page.html";
            return;
         } 
         return;
      }
    }; 
    //---------------------------------------
    // Fucntion: Initializes the Superhero Hunter App
    const initializeApp = () => {
      // Click Event Delegation
      document.addEventListener("click",handleClick);
      // Input Event Listener
      document.addEventListener("keypress",handleInput);
      // Press Event Listerner
      document.addEventListener("keypress",handlePress);
      // Runs on every window Load/Reload
      window.onload = () => {
         // Runs the videoPlay function
         videoPlay();
      };
    };
    //-----------------------------------------
    return {
      initialize : initializeApp,
 };
 }) ();
 //---------------------------------------------------