"use strict";


let dropdownMenus = document.querySelectorAll(".dropdown1");
dropdownMenus.forEach(function(dropdownMenu) {
    dropdownMenu.addEventListener("click", function(e) {
        e.preventDefault();
        
     
        let dropdownUp = this.querySelector("[class^='dropdown-up']");

   
        dropdownMenus.forEach(function(menu) {
            let otherDropdownUp = menu.querySelector("[class^='dropdown-up']");
            if (dropdownUp !== otherDropdownUp) {
                otherDropdownUp.classList.add("d-none");
            }
        });

        if (dropdownUp.classList.contains("d-none")) {
            dropdownUp.classList.remove("d-none");
        } else {
            dropdownUp.classList.add("d-none");
        }
    });
});


//sticky-menu

window.addEventListener("scroll", function() {
    var header = document.querySelector(".header-sticky-shop");
    if (window.scrollY > 0) {
        header.classList.add("visible");
    } else {
        header.classList.remove("visible");
    }
});

//product-tab

let btns=document.querySelectorAll(".nav-btn");



for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {

       btns.forEach(btn => btn.classList.remove("active"));

       btns[i].classList.add("active");

       let newSrc = btns[i].querySelector("img").src;
       document.querySelector(".image img").src = newSrc;
    });
 }

 //tab-menu

 let tabBtns = document.querySelectorAll(".tab-btns .tab-btn");
let tabContents = document.querySelectorAll(".tabs-product .tab");

tabBtns.forEach((tab, index) => {
    tab.addEventListener("click", function(e) {
        e.preventDefault();

        tabBtns.forEach(tab => {
            tab.classList.remove("active");

        this.classList.add("active");

        tabContents.forEach(content => {
            content.style.display = "none";
        });

        tabContents[index].style.display = "block";
    });
});
});