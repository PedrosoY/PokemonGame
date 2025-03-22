class Pokemon {
    constructor(nome, baseStats, moves, tipo) {
        this.nome = nome;
        // 20% de chance de ser shiny
        this.isShiny = Math.random() * 100 < 20;

        // Define sprites (normal/shiny e versão de trás)
        this.spriteNormal = `https://img.pokemondb.net/sprites/black-white/anim/normal/${nome.toLowerCase()}.gif`;
        this.spriteShiny = `https://img.pokemondb.net/sprites/black-white/anim/shiny/${nome.toLowerCase()}.gif`;
        this.spriteBackNormal = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${nome.toLowerCase()}.gif`;
        this.spriteBackShiny = `https://img.pokemondb.net/sprites/black-white/anim/back-shiny/${nome.toLowerCase()}.gif`;

        // Define o nível (usa o level informado ou 50 por padrão)
        this.level = baseStats.level || 50;
        this.tipo = tipo; // Pode ser string ou array para múltiplos tipos

        // Armazena os status base (sem a variação)
        this.statsBase = {
            hp: calcularStat(baseStats.hp, this.level),
            attack: calcularStat(baseStats.attack, this.level),
            defense: calcularStat(baseStats.defense, this.level),
            spAttack: calcularStat(baseStats.spAttack, this.level),
            spDefense: calcularStat(baseStats.spDefense, this.level),
            speed: calcularStat(baseStats.speed, this.level)
        };

        // Status atuais com variação ±5
        this.hp = this.variarStatus(this.statsBase.hp);
        this.attack = this.variarStatus(this.statsBase.attack);
        this.defense = this.variarStatus(this.statsBase.defense);
        this.spAttack = this.variarStatus(this.statsBase.spAttack);
        this.spDefense = this.variarStatus(this.statsBase.spDefense);
        this.speed = this.variarStatus(this.statsBase.speed);

        // Movimentos (4)
        this.moves = moves;
    }

    // Função para variar ±5 pontos (pode ser ajustada se desejar)
    variarStatus(base) {
        return base + (Math.floor(Math.random() * 11) - 5);
    }

    getSprite() {
        return this.isShiny ? this.spriteShiny : this.spriteNormal;
    }

    getBackSprite() {
        return this.isShiny ? this.spriteBackShiny : this.spriteBackNormal;
    }

    alternarSprite() {
        let normal = document.getElementById(`${this.nome.toLowerCase()}_normal`);
        let shiny = document.getElementById(`${this.nome.toLowerCase()}_shiny`);
        if (this.isShiny) {
            normal.style.display = 'none';
            shiny.style.display = 'flex';
        } else {
            normal.style.display = 'flex';
            shiny.style.display = 'none';
        }
    }

    mostrarStatus() {
        console.log(`🔥 ${this.nome} (${this.isShiny ? "Shiny" : "Normal"})`);
        console.log(`Level: ${this.level}`);
        console.log(`HP: ${this.hp}`);
        console.log(`Attack: ${this.attack}`);
        console.log(`Defense: ${this.defense}`);
        console.log(`Sp. Attack: ${this.spAttack}`);
        console.log(`Sp. Defense: ${this.spDefense}`);
        console.log(`Speed: ${this.speed}`);
        console.log(`Moves: ${this.moves.map(move => move.nome).join(", ")}`);
        console.log("---------------");
    }
}


function calcularStat(base, level) {
    return Math.floor(base * (1 + (level / 50) * 2.33));
}

// Objeto com matchups básicos para type effectiveness
const typeChart = {
    fire: { grass: 2, water: 1, fire: 1 },
    water: { fire: 2, grass: 1, water: 1 },
    grass: { water: 2, fire: 1, grass: 1 }
    // Adicione outros tipos conforme necessário
};

// Variável para armazenar o Pokémon escolhido
let jogadorEscolhido = null;

// Status base
const statsBase = {
    Charmander: { level: 1, hp: 39, attack: 52, defense: 43, spAttack: 60, spDefense: 50, speed: 65 },
    Squirtle: { level: 1, hp: 44, attack: 48, defense: 65, spAttack: 50, spDefense: 64, speed: 43 },
    Bulbasaur: { level: 1, hp: 45, attack: 49, defense: 49, spAttack: 65, spDefense: 65, speed: 45 }
};

