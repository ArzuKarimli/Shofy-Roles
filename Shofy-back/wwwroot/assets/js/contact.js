"use strict";
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