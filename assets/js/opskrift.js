// Henter én specifik opskrift baseret på ID i URL

const baseUrl = "https://tester.emmarisgaard.dk/wp-json/wp/v2/posts";

// find id fra URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

getRecipe();

async function getRecipe() {
    try {
        const response = await fetch(
            `${baseUrl}/${recipeId}?acf_format=standard`
        );

        const post = await response.json();
        console.log(post);

        renderRecipe(post);

    } catch (error) {
        console.log("Fejl:", error);
    }
}


// ----------------------
// HERO + MAIN RENDER
// ----------------------
function renderRecipe(post) {

    const container = document.querySelector(".opskrift-container");

    container.innerHTML = `

    <!-- HERO -->
    <section class="heroLayout">
        <div class="heroTekst">

            <h1>${post.acf?.title}</h1>

            <p>
                <i class="fa-regular fa-clock"></i>
                Tid i alt: ${post.acf?.total_time} | Forberedelse: ${post.acf?.prep_time}
            </p>

            <p class="introduktion">
                ${post.acf?.introduction}
            </p>

            <p>
                    ${post.acf?.difficulty?.[0]?.name}

                |
                   <span>${post.acf?.feature?.[0]?.name} | ${post.acf?.feature?.[1]?.name}</span>
                |

                <span class="cuisine">
                    ${post.acf?.cuisine?.[0]?.name}
                </span>
            </p>

            <div class="heroSamling">
                <p>Denne opskrift er en del af samlingen:</p>
                <a href="#">${post.acf?.samling?.[0]?.name}</a>
            </div>

            <div class="heroIkoner">
                <a href="#"><span><i class="fa-solid fa-star"></i><p>Tilføj til favoritter</p></span></a>
                <a href="#"><span><i class="fa-solid fa-calendar"></i><p>Tilføj til madplan</p></span></a>
                <a href="#"><span><i class="fa-solid fa-list"></i><p>Tilføj til indkøb</p></span></a>
                <a href="#"><span><i class="fa-solid fa-print"></i><p>Print opskrift</p></span></a>
                <a href="#"><span><i class="fa-regular fa-paper-plane"></i><p>Del opskrift</p></span></a>
            </div>

        </div>

        <div class="hero-billede">
            <img src="${post.acf?.image?.sizes?.large}" alt="${post.acf?.image?.alt}">
        </div>
    </section>


    <!-- MAIN -->
    <section class="mainLayout">

        <!-- INGREDIENSER -->
        <div class="ingredienser">
            <h2>Ingredienser</h2>

            <button class="antal">
                <i class="fa-solid fa-minus"></i>
                ${post.acf?.servings}
                <i class="fa-solid fa-plus"></i>
            </button>

            <ul>
                ${Object.values(post.acf?.ingredients || {})
            .filter(Boolean)
            .map(i => `<li>${i}</li>`)
            .join("")
        }
            </ul>

            <button class="tilføj">
                <i class="fa-solid fa-list"></i>
                <span>Tilføj ingredienser til indkøbsliste</span>
            </button>
        </div>


        <!-- FREMGANGSMÅDE -->
        <div class="fremgangsmaade">
            <h2>Sådan gør du</h2>

            <label class="checkbox-container">
                <input type="checkbox">
                Hold min skærm tændt
            </label>

            <div class="fremgangsmaadeTrin">
                <ol>
                    ${Object.values(post.acf?.instructions || {})
            .filter(Boolean)
            .map(i => `<li>${i}</li>`)
            .join("")
        }
                </ol>
            </div>

            <p class="kilde">
                ${post.acf?.source}
            </p>
        </div>

    </section>

    `;
}