// Movimentos ajustados com propriedades extras
const movesCharmander = [
    { nome: "Ember", type: "fire", category: "special", dano: 40 },
    { nome: "Scratch", type: "normal", category: "physical", dano: 40 },
    { nome: "Dragon Breath", type: "dragon", category: "special", dano: 60 },
    { nome: "Flamethrower", type: "fire", category: "special", dano: 90 }
];

const movesSquirtle = [
    { nome: "Water Gun", type: "water", category: "special", dano: 40 },
    { nome: "Tackle", type: "normal", category: "physical", dano: 40 },
    { nome: "Bubble Beam", type: "water", category: "special", dano: 65 },
    { nome: "Hydro Pump", type: "water", category: "special", dano: 110 }
];

const movesBulbasaur = [
    { nome: "Vine Whip", type: "grass", category: "physical", dano: 45 },
    { nome: "Tackle", type: "normal", category: "physical", dano: 40 },
    { nome: "Razor Leaf", type: "grass", category: "physical", dano: 55 },
    { nome: "Solar Beam", type: "grass", category: "special", dano: 120 }
];

const gradientFlamethrower = [
    { offset: 0, color: 'rgba(255, 255, 0, 1)' },
    { offset: 0.3, color: 'rgba(255, 150, 0, 0.8)' },
    { offset: 0.6, color: 'rgba(255, 50, 0, 0.6)' },
    { offset: 1, color: 'rgba(255, 0, 0, 0)' }
];

const gradientHydroPump = [
    { offset: 0, color: 'rgba(200, 255, 255, 1)' },
    { offset: 0.3, color: 'rgba(100, 200, 255, 0.8)' },
    { offset: 0.6, color: 'rgba(50, 150, 255, 0.6)' },
    { offset: 1, color: 'rgba(0, 100, 255, 0)' }
];

const gradientSolarBeam = [
    { offset: 0, color: 'rgba(255, 255, 100, 1)' },
    { offset: 0.3, color: 'rgba(255, 220, 50, 0.8)' },
    { offset: 0.6, color: 'rgba(255, 200, 0, 0.6)' },
    { offset: 1, color: 'rgba(255, 180, 0, 0)' }
];

// Instâncias
let charmander = new Pokemon("Charmander", statsBase.Charmander, movesCharmander, "fire");
let squirtle = new Pokemon("Squirtle", statsBase.Squirtle, movesSquirtle, "water");
let bulbasaur = new Pokemon("Bulbasaur", statsBase.Bulbasaur, movesBulbasaur, "grass");

// Ao carregar, alterna sprites
window.onload = function () {
    charmander.alternarSprite();
    squirtle.alternarSprite();
    bulbasaur.alternarSprite();
};

// Escolha do Pokémon (chamada via onclick no HTML)
function escolhaPokemon(pokemon) {
    let oponente = escolherOponente(pokemon);
    iniciarBatalha(pokemon, oponente);
}

// Escolhe um oponente diferente
function escolherOponente(pokemonEscolhido) {
    let opcoes = [charmander, squirtle, bulbasaur].filter(p => p !== pokemonEscolhido);
    return opcoes[Math.floor(Math.random() * opcoes.length)];
}

/**
 * Calcula o dano com base na fórmula:
 * ((((((2 * level * critical) / 5) + 2) * power * (A / D)) / 50) + 2) * stab * type1 * type2 * random
 * 
 * - critical: 2 se acerto crítico, 1 caso contrário.
 * - A: estatística de ataque (ou ataque especial) do atacante.
 * - D: estatística de defesa (ou defesa especial) do defensor.
 * - Se A ou D forem maiores que 255, ambos são divididos por 4 e arredondados para baixo.
 * - STAB: 1.5 se o movimento for do mesmo tipo do atacante, 1 caso contrário.
 * - type1 e type2: efetividade do movimento contra os tipos do defensor.
 *   Se o defensor tiver um único tipo, type2 é considerado 1.
 * - random: inteiro entre 217 e 255 (dividido por 255).
 */
