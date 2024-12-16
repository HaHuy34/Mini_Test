  AOS.init();
// Quantity
document.addEventListener('DOMContentLoaded', () => {
  const minusButton = document.querySelector('.minus');
  const plusButton = document.querySelector('.plus');
  const valueDisplay = document.querySelector('.value-display');

  const min = 1;
  const max = 10;

  const updateButtons = () => {
      const value = parseInt(valueDisplay.textContent, 10);
      minusButton.disabled = value <= min;
      plusButton.disabled = value >= max;
  };

  minusButton.addEventListener('click', () => {
      const currentValue = parseInt(valueDisplay.textContent, 10);
      if (!isNaN(currentValue) && currentValue > min) {
          valueDisplay.textContent = currentValue - 1;
          updateButtons();
      }
  });

  plusButton.addEventListener('click', () => {
      const currentValue = parseInt(valueDisplay.textContent, 10);
      if (!isNaN(currentValue) && currentValue < max) {
          valueDisplay.textContent = currentValue + 1;
          updateButtons();
      }
  });

  updateButtons(); // Initialize buttons state
});


//Cart-shopping
const closeCart = document.getElementById("close-cart");
const shoppingCart = document.getElementById("cart-shoppping-as");
const countNumber = document.getElementById("countnum");


// Close the shopping cart
closeCart.addEventListener("click", () => {
    shoppingCart.classList.remove("visible");
});

// Toggle the shopping cart visibility
countNumber.addEventListener("click", () => {
    shoppingCart.classList.toggle("visible");
});


// Call API
document.addEventListener("DOMContentLoaded", async () => {
    const rowContainer = document.querySelector(".pr-rlisst");
  
    // Example API URL (replace with your actual API endpoint)
    const apiUrl = "https://api-mini-shop.vercel.app/Female";
  
    try {
      // Fetch data from the API
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data,"datât");// Kiểm tra nội dung phản hồi

      
  
      // Render products
      data.forEach((product) => {
        const productCard = `
                  <div class="col-sm-6 col-md-4 col-lg-3"  data-aos="fade-up">
                          <div class="cart-main">
                              <div class="carrt-image-main">
                                  <div href="#" class="image-cart-1">
                                      <img src="${product.image}" alt="${product.image}">
                                  </div>
                                  <div href="#" class="image-cart-2">
                                      <img src="${product.imageChild.imageChild01}" alt="Ảnh 1">
                                  </div>
                                  
                              </div>
                              <div class="cart-title">
                                  <div class="style-cart">
                                      <div class="color">
                                          <input type="checkbox">
                                          <input type="checkbox">
                                      </div>
                                      <i class='bx bx-heart'></i>
                                  </div>
                                  <h4 class="name-cart">${product.title}</h4>
                                  <div class="price-product">
                                      <span>${product.price.toLocaleString('vi-VN')}<sup>đ</sup></span>
                                      <a class="add-to-cart">
                                          <i class='bx bx-shopping-bag'></i>
                                      </a>
                                  </div>
                              </div>
                              <div class="item-new">NEW</div>
                          </div>
                      </div>
              `;
        rowContainer.innerHTML += productCard;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
