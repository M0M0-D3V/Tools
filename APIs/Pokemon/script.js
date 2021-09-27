console.log(`I am alive`)
let pokeGallery = document.getElementById("poke-gallery")
let pokeView = document.getElementById("poke-view")

for(let i = 1; i <= 150; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let pokemon = document.createElement("img");
        let pokemonImgUrl = data.sprites.front_default;
        pokemon.src = pokemonImgUrl;
        pokemon.addEventListener("mouseover", function() {show(data)})
        pokemon.addEventListener("mouseout", function() {stopShow(data)})
        pokeGallery.appendChild(pokemon);
    })
    .catch((error) => {
        console.log(error)
        // run another code
    });
}

function show(mon) {
    console.log(`showing ${mon.name}`)
    let html_str = ""
    
}

function stopShow(mon) {
    console.log(`not showing ${mon.name}`)
    pokeView.innerHTML = ""
}