function calcularDano(atacante, defensor, move) {
    let level = atacante.level;
    // Chance de acerto crítico (6.25% de chance)
    let critical = (Math.random() < 0.0625) ? 2 : 1;

    // Seleciona A e D conforme a categoria do movimento
    let A = (move.category === "physical") ? atacante.attack : atacante.spAttack;
    let D = (move.category === "physical") ? defensor.defense : defensor.spDefense;

    // Se A ou D forem maiores que 255, ambos são divididos por 4 (arredondados para baixo)
    if (A > 255 || D > 255) {
        A = Math.floor(A / 4);
        D = Math.floor(D / 4);
    }

    let power = move.dano;

    // STAB: 1.5 se o movimento for do mesmo tipo do atacante, 1 caso contrário.
    let stab = 1;
    if (move.type && atacante.tipo) {
        if (Array.isArray(atacante.tipo)) {
            stab = (atacante.tipo.some(t => t.toLowerCase() === move.type.toLowerCase())) ? 1.5 : 1;
        } else {
            stab = (move.type.toLowerCase() === atacante.tipo.toLowerCase()) ? 1.5 : 1;
        }
    }

    // Efetividade contra o defensor (Type1 e Type2)
    let type1 = 1, type2 = 1;
    if (move.type && defensor.tipo) {
        if (Array.isArray(defensor.tipo)) {
            // Usa o primeiro tipo como type1
            type1 = (typeChart[move.type] && typeChart[move.type][defensor.tipo[0].toLowerCase()])
                ? typeChart[move.type][defensor.tipo[0].toLowerCase()] : 1;
            // Se houver um segundo tipo, usa-o como type2
            if (defensor.tipo.length > 1) {
                type2 = (typeChart[move.type] && typeChart[move.type][defensor.tipo[1].toLowerCase()])
                    ? typeChart[move.type][defensor.tipo[1].toLowerCase()] : 1;
            }
        } else {
            type1 = (typeChart[move.type] && typeChart[move.type][defensor.tipo.toLowerCase()])
                ? typeChart[move.type][defensor.tipo.toLowerCase()] : 1;
            type2 = 1;
        }
    }

    // Fator aleatório: inteiro entre 217 e 255
    let randomFactor = Math.floor(Math.random() * (255 - 217 + 1)) + 217;

    // Cálculo base de dano
    let baseDamage = ((((2 * level * critical) / 5) + 2) * power * (A / D)) / 50 + 2;
    baseDamage = Math.floor(baseDamage);

    // Aplica STAB, efetividade e fator aleatório conforme a fórmula
    let damage = Math.floor(baseDamage * stab * type1 * type2 * (randomFactor / 255));

    if (damage < 1) damage = 1;
    return damage;
}

// Inicia a batalha e os turnos
function iniciarBatalha(jogador, oponente) {
    // Define o HP máximo para referência
    jogador.hpMax = jogador.hp;
    oponente.hpMax = oponente.hp;

    jogadorEscolhido = jogador;

    // Esconde a tela de escolha, exibe a tela de batalha
    document.getElementById("container").style.display = "none";
    document.getElementById("battle_simulator").style.display = "block";

    // Configura o card do PLAYER
    let cardPokemonEscolhido = document.querySelector(".card_pokemon_escolhido");
    cardPokemonEscolhido.innerHTML = `
      <img src="${jogador.getBackSprite()}" alt="${jogador.nome}">
      <p>${jogador.nome}</p>
    `;
    cardPokemonEscolhido.id = `pokemon_${jogador.nome.toLowerCase()}`;
    cardPokemonEscolhido.onclick = function () {
        abrirModalStatus(jogador);
    };

    // Configura o card do ENEMY
    let cardRival = document.querySelector(".card_pokemon_rival");
    cardRival.innerHTML = `
      <img src="${oponente.getSprite()}" alt="${oponente.nome}">
      <p>${oponente.nome}</p>
    `;
    cardRival.id = `pokemon_${oponente.nome.toLowerCase()}`;

    // Configura a barra de vida do PLAYER
    let vidaPlayer = document.querySelector(".vida_dinamica");
    vidaPlayer.style.width = "80%";
    vidaPlayer.id = `barra_${jogador.nome.toLowerCase()}`;
    document.getElementById("quantidade_vida_player").innerText = `${jogador.hp} / ${jogador.hpMax}`;

    // Configura a barra de vida do ENEMY
    let vidaEnemy = document.querySelector(".vida_dinamica_enemy");
    vidaEnemy.style.width = "80%";
    vidaEnemy.id = `barra_${oponente.nome.toLowerCase()}`;
    document.getElementById("quantidade_vida_enemy").innerText = `${oponente.hp} / ${oponente.hpMax}`;

    // Exibe os movimentos disponíveis para o PLAYER
    let movesHTML = "";
    jogador.moves.forEach((move) => {
        movesHTML += `<div class="move">${move.nome}</div>`;
    });
    document.querySelector(".moves").innerHTML = movesHTML;

    iniciarTurno(jogador, oponente);
}

