//Henter opskrifter fra WordPress REST API og viser dem som kort på siden

//Henter api
const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";



// Hent opskrifter når siden loader
getAllRecipes();

//Definerer sværhedsgrad ud fra deres ID i wordpress
const difficultyMap = {
    46: "Begynder",
    47: "Mellem",
    48: "Avanceret"
};


//Funktion til at hente alle opskrifter - opskrifter har id 57 i wordpress, derfor tilføjes &categories=57 i url'en for at filtrere på det
async function getAllRecipes() {

    try {
        const response = await fetch(
            `${baseUrl}?acf_format=standard&per_page=100&categories=57`
        );

        const posts = await response.json();

        console.log("Opskrifter:", posts); //Logger opskrifterne for at vi kan se dem i consollen.

        renderRecipes(posts);

    } catch (error) {
        console.log("Fejl ved hentning af opskrifter:", error);
    }
}


// Funktion til at vise opskrifterne på siden
function renderRecipes(posts) {

    const container = document.querySelector(".opskrift-grid"); //Finder containeren på siden hvor opskrifterne skal vises
    container.innerHTML = ""; //Tømmer containeren for indhold

    posts.forEach(post => { //for each loop der kører igennem hver opskrift i posts og tilføjer HTML til containeren for hver opskrift. HTML'en er et card der viser opskriftens billede, titel, tid og sværhedsgrad.

        // Finder difficulty via mapping (fra taxonomy ID), så vi kan se sværhedsgraden på siden og ikke bare ID'et.
        //Vi har fået hjælp af chat.gpt til at lave denne mapping, da sværhedsgraden i wordpress er lavet som en taxonomy, og derfor kun viser et ID i API'et. Med denne mapping kan vi vise selve sværhedsgraden på siden i stedet for ID'et.
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
                    <i class="fa-regular fa-clock"></i>
                    ${post.acf.total_time} ${difficulty ? "| " + difficulty : ""}
                </p>

            </div>

        </article>
        `;
    });
}