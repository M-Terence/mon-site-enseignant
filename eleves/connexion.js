// Liste des élèves — prénom en minuscules, mot de passe, fichier html
const eleves = [
  { prenom: "alice", mdp: "fleur23", page: "alice.html" },
];

function seConnecter() {
  const prenom = document.getElementById("prenom").value.toLowerCase().trim();
  const mdp = document.getElementById("mdp").value.trim();
  const erreur = document.getElementById("erreur");

  // Cherche l'élève dans la liste
  const eleve = eleves.find(e => e.prenom === prenom && e.mdp === mdp);

  if (eleve) {
    // Mémorise la connexion pour cette session
  sessionStorage.setItem("eleveConnecte", eleve.prenom.charAt(0).toUpperCase() + eleve.prenom.slice(1));
    // Redirige vers sa page
    window.location.href = eleve.page;
  } else {
    erreur.style.display = "block";
  }

}

// Permettre la touche Entrée pour valider
document.getElementById("mdp").addEventListener("keypress", function(e) {
  if (e.key === "Enter") seConnecter();
});