// Função para executar o ataque com o movimento selecionado pelo jogador usando a fórmula de dano
async function executarAtaqueComMove(atacante, defensor, move) {
    const dano = calcularDano(atacante, defensor, move);
    defensor.hp = Math.max(defensor.hp - dano, 0);
    atualizarBarraVida(defensor);

    // Animação do atacante (pulo)
    animarAtaque(atacante);

    // Seleciona o gradiente de acordo com o tipo ou nome do movimento
    if (move.type.toLowerCase() === "water" || move.nome.toLowerCase() === "hydro pump") {
        await dispararAnimacaoAtaque(atacante, gradientHydroPump);
    } else if (move.type.toLowerCase() === "grass" || move.nome.toLowerCase() === "solar beam") {
        await dispararAnimacaoAtaque(atacante, gradientSolarBeam);
    } else if (move.type.toLowerCase() === "fire" || move.nome.toLowerCase() === "flamethrower") {
        await dispararAnimacaoAtaque(atacante, gradientFlamethrower);
    } else {
        // Se não houver uma animação específica, pode executar uma animação padrão ou nenhuma.
        // await dispararAnimacaoAtaque(atacante, defaultGradient);
    }

    // Animação de receber dano
    animarReceberDano(defensor);

    console.log(`${atacante.nome} usou ${move.nome} contra ${defensor.nome} causando ${dano} de dano!`);
}



// Animação quando o Pokémon ataca (executa o pulo)
function animarAtaque(pokemon) {
    const elemento = document.getElementById(`pokemon_${pokemon.nome.toLowerCase()}`);
    if (!elemento) {
        console.error(`Elemento do Pokémon ${pokemon.nome} não encontrado para animação de ataque`);
        return;
    }
    elemento.classList.add('attack-pulo');
    elemento.addEventListener("animationend", function handleAnimation() {
        elemento.classList.remove('attack-pulo');
        elemento.removeEventListener("animationend", handleAnimation);
    });
}

// Animação quando o Pokémon recebe dano (executa o tremor)
function animarReceberDano(pokemon) {
    const elemento = document.getElementById(`pokemon_${pokemon.nome.toLowerCase()}`);
    if (!elemento) {
        console.error(`Elemento do Pokémon ${pokemon.nome} não encontrado para animação de dano`);
        return;
    }
    elemento.classList.add('attack-tremor');
    elemento.addEventListener("animationend", function handleAnimation() {
        elemento.classList.remove('attack-tremor');
        elemento.removeEventListener("animationend", handleAnimation);
    });
}


// Função que aguarda a escolha do ataque do jogador e, após, determina a ordem dos ataques
function esperarAtaque(jogador, oponente) {
    console.log("Aguardando a escolha do ataque do jogador...");
    const movesContainer = document.querySelector(".moves");

    function selecionaAtaque(e) {
        if (e.target.classList.contains("move")) {
            movesContainer.removeEventListener("click", selecionaAtaque);
            const moveNome = e.target.innerText;
            const moveSelecionado = jogador.moves.find(m => m.nome === moveNome);
            if (moveSelecionado) {
                if (jogador.speed >= oponente.speed) {
                    (async () => {
                        // Jogador ataca primeiro
                        await executarAtaqueComMove(jogador, oponente, moveSelecionado);
                        if (oponente.hp > 0) {
                            let randomIndex = Math.floor(Math.random() * oponente.moves.length);
                            let oponenteMove = oponente.moves[randomIndex];
                            await executarAtaqueComMove(oponente, jogador, oponenteMove);
                        }
                        // Intervalo de 2 segundos antes do próximo turno
                        setTimeout(() => {
                            iniciarTurno(jogador, oponente);
                        }, 2000);
                    })();
                } else {
                    (async () => {
                        // Enemy ataca primeiro
                        let randomIndex = Math.floor(Math.random() * oponente.moves.length);
                        let oponenteMove = oponente.moves[randomIndex];
                        await executarAtaqueComMove(oponente, jogador, oponenteMove);
                        if (jogador.hp > 0) {
                            await executarAtaqueComMove(jogador, oponente, moveSelecionado);
                        }
                        // Intervalo de 1 segundos antes do próximo turno
                        setTimeout(() => {
                            iniciarTurno(jogador, oponente);
                        }, 1000);
                    })();
                }
            }
        }
    }
    movesContainer.addEventListener("click", selecionaAtaque);
}


