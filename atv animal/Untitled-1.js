// ====================== ELEMENTOS ======================
const criatura   = document.getElementById("bichinho");
const avatar     = document.getElementById("avatar");
const cardLeao   = document.getElementById("cardLeao");   // ← card com o cenário

// Barras
const vidaBar  = document.getElementById("vidaBar");
const fomeBar  = document.getElementById("fomeBar");
const humorBar = document.getElementById("humorBar");

// ====================== ESTADOS ======================
const estados = {
    normal:    "IhTca.png",
    brabo:     "nEuKL.png",
    morto:     "gs65g.png",
    namorando: "uRYMe.png",
    comida:    "hMHDO.png"
};

const fundoDia   = "L7Lw2.jpg";
const fundoNoite = "y6Va5.jpg";

// ====================== VARIÁVEIS ======================
let contador = 0;
let intervalo = null;
let leaoMorto = false;
let horas = 0;
let intervaloFundo = null;

let vida = 100;
let fome = 100;
let humor = 100;

// ====================== FUNÇÕES ======================
function atualizarBarras() {
    vidaBar.value  = vida;
    fomeBar.value  = fome;
    humorBar.value = humor;
}

function morrer() {
    leaoMorto = true;
    criatura.src = estados.morto;
    document.body.classList.add("grayscale");
    alert("☠️ Seu Leãozão morreu... Recarregue a página para tentar novamente.");
}

function alimentar() {
    if (leaoMorto) return;
    criatura.src = estados.comida;
    fome = Math.min(100, fome + 30);
    humor = Math.min(100, humor + 15);
    atualizarBarras();
    setTimeout(() => {
        if (!leaoMorto) criatura.src = estados.normal;
    }, 1200);
}

// ====================== CONTROLADOR ======================
function controlador() {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => {
        if (leaoMorto) return;
        contador++;
        fome -= 2;
        humor -= 1.2;
        if (fome <= 25) vida -= 3.5;
        if (humor <= 20) vida -= 2;
        if (vida < 0) vida = 0;
        if (fome < 0) fome = 0;
        if (humor < 0) humor = 0;
        atualizarBarras();
        if (vida <= 0) morrer();
        else if (fome < 30) criatura.src = estados.brabo;
        else criatura.src = estados.normal;
    }, 1000);
}

// ====================== FUNDO DO CENÁRIO (só no card central) ======================
function atualizarFundo() {
    if (intervaloFundo) clearInterval(intervaloFundo);
    intervaloFundo = setInterval(() => {
        horas++;
        if (horas >= 12) {
            cardLeao.style.backgroundImage = `url('${fundoNoite}')`;
        } else {
            cardLeao.style.backgroundImage = `url('${fundoDia}')`;
        }
        if (horas >= 24) horas = 0;
    }, 3000);
}

// ====================== OBSERVER ======================
const observer = new MutationObserver(() => {
    avatar.src = criatura.src;
});
observer.observe(criatura, { attributes: true, attributeFilter: ["src"] });

// ====================== INICIALIZAÇÃO ======================
function init() {
    cardLeao.style.backgroundImage = `url('${fundoDia}')`;
    atualizarBarras();
    controlador();
    atualizarFundo();
}

init();