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

//shop-sticky

window.addEventListener("scroll", function() {
    var header = document.querySelector(".header-sticky-shop");
    if (window.scrollY > 0) {
        header.classList.add("visible");
    } else {
        header.classList.remove("visible");
    }
});


//range
const min = document.querySelector('.min-range-item');
const max = document.querySelector('.max-range-item');
const rangeBlock = document.querySelector('.range');
let fill = document.querySelector('.range-fill');
const infoBox = document.querySelector('.info');

// блоки для вывода текущих параметров сортировки по цене (min - max)
let minInfo = document.querySelector('.min-price');
let maxInfo = document.querySelector('.max-price');

// получаем настройки из data аттрибутов
const dataWidth = +rangeBlock.dataset.width;
const dataType = rangeBlock.dataset.type;
const dataUnits = rangeBlock.dataset.units;
const dataMinVal = +min.dataset.value;
const dataMaxVal = +max.dataset.value;

// получаем начальную точку блока range
const startX = rangeBlock.getBoundingClientRect().x;

// если 2 ползука берём их ширину для расчетов, чтоб не наезжали друг на друга
let shiftMax = max.clientWidth;
let shiftMin = min.clientWidth;

// проверяем настрйки типа, если одинарный - убираем минимальный ползунок
if (dataType === 'single') {
  min.style.display = 'none';
  document.querySelector('.min-box').style.display = 'none';
  shiftMin = 0;
}
if (dataType === 'duble') {
  min.style.display = 'block';
  document.querySelector('.min-box').style.display = 'block';
}

// параметры ползунков
let minValue = startX;
let maxValue = startX + dataWidth - shiftMax;

// задаем стили их дата атрибутов
rangeBlock.style.width = dataWidth + 'px';
infoBox.style.width = dataWidth + 'px';
minInfo.insertAdjacentHTML('beforebegin', dataUnits);
minInfo.insertAdjacentHTML('afterbegin', dataMinVal);
maxInfo.insertAdjacentHTML('beforebegin', dataUnits);
maxInfo.insertAdjacentHTML('afterbegin', dataMaxVal);

// задаем инлайново стили, чтобы потом былм данные
min.style.left = 0 + 'px';
max.style.left = dataWidth - shiftMax + 'px';

/**
 * запускаем функцию при нажатии кнопки мыши
 * @param event {Event} событие
 */
const check = (event) => {

    // чтобы не терять таргет - отслеживаем тот ползунок, на котором было событие mousedown
    let targetMain = event.target;

    // корректные значения допустимые для перемещения ползунка, используются дальше
    let currentMaxValue, currentMinValue;

    /**
     * отслеживаем перемещение мыши и вычисляем координаты ползунка)
     * @param event {Event} событие
     */
    const move = (event) => {

        // у touch события массив эвентов, сводим к одной переменой этим условием
        let e;
        (event.type === 'touchmove') ? e = event.touches[0] : e = event;
        
        // если таргет максимальное значение
        if (targetMain === max) {
            currentMaxValue = maxValue;
            currentMinValue = parseInt(min.style.left) + shiftMin + startX;
        }

        // если таргет минимальное значение
        if (targetMain === min) {
            currentMinValue = minValue;
            currentMaxValue = parseInt(max.style.left) - shiftMax + startX;
        }

        // меняем положение активного ползунка от края и до другого ползунка
        if (e.clientX - (shiftMin / 2) > currentMinValue && e.clientX - (shiftMax / 2) < currentMaxValue) {
            targetMain.style.left = e.clientX - startX - (shiftMax / 2) + 'px';
        } else if (e.clientX < currentMinValue && targetMain === min) {
            targetMain.style.left = 0 + 'px';
        } else if (e.clientX > currentMaxValue && targetMain === max) {
            targetMain.style.left = dataWidth - shiftMax + 'px';
        } else if (e.clientX < currentMinValue && targetMain === max && shiftMin === 0) {
          targetMain.style.left = 0 + 'px';
          }

        // изменяем зарисовку между ползунками
        fill.style.left = min.style.left;
        fill.style.width = parseInt(max.style.left) - parseInt(min.style.left) + shiftMax + 'px';

        // выводим информацию о выбранном диапазоне цен
        let targetPrice;
        (targetMain === max) ? targetPrice = maxInfo : targetPrice = minInfo;
        targetPrice.textContent = parseInt(targetMain.style.left) * (dataMaxVal - dataMinVal ) / (dataWidth - shiftMax) + dataMinVal + '';
    }

    // вешаем слушатель на движение мыши по всему документу
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    /**
     * если отпустили кнопку - удаляем слушатели на перемещение мыши
     */
    let mouseUpFn = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
    }

    // ждем отпускания лкм чтобы убить слушатель движения мыши
    document.addEventListener('mouseup', mouseUpFn);
    document.addEventListener('touchend', mouseUpFn);
}

rangeBlock.addEventListener('mousedown', check);
rangeBlock.addEventListener('touchstart', check);

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