// Inicia o turno verificando se ambos os combatentes estão vivos e aguardando a escolha do jogador
function iniciarTurno(jogador, oponente) {
    if (jogador.hp <= 0) {
        console.log("Você perdeu!");
        return;
    }
    if (oponente.hp <= 0) {
        console.log("Você ganhou!");
        return;
    }
    esperarAtaque(jogador, oponente);
}

function atualizarBarraVida(pokemon) {
    const barraVida = document.getElementById(`barra_${pokemon.nome.toLowerCase()}`);
    if (!barraVida) {
        console.error(`Elemento de barra de vida não encontrado para ${pokemon.nome}`);
        return;
    }
    const porcentagem = (pokemon.hp / pokemon.hpMax) * 80;
    barraVida.style.width = `${porcentagem}%`;

    // Atualiza o texto do p correspondente
    if (pokemon === jogadorEscolhido) {
        document.getElementById("quantidade_vida_player").innerText = `${pokemon.hp} / ${pokemon.hpMax}`;
    } else {
        document.getElementById("quantidade_vida_enemy").innerText = `${pokemon.hp} / ${pokemon.hpMax}`;
    }
}

function dispararAnimacaoAtaque(pokemon, tipoAnimacao) {
    const elemento = document.getElementById(`pokemon_${pokemon.nome.toLowerCase()}`);
    if (!elemento) {
        console.error(`Elemento do Pokémon ${pokemon.nome} não encontrado para animação`);
        return;
    }

    if (tipoAnimacao === 'pulo') {
        elemento.classList.add('attack-pulo');
        setTimeout(() => {
            elemento.classList.remove('attack-pulo');
        }, 500);
    } else if (tipoAnimacao === 'tremor') {
        elemento.classList.add('attack-tremor');
        setTimeout(() => {
            elemento.classList.remove('attack-tremor');
        }, 500);
    } else {
        console.log(`não tem animação para ${tipoAnimacao}`);
        // Se não houver animação, continua normalmente
    }
}


// Função para abrir o modal de status, exibindo os status base do Pokémon
function abrirModalStatus(pokemon) {
    if (pokemon) {
        document.getElementById("modal_status").style.display = "flex";
        document.getElementById("modal_nome").innerText = pokemon.nome;
        document.getElementById("modal_sprite").src = pokemon.getSprite();
        // Usa os status base armazenados em pokemon.statsBase
        document.getElementById("modal_hp").innerText = pokemon.statsBase.hp;
        document.getElementById("modal_attack").innerText = pokemon.statsBase.attack;
        document.getElementById("modal_defense").innerText = pokemon.statsBase.defense;
        document.getElementById("modal_spAttack").innerText = pokemon.statsBase.spAttack;
        document.getElementById("modal_spDefense").innerText = pokemon.statsBase.spDefense;
        document.getElementById("modal_speed").innerText = pokemon.statsBase.speed;

        let movesList = document.getElementById("modal_moves");
        movesList.innerHTML = "";
        pokemon.moves.forEach(move => {
            let li = document.createElement("li");
            li.innerText = `${move.nome} - ${move.type} (${move.dano} de dano)`;
            movesList.appendChild(li);
        });
    }
}

document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("modal_status").style.display = "none";
});


