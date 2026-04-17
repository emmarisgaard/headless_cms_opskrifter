// Base URL til dit WordPress API
const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";


// ----------------------
// START: Hent opskrifter når siden loader
// ----------------------
getAllRecipes();


// ----------------------
// MAPPING (ID → tekst)
// ----------------------
const difficultyMap = {
    46: "Begynder",
    47: "Mellem",
    48: "Avanceret"
};


// ----------------------
// HENT KUN OPSKRIFTER (kategori ID = 57)
// ----------------------
async function getAllRecipes() {

    try {
        const response = await fetch(
            `${baseUrl}?acf_format=standard&per_page=100&categories=57`
        );

        const posts = await response.json();

        console.log("Hentede opskrifter:", posts);

        renderRecipes(posts);

    } catch (error) {
        console.log("Fejl ved hentning af opskrifter:", error);
    }
}


// ----------------------
// RENDER OPSKRIFTER SOM CARDS
// ----------------------
function renderRecipes(posts) {

    const container = document.querySelector(".opskrift-grid");
    container.innerHTML = "";

    posts.forEach(post => {

        // Finder difficulty via mapping (fra taxonomy ID)
        const difficultyId = post["dificulty-level"]?.[0];
        const difficulty = difficultyMap[difficultyId] || "";

        container.innerHTML += `
        <article class="opskrift-kort">

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
                    <i class="fa-solid fa-stopwatch"></i>
                    ${post.acf.total_time} ${difficulty ? "| " + difficulty : ""}
                </p>

            </div>

        </article>
        `;
    });
}