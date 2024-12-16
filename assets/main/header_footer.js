 // Hàm load file HTML
 function loadHTML(elementId, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${file}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
}

// Load header và footer khi trang đã tải
document.addEventListener("DOMContentLoaded", function () {
    loadHTML("header", "header.html");
    loadHTML("footer", "footer.html");
});


//Cart-shopping

document.addEventListener("DOMContentLoaded", function () {
    const closeCart = document.getElementById("close-cart");
    console.log(closeCart,"closeCart");
    
    const shoppingCart = document.getElementById("cart-shoppping-as");
    console.log(shoppingCart);
    
    // const countNumber = document.getElementById("countnum");
    if (closeCart) {
        closeCart.addEventListener("click", () => {
            shoppingCart?.classList.remove("visible");
            console.log("Giỏ hàng đã đóng");
            alert("1")
        });
    }
});




// // Close the shopping cart
// closeCart.addEventListener("click", () => {
//     shoppingCart.classList.remove("visible");
//     alert("1")
// });

// // Toggle the shopping cart visibility
// countNumber.addEventListener("click", () => {
//     alert("1")
//     shoppingCart.classList.toggle("visible");
// });