// Vérification — l'élève doit être passé par la connexion
const eleveConnecte = sessionStorage.getItem("eleveConnecte");
if (!eleveConnecte || eleveConnecte !== document.title) {
  window.location.href = "../index.html";
}

const liste = document.getElementById("liste-remise");
const items = liste.querySelectorAll("li");
const messageVide = document.getElementById("remise-vide");

// Identifiant unique pour cet élève (basé sur le titre de la page)
const cleEleve = "remise-" + document.title;

// Récupère les tâches déjà cochées depuis la mémoire du navigateur
const cochees = JSON.parse(localStorage.getItem(cleEleve)) || [];

// Au chargement — cache les tâches déjà cochées
items.forEach(item => {
  const id = item.getAttribute("data-id");
  if (cochees.includes(id)) {
    item.style.display = "none";
  }
});

verifierListe();

// Au clic sur une case
liste.addEventListener("change", function(e) {
  if (e.target.type === "checkbox" && e.target.checked) {
    const li = e.target.closest("li");
    const id = li.getAttribute("data-id");

    // Petite pause avant de disparaître
    setTimeout(() => {
      li.style.display = "none";
      cochees.push(id);
      localStorage.setItem(cleEleve, JSON.stringify(cochees));
      verifierListe();
    }, 400);
  }
});

// Affiche le message si toutes les tâches sont faites
function verifierListe() {
  const restantes = liste.querySelectorAll("li:not([style*='display: none'])");
  messageVide.style.display = restantes.length === 0 ? "block" : "none";
}
