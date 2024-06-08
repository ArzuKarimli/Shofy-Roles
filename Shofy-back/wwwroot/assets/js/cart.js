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

//basket
let basket = [];

if (JSON.parse(localStorage.getItem("basket")) === null) {
    localStorage.setItem("basket", JSON.stringify(basket));
} else {
    basket = JSON.parse(localStorage.getItem("basket"));
}

function checkCartForShowDatas(basket) {
    let fullBasket = document.querySelector(".product-tables");
    let subTotalPeace=document.querySelector(".subtotal-wrapper")
    let emptyBasket = document.querySelector(".empty-table");
    
    if (basket.length == 0) {
        fullBasket.classList.add("d-none");
        subTotalPeace.classList.add("d-none")
        emptyBasket.classList.remove("d-none");

    } else {
        fullBasket.classList.remove("d-none");
        subTotalPeace.classList.remove("d-none")
        emptyBasket.classList.add("d-none");
    }
}
checkCartForShowDatas(basket);

function updateBasketCount() {
    let basketCount = basket.reduce((total, item) => total + item.count, 0);
    document.querySelectorAll(".count-basket span").forEach(span => {
        span.innerText = basketCount;
    });
}
function getGrandTotal(datas) {
    let grandTotal = 0;
    basket.forEach(data => {
        grandTotal += (data.price * data.count);
    });

    document.querySelector(".title .total-price").innerText = grandTotal;
}


getGrandTotal(basket);
function getBasketDatas() {
    let tableBody = document.querySelector("tbody");
    let datas = "";
    basket.forEach(product => {
        datas += `<tr>
        <td class="cart-image"> <img src="${product.image}" alt=""></td>
        <td class="title"><p>${product.name}</p></td>
        <td >${product.price} $</td>
        <td class="quantity"><span class="minus" data-id=${product.id}><i class="fa-solid fa-minus"></i></span> <input type="text" placeholder="${product.count}"><span class="plus" data-id=${product.id}><i class="fa-solid fa-plus"></i></span></td>
       
        <td class="delete"><span><i class="fa-solid fa-xmark data-id=${product.id} delete-icon"></i>Remove</span></td>

        
        </tr>`;
    });
    tableBody.innerHTML = datas;
}
getBasketDatas();
function updateBasketCountAndGrandTotal() {
    updateBasketCount();
    getGrandTotal(basket);
    
}
let deleteIcons = document.querySelectorAll(".delete-icon");

deleteIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        let trElement = this.closest('tr');
        let productId = parseInt(this.getAttribute("data-id"));
        basket = basket.filter(item => item.id !== productId);
        localStorage.setItem("basket", JSON.stringify(basket));
        trElement.remove();
        updateBasketCountAndGrandTotal();

    checkCartForShowDatas(basket);
    });
});




updateBasketCount();

function countProduct() {

    let plusBtns = document.querySelectorAll(".plus");
    let minusBtns = document.querySelectorAll(".minus");

    plusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            let productId = parseInt(this.getAttribute("data-id"));
            let product = basket.find(item => item.id === productId);
            product.count++;
            localStorage.setItem("basket", JSON.stringify(basket));
            updateBasketCountAndGrandTotal();
            let inputElement = this.parentNode.querySelector("input");
            inputElement.value = product.count;
        });
    });


    minusBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            let productId = parseInt(this.getAttribute("data-id"));
            let product = basket.find(item => item.id === productId);
            product.count--;

            if (product.count === 0) {
                basket = basket.filter(item => item.id !== productId);
                this.parentNode.parentNode.remove();
            }
    
            localStorage.setItem("basket", JSON.stringify(basket));
            updateBasketCountAndGrandTotal();
            let inputElement = this.parentNode.querySelector("input");
            inputElement.value = product.count;
        });
    });
    

}
countProduct();

let clearBtn = document.querySelector(".clear-btn button");
clearBtn.addEventListener("click", function () {
    basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    updateBasketCountAndGrandTotal();

    checkCartForShowDatas(basket);
    
});







