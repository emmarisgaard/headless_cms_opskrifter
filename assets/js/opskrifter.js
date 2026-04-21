//Henter opskrifter fra WordPress REST API og viser dem som kort på siden

//Henter api
const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";


// finder category fra URL (fx ?category=61)
const params = new URLSearchParams(window.location.search); //https://www.w3schools.com/jsref/prop_loc_search.asp
const categoryId = params.get("category");


// Kører funktionen getAllRecipes til at hente opskrifter
getAllRecipes();

//Funktion til at hente alle opskrifter 
async function getAllRecipes() {

    try {
        const categoryQuery = categoryId ? categoryId : 57; // hvis der er en category i URL, så brug den, ellers brug 57, som viser alle opskrifter

        const response = await fetch(
            `${baseUrl}?acf_format=standard&per_page=100&categories=${categoryQuery}` //indsætter categoryQuery i Api URL
        );

        const posts = await response.json(); // konverterer JSON til JavaScript objekter

        renderRecipes(posts); // kalder funktionen til at vise opskrifterne på siden

    } catch (error) {
        console.log("Fejl ved hentning af opskrifter:", error); // hvis der er en fejl, så vises den i konsollen
    }
}

// Funktion til at vise opskrifterne på siden
function renderRecipes(posts) {

    const container = document.querySelector(".opskrift-grid"); //Finder containeren på siden hvor opskrifterne skal vises
    container.innerHTML = ""; //Tømmer containeren for indhold

    posts.forEach(post => { //Laver forEach loop for at vise hver opskrift. Bruger innerHTML til at indsætte HTML i containeren

        container.innerHTML += `
        <a href="opskrift.html?id=${post.id}" class="opskrift-kort">

            <img class="opskrift-kort__billede" 
                 src="${post.acf.image?.sizes?.medium}" 
                 alt="${post.acf.image?.alt}">

            <div class="opskrift-kort__indhold">
                <div class="opskrift-kort__top">
                    <h3>${post.acf.title}</h3>
                    <i class="fa-regular fa-star"></i>
                </div>
                <p>
                    <i class="fa-regular fa-clock"></i>
                    ${post.acf.total_time} | ${post.acf?.difficulty?.[0]?.name}
                </p>
            </div>
        </a>
        `;
    });
}