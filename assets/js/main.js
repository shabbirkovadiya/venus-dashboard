
const sideBar = document.getElementById('sideBar');
const menuBar = document.getElementById('menuBar');

menuBar.addEventListener('click', () => {
  sideBar.style.display = "block";
});

document.addEventListener('click', (event) => {
  const isClickInsideSidebar = sideBar.contains(event.target);
  const isClickOnMenuBar = menuBar.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnMenuBar) {
    sideBar.style.display = "none";
  }
});
