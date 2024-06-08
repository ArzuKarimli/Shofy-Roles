"use strict";

//scroll-menu
window.addEventListener("scroll", function() {
    var header = document.querySelector(".header-sticky");
    if (window.scrollY > 0) {
        header.classList.add("visible");
    } else {
        header.classList.remove("visible");
    }
});


//header-dropdown
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

//header-down
let selectMenu = document.querySelector(".select-box .select");
let selectDropdown = document.querySelector(".select-dropdown");
let downIcon=document.querySelector(".select-box .select .down-icon")

selectMenu.addEventListener("click", function() {
    if (selectDropdown.classList.contains("d-none")) {
        selectDropdown.classList.remove("d-none");
        downIcon.style.rotate="-180deg";
    } else {
        selectDropdown.classList.add("d-none");
        downIcon.style.rotate="0deg";
    }
});


let menuDropdown=document.querySelector(".dropdown-m");
let menu=document.querySelector(".menu-header");
menu.addEventListener("click",function(){
    if(menuDropdown.classList.contains("d-none")){
        menuDropdown.classList.remove("d-none")
    }else{
        menuDropdown.classList.add("d-none")
    }
})


//slider

document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll("#slider .slider-box");
    const dots = document.querySelectorAll(".dotm");

    showBanner(0);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            showBanner(index);
        });
    });

    function showBanner(index) {
        boxes.forEach((box, i) => {
            if (i === index) {
                box.classList.add('active');
                dots[i].classList.add('active');
                dots[i].style.backgroundColor = "white"; 
            } else {
                box.classList.remove('active');
                dots[i].classList.remove('active');
                dots[i].style.backgroundColor = "#fff3"; 
            }
        });
    }
});




//tab-menu
let tabBtns = document.querySelectorAll(".trending-tab .tab");
let tabContents = document.querySelectorAll(".trend-products");

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


//days-counter
  
   const countdownDate = new Date();
   countdownDate.setDate(countdownDate.getDate() + 118);

   const countdown = setInterval(updateCountdown, 1000);

   function updateCountdown() {
       const currentDate = new Date();
       const difference = countdownDate - currentDate;

       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
       const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
       const seconds = Math.floor((difference % (1000 * 60)) / 1000);

       const spans = document.querySelectorAll('.product-timer span');

       spans[0].innerText = formatTime(days);
       spans[1].innerText = formatTime(hours);
       spans[2].innerText = formatTime(minutes);
       spans[3].innerText = formatTime(seconds);

       if (difference < 0) {
           clearInterval(countdown);
          
           spans.forEach(span => span.innerText = "00");
       }
   }

   function formatTime(time) {
       return time < 10 ? `0${time}` : time;
   }

   updateCountdown();



   $(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });

//two-slider
  document.addEventListener("DOMContentLoaded", function() {
    const banners = document.querySelectorAll(".banner");
    const dots = document.querySelectorAll(".dot");


    showBanner(0);


    dots.forEach((dot, index) => {
        dot.addEventListener("click", function() {
            showBanner(index);
        });
    });

    function showBanner(index) {
        banners.forEach((box, i) => {
            if (i === index) {
                box.classList.add('active');
                dots[i].classList.add('active');
                dots[i].style.backgroundColor = "white"; 
            } else {
                box.classList.remove('active');
                dots[i].classList.remove('active');
                dots[i].style.backgroundColor = "#fff3"; 
            }
        });
    }
});

