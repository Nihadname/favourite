let heartAll = document.querySelectorAll(".fa-heart")
heartAll.forEach(item => {
    item.addEventListener("click", function (ev) {
        ev.preventDefault();

        let productId = this.parentElement.getAttribute("data-id");
        let productsArr = JSON.parse(localStorage.getItem("favoruties")) || [];
        
        let productIndex = productsArr.findIndex(p => p.id == productId);

        // Toggle heart color and add/remove from favorites
        if (item.style.color == 'gray') {
            item.style.color = 'red';
            // If not found, add the product
            if (productIndex === -1) {
                productsArr.push({
                    id: productId,
                    name: this.parentElement.firstElementChild.innerText,
                    desc: this.previousElementSibling.previousElementSibling.previousElementSibling.innerText,
                    price: this.previousElementSibling.innerText.split("$")[0],
                    image: this.parentElement.previousElementSibling.getAttribute("src")
                });
            }
        } else {
            item.style.color = 'gray';
            // If found, remove the product
            if (productIndex !== -1) {
                productsArr.splice(productIndex, 1);
            }
        }

        localStorage.setItem("favoruties", JSON.stringify(productsArr));
        calculationBasketCount();
    });
});

function calculationBasketCount() {
    let basket = JSON.parse(localStorage.getItem("favoruties")) || [];
    let countOfHeart = document.querySelector(".count");
    countOfHeart.innerText = basket.length;
};
