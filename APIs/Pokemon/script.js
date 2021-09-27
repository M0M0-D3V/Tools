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
    let html_str = `
        <h3>${mon.name}</h3>
        <img src="${mon.sprites.front_default}" alt="${mon.name}" />
        <h4>height: ${mon.height}</h4>
        <h4>weight: ${mon.weight}</h4>
        <h4>types: `
    for(let i = 0; i < mon.types.length; i++) {
        console.log(mon.types[i].type.name)
        html_str += `${mon.types[i].type.name} `
    }
    html_str += `</h4>`
    pokeView.innerHTML = html_str
}

function stopShow(mon) {
    pokeView.innerHTML = ""
}