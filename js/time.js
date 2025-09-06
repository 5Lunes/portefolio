function updateClock() {
    const options = { timeZone: "Europe/Brussels", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const formatter = new Intl.DateTimeFormat("fr-FR", options);
    document.getElementById("clock").textContent = formatter.format(new Date()) + " UTC+1";
    document.getElementById("clock_mobile").textContent = formatter.format(new Date());
}
setInterval(updateClock, 1000);
updateClock();

/* Open */
function openNav() {
    document.getElementById("nav_mobile").style.height = "100%";
  }
  
  /* Close */
  function closeNav() {
    document.getElementById("nav_mobile").style.height = "0%";
  } 