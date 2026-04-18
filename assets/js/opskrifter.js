//Henter opskrifter fra WordPress REST API og viser dem som kort på siden

//Henter api
const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";



// Hent opskrifter når siden loader
getAllRecipes();



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


        container.innerHTML += `
        <article class="opskrift-kort" data-id="${post.id}">

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

        </article>
        `;
    });
    // Gør hvert card klikbart og sender brugeren til single opskrift side
    const cards = document.querySelectorAll(".opskrift-kort");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.dataset.id;

            // sender id med i URL
            window.location.href = `opskrift.html?id=${id}`;
        });
    });
}