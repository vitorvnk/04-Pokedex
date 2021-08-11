var qtd = document.getElementById("qtd");
qtd.addEventListener('change', ()=>{
    pegaPokemons(qtd.value);
})


function pegaPokemons(qtd){
    var pokemonsboxes = document.querySelector('.pokemon-boxes');
    pokemonsboxes.innerHTML = `
    <div class="loading">
        <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47v66qpeyea5tev370t4u4gnm80ucbyd10bu2kzko3&rid=giphy.gif&ct=g" style="width:200px;height:200px;padding:20px;" />
    </div>`;

    fetch('https://pokeapi.co/api/v2/pokemon?limit='+qtd)
    .then(response => response.json())
    .then(allpokemon => {
        var pokemons = [];
        allpokemon.results.map((val) =>{
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({nome:val.name, imagem:pokemonSingle.sprites.front_default});
                
                if(pokemons.length == qtd){
                    pokemonsboxes.innerHTML = '';
                    pokemons.map(function(val){
                        pokemonsboxes.innerHTML += `
                        <div class="pokemon-box">
                            <img src="`+val.imagem+`">
                            <p>`+val.nome+`</p>
                        </div>`;
                    })
                }
            })
        })
    })
}

function jumpScroll() {
    var target_offset = $(".divBusca").offset();
    var target_top = target_offset.top;
    $('html, body').animate({ scrollTop: target_top }, 0);
}