function dispararAnimacaoFlamethrower(atacante) {
    return new Promise((resolve) => {
        const canvas = document.getElementById('fireProjectile');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';

        // Calcula as posições de origem (atacante) e destino (inimigo)
        const playerElem = document.getElementById(`pokemon_${atacante.nome.toLowerCase()}`);
        const enemyElem = document.querySelector('.card_pokemon_rival');
        if (!playerElem || !enemyElem) {
            resolve();
            return;
        }
        const startRect = playerElem.getBoundingClientRect();
        const endRect = enemyElem.getBoundingClientRect();
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;

        let startTime = null;
        const duration = 1000; // duração total da animação (ms)

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Define o número de segmentos que formarão o "fio" de fogo
            const steps = 30;
            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                // Posição base no trajeto linear
                const baseX = startX + (endX - startX) * t;
                const baseY = startY + (endY - startY) * t;
                // Aplica um deslocamento aleatório para simular o movimento natural do fogo
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                const flameX = baseX + offsetX;
                const flameY = baseY + offsetY;
                // O fogo vai engrossando conforme se aproxima do alvo
                const radius = 5 + 10 * t;
                // Cria um gradiente radial para simular a cor do fogo
                const gradient = ctx.createRadialGradient(flameX, flameY, 0, flameX, flameY, radius);
                gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');   // centro amarelo
                gradient.addColorStop(0.3, 'rgba(255, 150, 0, 0.8)'); // laranja
                gradient.addColorStop(0.6, 'rgba(255, 50, 0, 0.6)');  // vermelho
                gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');       // transparente nas bordas
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(flameX, flameY, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
                resolve();
            }
        }
        requestAnimationFrame(animate);
    });
}

/**
 * Função genérica para disparar animação de ataque.
 * @param {Object} atacante - O objeto do Pokémon atacante.
 * @param {Array} gradientStops - Array de objetos definindo os pontos do gradiente, por exemplo:
 *   [ { offset: 0, color: 'rgba(255, 255, 0, 1)' },
 *     { offset: 0.3, color: 'rgba(255, 150, 0, 0.8)' },
 *     { offset: 0.6, color: 'rgba(255, 50, 0, 0.6)' },
 *     { offset: 1, color: 'rgba(255, 0, 0, 0)' } ]
 * @param {Number} [duration=1000] - Duração da animação em milissegundos.
 * @param {Number} [steps=30] - Número de segmentos que formarão o efeito.
 * @returns {Promise} - Resolve ao fim da animação.
 */
function dispararAnimacaoAtaque(atacante, gradientStops, duration = 1000, steps = 30) {
    return new Promise((resolve) => {
        const canvas = document.getElementById('fireProjectile');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';

        // Define os elementos do atacante e do alvo:
        const atacanteElem = document.getElementById(`pokemon_${atacante.nome.toLowerCase()}`);
        // Se o atacante não for o Pokémon escolhido pelo jogador, o alvo é o card do player; caso contrário, o alvo é o card do enemy.
        const alvoElem = (jogadorEscolhido && atacante.nome.toLowerCase() !== jogadorEscolhido.nome.toLowerCase())
            ? document.querySelector('.card_pokemon_escolhido')
            : document.querySelector('.card_pokemon_rival');

        if (!atacanteElem || !alvoElem) {
            resolve();
            return;
        }
        const startRect = atacanteElem.getBoundingClientRect();
        const endRect = alvoElem.getBoundingClientRect();
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;

        let startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Desenha os segmentos do efeito com base nos "steps"
            for (let i = 0; i < steps; i++) {
                const t = i / steps;
                const baseX = startX + (endX - startX) * t;
                const baseY = startY + (endY - startY) * t;
                // Aplica deslocamento aleatório para dar um efeito natural
                const offsetX = (Math.random() - 0.5) * 20;
                const offsetY = (Math.random() - 0.5) * 20;
                const flameX = baseX + offsetX;
                const flameY = baseY + offsetY;
                // O "tamanho" do efeito aumenta conforme t
                const radius = 5 + 10 * t;
                // Cria o gradiente utilizando os pontos passados
                const gradient = ctx.createRadialGradient(flameX, flameY, 0, flameX, flameY, radius);
                gradientStops.forEach(stop => {
                    gradient.addColorStop(stop.offset, stop.color);
                });
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(flameX, flameY, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}
