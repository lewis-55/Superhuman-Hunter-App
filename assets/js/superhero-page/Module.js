//------------------------------------------------
//Revealing Module Pattern using IIFE Module Design Pattern
//----------------------------------------
const superHeroPage = (() => {
    // Varaible Decalrations
    const searchResultTitle = document.querySelector
    ("#search-result-title");
    const searchResult = document.querySelector
    ("#search-result");
    const template1 = document.querySelector
    ("[data-superhero-template]");
    const template2 = document.querySelector
    ("[data-nothing-template]");
    const template3 = document.querySelector
    ("[data-superheroes-template]");
    //------------------------------------------
    // Function Sets the Search Result Title
    const setSearchResultTitle = () => {
        setSearchResultTitle.textContent = 
        `Search Results for
        '${localStorage.getItem(
            "superhero"
        )}'`;
    };
    //------------------------------------------
    // Function: Sets the Favourite Heart Icon's Color
    const setHeartColor = (favouriteBtn,name) => {
        let arr = [];
        let item = name.trim().toLowerCase();
        // If Favourites exist in localStroage
        if ("favourites" in localStorage) {
            // Convert the string to array
            arr = JSON.parse(localStorage
                .getItem("favourites"));
     // If the superhero is already in favourites
     if (arr.includes (item)) {
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
    //---------------------------------------------
    // Function: Renders the Searched or
    // Clicked Superhero Card on the Screen
    const renderSuperhero = (superheroList) => {
        const superhero = template1.textContent.
        cloneNode(true).children[0];
    const name = superhero.querySelector("#name");
    const image = superhero.querySelector
    ("#image img");
    const favouriteBtn = superhero.
    querySelector("#info .fav-btn" );
    const progressBar = superhero.
    querySelectorAll(".progress-bar");
    const sections = superhero.
    querySelectorAll("section");
    let i = 0;
    
    // Set the Superhero Name
    name.textContent = superheroList[0].name;
    // Set the Superhero Image
    image.src = superheroList[0].image.url;
    // Set the Superhero's Data-Attributes
    favouriteBtn.setAttribute("data-id",
    superheroList[0].id);
    favouriteBtn.setAttribute("data-image-url",
    superheroList[0].image.url);

    // Set the Superhero's Favourite Heart 
    // Icon's Color
    setHeartColor(favouriteBtn,
        superheroList[0].name);

        // Set the Superhero's Powerstates
 for (let key in superheroList[0].powerstats) {
    let val = superheroList[0].powerstats[key];
    // If the powerstates are null,
    // Undefined or Empty
    if (
        val === "null" ||
        val === undefined ||
        val === "undefined" || 
        val === null
    )   {
        val = "NA"
    }
    // Set the superhero's Powerstates in the Progess Bar
    progressBar[i].style.width = `${val}%`;
    progressBar[i].setAttribute("aria-valuenow",
    `${val}`);
    progressBar[i].textContent = `${val}%`;
    progressBar[i].parentElement.
    previousElementSibling.textContent = 
    key.toLocaleLowerCase();
    i++;
 }

 // Setting the values of the Superhero Section 
//  one by one
 // 1st Lop[ is for traversing
 // through the Superhero <section>
 // in the HTML & 2nd Loop is for
 // traversing through the Content of
 // the Superhero <section> in the HTML
//  which needs to be configured
for (let k=1; k<5; k++) {
    // 'k' is the index for the Superhero <section>
    // in the HTML
    // 'j' is the index for the Superhero
    // <Section>'s Children in the HTML
    for (let j = 1; j < sections[k].
        children.length; j++) {
            // 'ele' is the <span> Tag inside the <p> tag
            let ele = sections[k].children[j].children[0];
            //'val' is the textContent of the <span> Tag
            let val = ele.textContent.toLocaleLowerCase();
            // Remove ':' from the textContent &
            // trim the trailing whitespaces
            let key = val.split(":").join("").trim();
            //Key is the Property, Content is the Information
            let content;

    // Switching throught the Superhero SECTION  
    // in the HTML
    switch(k) {
        // Section 1 - Biography
        case 1: 
        content = superheroList[0].biography[key];
        break;
        // Section 2 - Appearance
        case 2: 
        content = superheroList.appearance[key];
        break;
        // Section 3 - Connections
        case 3: 
        content = superheroList.connections[key];
        break;
        // Section 4 - Work
        case 4:
            content = superheroList[0].work[key];
            break;
            // Default
            default:
                content = "";
    }      
    
    // If the content is Null, Undefined or Empty
    if (
        content === "null" ||
        content === null ||
        content === "undefined" ||
        content === undefined ||
        content === "" ||
        content === "-" ||
        content === " " ||
        content === "NA"
    ) {
        content = "Not Available";
    }

    // If the content is an object
    if (typeof content === "object") {
        content = content.join(",");
    } 

    // Replace '-' with '' in the <span>
    ele.textContent = val.split("-").join(" ");
    // Set the Information in the <p> Tag
    ele.parentElement.append(content);
        }
}

// Append the superhero Information Card to the Search Results
searchResult.appendChild(superhero);
};
//------------------------------------------------
// Fucntion: To render Multiple Search Result 
// Superhero Cards on the Screens
 const multipleSuperheroes = (superheroList) => {
    // Create a Wrapper DIv to hold the Seach Results
    const wrapper = document.createElement("div");
    wrapper.classList.add (
        "result",
        "row",
        "row-cols-1",
        "row-cols-md-3",
        "g-4"
    );

    // Store the Superhero Data in the Data-Attribute
    // of Each Card
    superheroList.forEacg((superhero) => {
        const superheroes = template3.content.
        cloneNode(true).children[0];
        const name = superheroes.querySelector
        (".card-title");
        const image = superheroes.querySelector("img");
        // Biography
        superheroes.setAttribute(
            "data-biography",
            JSON.stringify(superhero.biography)
        );
        // Connections
        superheroes.setAttribute(
            "data-connections",
            JSON.stringify(superhero.connections)
        );
        // Appearance
        superheroes.setAttribute(
            "data-appearance",
            JSON.stringify(superhero.appearance)
        );
        // Work
        superheroes.setAttribute("data-wrok",
        JSON.stringify(superhero.work));
        // Powerstats 
        superheroes.setAttribute(
            "data-powerstats",
            JSON.stringify(superhero.powerstats)
        );
        // Image URL
        superheroes.setAttribute("data-image-url",
        superhero.image.url);
        // Name
        superheroes.setAttribute("data-name",
        superhero.name);

        // Append the superhero Card to the Wrapper Div
        name.textContent = superhero.name;
        image.src = superhero.image.url;
        wrapper.appendChild(superheroes);
    });

    // Append the Wrapper Div to the Search Results Section
    searchResult.appendChild(wrapper);
 };
 //----------------------------------------------
 // Function : Fetches the Searched Superhero
  const fetchSearchedHero = async () => {
    setSearchResultTitle();
    try {
        const value = localStorage.
        getItem("superhero").toLowerCase();
        const url = 
  `https://superhero-hunter-app-mini-server.onrender.com/api/v1/superheroes/${value}`;
     const response = await fetch(url);
     let data = await response.json();
     data = data.data;

     searchResult.querySelectorAll("*").
     forEach((child) => child.remove());

     if (data.response === "error") {
        console.log("Error:" + data.error);
    const superhero = template2.content.
    cloneNode(true).children[0];
     searchResult.appendChild(superhero);
          return;    
     }

     const superheroList = data.result;

     if (
        superheroList.length === 0 ||
        superheroList === undefined ||
        superheroList === null ||
        superheroList === "null" ||
        superheroList === "undefined"
     ) {
        const superhero = template3.content.
        cloneNode(true).children[0];
        searchResult.appendChild(superhero);
        return;
    }
    if (superheroList.length === 1) {
        renderSuperhero(superheroList);
        return;
    } else {
        multipleSuperheroes(superheroList);
        return;
    }  
 }   catch (error) {
        console.log("Errot in fetching the Searched Super Hero !!!",error);
    }
  };
  //---------------------------------------
  // Function: Handles the Click Events 
  const handleClick = (event) => {
    // Stops Event Bubbling
    event.stopPropagation();
    // Fetch the clicked Element
    const target = event.target;

// For Single Search Result:
// If the clicked Element is the Heart Icon
if (!!searchResult.querySelector(".single-card")) {
    const superhero = document.querySelector
    (".single-card");
    const toast = superhero.querySelector(".toast");
    const name = superhero.querySelector("#name");
    const favouriteBtn = superhero.
    querySelector("#info .fav-btn");
    let arr = [];
    let images = [];
    let item = name.textContent.trim().toLowerCase();
    let url = favouriteBtn.getAttribute("data-image-url");
    toast.children[0].children[0].textContent = item;
    console.log(target);

  // If the clicked Element is the Heart Icon
  if (target.classList.contains("fav-btn")) {
    // If Favourites ecist in localStorage
    if ("favourites" in localStorage) {
        // convert the string to array
        arr = JSON.parse(localStorage.
            getItem("favourites"));
            // Convert the string to array
    images = JSON.parse(localStorage.getItem("images"));
    
    // If the superhero is already in the favourites
    if (arr.includes(item)) {
        // Remove the superhero from the favourites
        arr = arr.filter((i) => i !== item);
// Remove the superhero image URL from the favourites
images = images.filter((obj)=> 
    obj.name !== item);
    // Change color of the heart icon
    favouriteBtn.style.color = "black";
    // Change toast message
    toast.children[1].children[0].textContent = 
    "Removed from Favourites !!!!";        
    }
    // If the superhero is not in the favourites
    else {
        // push the favourites superhero to the array
        arr.push(item);
        // Push the favourites superhero image URL to the array
        images.push({ name: item, image: url});
        // Change color of the heart icon
        favouriteBtn.style.color = "red";
        // Chnage toast message
        toast.children[1].children[0].textContent = 
        "Added to Favourites !!!";
    }
    }
   // If Favourites don't exist in localStorage
   else {
 //Push the favourite superhero to the array
 arr.push(item);
 // Push the favourites superhero image URL to the array
 images.push({name: item, image: url});
// Change color of the heart icon   
favouriteBtn.style.color = "red";
 // Change toast message
 toast.children[1].children[0].textContent = 
 "Added to Fvaourites!!!!" 
   } 
   // Convert the array to string and store it in localStorage
   localStorage.setItem("favourites",
   JSON.stringify(arr));
   // Convert the array to string and store it in localStorage
   localStorage.setItem("images",
   JSON.stringify(images));
   // show the toast
   toast.classList.add("Show","fadeLeft");
   // Hide the toast after 4 seconds
   setTimeout(()=> {
    toast.classList.remove("show","fadeLeft");
   },4000);
  }
}
  }

 // For Multiple Search Results: I fthe clicked Element
 if (searchResult.querySelector(".card").
 length >0 )  {
    let element;
    let name,image,biography,appearance,
    connections,work,powerstats;
    
    // If clicked Element if the Superhero Card Title
    if(target.classList.contains("card-title")) {
        element = target.parentElement
        .parentElement.parentElement;
    }
    // If the clicked ELement is the Superhero Card Image
    if(target.classList.contains("card-img-tpp")) {
        element = target.parentElement.parentElement;
    }
// If the clicked Element is the Whole Superhero Card
if (target.classList.contains("card")) {
    element = target.parentElement;
}

// Set the Superhero card Data
name = element.getAttribute('data-name');
image = element.getAttribute("data-image-url");
biography = JSON.parse(element.
    getAttribute("data-biography"));
  appearance = JOSN.parse(element.
    getAttribute("data-appearance"));
    connections = JSON.parse
    (element.getAttribute("data-connecctions"));
    work = JSON.parse
    (element.getAttribute("data-work"));
    powerstats = JSON.parse
    (element.getAttribute("data-powerstats"));

    // Set the Superhero Card Data
    const superheroList = [
        {
            name : name,
            image : {
                url : image,
            },
            biography : biography,
            appearance : appearance,
            connections : connections,
            work : work,
            powerstats : powerstats
        },
    ];

    // Remove all Previous Search results
   searchResult.querySelectorAll("*").
   forEach((child)=> child.remove());
   // Set the superhero in the Local Storage
   localStorage.setItem("superhero",
   superheroList[0].name.toLowerCase());
   // Set the Search Result Title
   setSearchResultTitle();
   // Render the Superhero Card
   renderSuperhero(superheroList);
   return; 
 }

//---------------------------------
// Function: Initializes the Superhero Display Page
 const initializeApp = () => {
    // click Event Delegration
    document.addEventListener("click",handleClick);
    // Runs on every window Load/Reload
    window.onload = ()=> {
        // Calls the fetchsearchedHero() function
        fetchSearchedHero();
    };
 };
 //--------------------------------------------------
 return {
    initialize: initializeApp,
};
})();
//-----------------------------------------------