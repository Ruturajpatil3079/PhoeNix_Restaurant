'use strict';

// Preload Section and back to top btn

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load",function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded")
})


// event listeners

const addEventListener = function (elements, eventType, callback) {
    for(let i=0,len = elements.length;i<len;i++)
    {
        elements[i].addEventListener(eventType,callback)
    }
}

//navbar

const navbar = document.querySelector("[data-navbar]")
const navTogglers = document.querySelectorAll("[data-nav-toggler]")
const overlay = document.querySelector("[data-overlay]")

const toggleNavbar  = function (){
    navbar.classList.toggle('active')
    overlay.classList.toggle('active')
    document.body.classList.toggle("nav-active")
}


// addEventOnElements(navTogglers,"click", toggleNavbar) -- Work hot nahi
addEventListener(navTogglers,"click", toggleNavbar)





//Header

const header = document.querySelector("[data-header]")
const backTopBtn = document.querySelector("[data-back-top-btn]")

let lastScrollPos = 0;

const hideHeader = function(){
    const isScrollbottom = lastScrollPos < window.scrollY;
    if(isScrollbottom){
        header.classList.add("hide")
    }else {
        header.classList.remove("hide")
    }
    lastScrollPos = window.scrollY;
}


window.addEventListener("scroll", function(){
    if(window.scrollY >= 50){
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    } else {
        header.classList.remove("active")
        backTopBtn.classList.remove("active")
    }
});



// Slider Section 
// 1. with Buttons

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]")
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]")
const heroSliderNextBtn = document.querySelector("[data-next-btn]")

let slide = 0;

let lastActiveSlide = heroSliderItems[0];

const updateSliderPos = function (){
    lastActiveSlide.classList.remove("active");
    heroSliderItems[slide].classList.add("active");
    lastActiveSlide = heroSliderItems[slide];
}

const slideNext = function (){
    if(slide >= heroSliderItems.length -1){
        slide = 0;
    } else{
        slide++
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click" , slideNext)


const slidePrev = function (){
    if(slide <= 0 ){
        slide = heroSliderItems.length -1 ;
    }else{
        slide--;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev)

// Slider Section 
// 2. auto slide

let autoSlideInterval;

const autoSlide = function(){
    autoSlideInterval = setInterval(function(){
        slideNext();        
    },6000)
}

addEventListener([heroSliderNextBtn,heroSliderPrevBtn], "mouseover", function(){
    clearInterval(autoSlideInterval);
});

addEventListener([heroSliderNextBtn,heroSliderPrevBtn], "mouseout", autoSlide)

window.addEventListener("load" ,autoSlide);



// Paralalx Effect


const parallaxItems = document.querySelectorAll("[data-parallax-item]");
// const parallaxSpeed = 10; // or set your desired speed

let x, y;

window.addEventListener("mousemove", function (event) {
    x = (event.clientX / window.innerWidth * 15) - 3;
    y = (event.clientY / window.innerHeight * 15) - 3;

    // Reverse the number
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        const speed = Number(parallaxItems[i].dataset.parallaxSpeed) || parallaxSpeed;
        const translateX = x * speed;
        const translateY = y * speed;

        parallaxItems[i].style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;
    }
});


