//Henter opskrifter fra WordPress REST API og viser dem som kort på siden

//Henter api
const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";


// finder category fra URL (fx ?category=61)
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("category");


// Hent opskrifter når siden loader
getAllRecipes();


//Funktion til at hente alle opskrifter - opskrifter har id 57 i wordpress, derfor tilføjes &categories=57 i url'en for at filtrere på det
async function getAllRecipes() {

    try {

        // hvis der er valgt kategori → brug den
        // ellers fallback til "Opskrift" (57)
        const categoryQuery = categoryId ? categoryId : 57;

        const response = await fetch(
            `${baseUrl}?acf_format=standard&per_page=100&categories=${categoryQuery}`
        );

        const posts = await response.json();

        console.log("Opskrifter:", posts);

        renderRecipes(posts);

    } catch (error) {
        console.log("Fejl ved hentning af opskrifter:", error);
    }
}


// Funktion til at vise opskrifterne på siden
function renderRecipes(posts) {

    const container = document.querySelector(".opskrift-grid"); //Finder containeren på siden hvor opskrifterne skal vises
    container.innerHTML = ""; //Tømmer containeren for indhold

    posts.forEach(post => {

        // Tilføjer et card til HTML
        // Card er nu gjort til et link så vi slipper for JS click events
        container.innerHTML += `
        <a href="opskrift.html?id=${post.id}" class="opskrift-kort">

            <!-- Billede -->
            <img class="opskrift-kort__billede" 
                 src="${post.acf.image?.sizes?.medium || ''}" 
                 alt="${post.acf.image?.alt || post.acf.title}">

            <!-- Indhold -->
            <div class="opskrift-kort__indhold">

                <!-- Titel + ikon -->
                <div class="opskrift-kort__top">
                    <h3>${post.acf.title}</h3>
                    <i class="fa-regular fa-star"></i>
                </div>

                <!-- Tid + sværhed -->
                <p>
                    <i class="fa-regular fa-clock"></i>
                    ${post.acf.total_time} | ${post.acf?.difficulty?.[0]?.name}
                </p>

            </div>

        </a>
        `;
    });
}