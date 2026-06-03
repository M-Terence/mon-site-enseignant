const maintenant = new Date();
const jour = maintenant.getDay();
const heure = maintenant.getHours();

// Seul jeudi avant 15h affiche la semaine courante
const estSemaineCourante = (jour === 4 && heure < 15);

if (estSemaineCourante) {
  document.getElementById("semaine-courante").style.display = "block";
  document.getElementById("semaine-suivante").style.display = "none";
} else {
  document.getElementById("semaine-courante").style.display = "none";
  document.getElementById("semaine-suivante").style.display = "block";
}