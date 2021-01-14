const navSlide= ()=> {
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navlinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click',()=>{
    nav.classList.toggle('nav-active');
    });

navlinks.forEach((link,index) =>{
        link.style.animation = `navlinkFade 0.5s ease forwards ${index / 7 + 1.2}s`;
        console.log(index/7);    
        
})
}
navSlide();

//Button functions
function openURI(uri_link) {
  window.location.href = uri_link;
}

function openNewTab(link) {
  window.open(link);
}


