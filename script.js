let hamburger = document.querySelector(".hamburger");
let navMenu = document.querySelector(".nav-menu");
let bar = document.querySelectorAll(".bar");
let menu = document.querySelector(".nav-menu").style;

let dis = () => {
  if (menu.display === "none") {
    bar[1].style.opacity = 0;
    bar[0].style.transform = "translateY(8px) rotate(45deg)";
    bar[2].style.transform = "translateY(-8px) rotate(-45deg)";
    menu.display = "flex";
  } else {
    bar[1].style.opacity = 1;
    bar[0].style.transform = "translateY(0px) rotate(0deg)";
    bar[2].style.transform = "translateY(0px) rotate(0deg)";
    menu.display = "none";
  }
};