//card-slider
$(document).ready(function(){
    $('.cards').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: false, 
        nextArrow: false, 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

//sidebar


    let basketBtn = document.querySelectorAll(".open-btn");
    
    let sidebarCloseBtn = document.querySelectorAll(".close-btn .fa-x");
    
    let sidebar = document.querySelector(".sidebar");
  
basketBtn.forEach(btn => {
    btn.addEventListener("click",function(){
        if (sidebar.classList.contains("move-sidebar")) {
            sidebar.classList.remove("move-sidebar");
          }
    })
});

   sidebarCloseBtn.forEach(btn => {
    btn.addEventListener("click",function(){
        if (!sidebar.classList.contains("move-sidebar")) {
            sidebar.classList.add("move-sidebar");
          }
    })
   });

    //basket

    let basket = [];


    if (JSON.parse(localStorage.getItem("basket")) === null) {
        localStorage.setItem("basket", JSON.stringify(basket));
    } else {
        basket = JSON.parse(localStorage.getItem("basket"));
    }
    
    function updateBasketCount() {
        let basketCount = basket.reduce((total, item) => total + item.count, 0);
        document.querySelectorAll(".count-basket span").forEach(span => {
            span.innerText = basketCount;
        });
        updateSidebarOnBasketChange();
    }
    
    
    function assignDataIds() {
        let productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.dataset.id = index + 1;
        });
    }
    
    document.querySelectorAll(".card-action .basket").forEach(btn => {
        btn.addEventListener("click", function (e) {
            let productId = parseInt(this.parentNode.parentNode.parentNode.getAttribute("data-id"));
            let productName = this.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.innerText;       
            let productImage = this.parentNode.nextElementSibling.getAttribute("src");        
            let productPrice = parseFloat(this.parentNode.parentNode.nextElementSibling.lastElementChild.lastElementChild.textContent);
            
            let existProduct = basket.find(m => m.id == productId);
    
            if (existProduct !== undefined) {
                existProduct.count++;
            } else {
                basket.push({
                    id: productId,
                    name: productName,
                    image: productImage,
                    price: productPrice,
                    count: 1
                });
            }
    
            updateBasketCount();
            updateSidebarOnBasketChange(); 
            localStorage.setItem("basket", JSON.stringify(basket));
        });
    });

    document.querySelectorAll(".card-action .basket").forEach(btn => {
        btn.addEventListener("click", function (e) {          
            this.style.backgroundColor = "#0989FF";   
            let basketImg = this.querySelector("img");
            basketImg.style.filter = "invert(100%)";
    
        });
    });
    
    //wishlist
    let wishlist = [];
    let wishlistCount = 0; 
    
    if (JSON.parse(localStorage.getItem("wishlist")) !== null) {
        wishlist = JSON.parse(localStorage.getItem("wishlist"));
        wishlistCount = wishlist.length;
        updateWishlistCount();
    }else{
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
 
    
    function updateWishlistCount() {
        document.querySelectorAll(".count-wish span").forEach(span => {
            span.innerText = wishlistCount;
        });
    }
    
    function assignDataIds() {
        let productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.dataset.id = index + 1;
        });
    }
    document.querySelectorAll(".card-action .heart").forEach((heart, index) => {
        heart.addEventListener("click", function (e) {
            let productId = index + 1;
            let existingIndex = wishlist.findIndex(item => item.id === productId);           
            let productName = this.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.innerText;                  
            let productImage = this.parentNode.nextElementSibling.getAttribute("src");                    
            let productPrice = parseFloat(this.parentNode.parentNode.nextElementSibling.lastElementChild.lastElementChild.textContent);
                    
            if (existingIndex !== -1) {
                wishlist.splice(existingIndex, 1);
                wishlistCount--;
                if (this.style.backgroundColor !== "") {
                    this.style.backgroundColor = "";
                    let wishlistImg = this.querySelector("img");
                    wishlistImg.style.filter = "";
                }
            } else {
                wishlist.push({
                    id: productId,
                    name: productName,
                    image: productImage,
                    price: productPrice,
                });
                wishlistCount++;
                this.style.backgroundColor = "#0989FF";
                let wishlistImg = this.querySelector("img");
                wishlistImg.style.filter = "invert(100%)";
            }            
            updateWishlistCount(); 
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        });
    });
    
    
    
    // document.querySelectorAll(".card-action .heart").forEach(btn => {
    //     btn.addEventListener("click", function (e) {          
    //         this.style.backgroundColor = "#0989FF";   
    //         let wishlistImg = this.querySelector("img");
    //         wishlistImg.style.filter = "invert(100%)";
    
    //     });
    // });

        assignDataIds();
        updateBasketCount();

function displayCartInSidebar() {
    let sidebarContent = document.querySelector('.full-basket');
    if (basket.length > 0) {
        let cartItems = '';

        basket.forEach(item => {
            cartItems += `
            <div class="inbasket">
                <div class="product-img"><img src="${item.image}" alt=""></div>
                <div class="product-name"><a href="">${item.name}</a>
                    <div class="product-price">
                        <span>${item.price * item.count}</span><span>x${item.count}</span>
                    </div>
                </div>
                <div class="delete-product">
                    <i class="fa-solid fa-x delete-icon" data-id="${item.id}"></i>
                </div>
            </div>`;
        });

        let total = basket.reduce((acc, curr) => acc + (curr.price * curr.count), 0);

        sidebarContent.innerHTML = `
        ${cartItems}
        <div class="subtotal">
            <div class="total-price">
                <p>Subtotal:</p>
                <span data-id="">${total}</span>
            </div>
            <div class="checkout-btn">
                <a href="./cart.html" class="view-cart">View Cart</a>
                <a href="#" class="checkout">Checkout</a>
            </div>
        </div>`;
    } else {
        
        sidebarContent.innerHTML = `
        <div class="empty-basket">
            <div class="empty-cart">
                <img src="./assets/images/empty-cart.png" alt="">
            </div>
            <p>Your Cart is empty</p>
            <a href="./shop.html">
                <button class="shop-btn">Go To Shop</button>
            </a>
        </div>`;
    }
}

function updateSidebarOnBasketChange() {
    displayCartInSidebar();
    localStorage.setItem("basket", JSON.stringify(basket));
}

displayCartInSidebar();

    

// function removeProductFromCart(productId) {

//     basket = basket.filter(item => item.id !== productId);

//     localStorage.setItem("basket", JSON.stringify(basket));

//     displayCartInSidebar();
//     updateBasketCount();
//     updateSidebarOnBasketChange();
// }

document.querySelectorAll(".delete-icon").forEach(icon => {
    icon.addEventListener("click", function () {
        basket = basket.filter(m => m.id != parseInt(this.getAttribute("data-id")));
        localStorage.setItem("basket", JSON.stringify(basket));
        this.parentNode.parentNode.remove();   
        displayCartInSidebar();
        updateBasketCount();
        updateSidebarOnBasketChange();

    });
});





