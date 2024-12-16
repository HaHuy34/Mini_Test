AOS.init();
// Quantity
// document.addEventListener("DOMContentLoaded", () => {
//   const minusButton = document.querySelector(".minus");
//   const plusButton = document.querySelector(".plus");
//   const valueDisplay = document.querySelector(".value-display");

//   const min = 1;
//   const max = 10;

//   const updateButtons = () => {
//     const value = parseInt(valueDisplay.textContent, 10);
//     minusButton.disabled = value <= min;
//     plusButton.disabled = value >= max;
//   };

//   minusButton.addEventListener("click", () => {
//     const currentValue = parseInt(valueDisplay.textContent, 10);
//     if (!isNaN(currentValue) && currentValue > min) {
//       valueDisplay.textContent = currentValue - 1;
//       updateButtons();
//     }
//   });

//   plusButton.addEventListener("click", () => {
//     const currentValue = parseInt(valueDisplay.textContent, 10);
//     if (!isNaN(currentValue) && currentValue < max) {
//       valueDisplay.textContent = currentValue + 1;
//       updateButtons();
//     }
//   });

//   updateButtons(); // Initialize buttons state
// });

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
  const searchInput = document.getElementById("searchInput");

  // API URL (thay bằng API thật của bạn)
  const apiUrl = "https://api-mini-shop.vercel.app/Female";

  let productsData = [];

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    productsData = await response.json();

    // Hàm render các sản phẩm
    function renderProducts(products) {
      rowContainer.innerHTML = ""; // Clear các sản phẩm hiện tại
      products.forEach((product) => {
        const productCard = `
          <div class="col-sm-6 col-md-4 col-lg-3" data-aos="fade-up">
            <div class="cart-main">
              <div class="carrt-image-main">
                <div class="image-cart-1">
                  <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="image-cart-2">
                  <img src="${product.imageChild.imageChild01}" alt="Ảnh 1">
                </div>
              </div>
              <div class="cart-title">
                
                <h4 class="name-cart">${product.title}</h4>
                <div class="price-product">
                  <span>${product.price.toLocaleString(
                    "vi-VN"
                  )}<sup>đ</sup></span>
                </div>
              </div>
              <div class="item-new">NEW</div>
              <div class="style-add">
                                
                                <a class="add-to-ca">
                                    <i class='bx bx-cart'></i> Thêm vào giỏ
                                </a>
                                <a href="SanPham.html?id=${product.id}" style="color: #000;" class="detail-plus">
                                    <i class='bx bx-plus'></i>
                                </a>
                            </div>
            </div>
          </div>
        `;
        rowContainer.insertAdjacentHTML("beforeend", productCard);
      });
    }

    // Render tất cả sản phẩm khi tải trang
    renderProducts(productsData);

    // Tìm kiếm sản phẩm
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = productsData.filter((product) => {
          return product.title.toLowerCase().includes(searchTerm);
        });

        if (filteredProducts.length === 0) {
          iziToast.error({
            title: 'Lỗi!',
            message: 'Không tìm thấy sản phẩm nào',
            position: 'topRight', // Hiển thị ở phía trên bên phải
            top: '300px',  // Cách trên 1 khoảng 50px
          });
          renderProducts(productsData);
        } else {
          renderProducts(filteredProducts);
        }

        searchInput.value = ""; // Xoá ô tìm kiếm
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    rowContainer.innerHTML = "<p>Đã có lỗi khi tải dữ liệu sản phẩm!</p>";
  }
});

//   Add To Cart
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(
    "#cart-shoppping-as .shopping-cart-product"
  );
  const cartCount = document.querySelector(".cart-total-name span");
  const numberShopping = document.querySelector(".number-shopping"); // Đối tượng giỏ hàng trong thanh điều hướng

  // Lắng nghe sự kiện "Thêm vào giỏ hàng"
  document.body.addEventListener("click", (event) => {
    if (event.target.closest(".add-to-ca")) {
      const productCard = event.target.closest(".cart-main");
      const product = {
        image: productCard.querySelector(".image-cart-1 img").src,
        imageChild: productCard.querySelector(".image-cart-2 img").src,
        title: productCard.querySelector(".name-cart").textContent.trim(),
        price: parseInt(
          productCard
            .querySelector(".price-product span")
            .textContent.replace(/[^\d]/g, ""),
          10
        ),
      };
      addToCart(product);
      
    }
  });

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const existingItem = [
      ...cartContainer.querySelectorAll(".cart-shopping-item"),
    ].find((item) => item.querySelector("h5").textContent === product.title);

    if (existingItem) {
      // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
      const quantityDisplay = existingItem.querySelector(".value-display");
      quantityDisplay.textContent =
        parseInt(quantityDisplay.textContent, 10) + 1;
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      const cartItemHTML = `
          <div class="cart-shopping-item">
            <div class="img-card-item">
              <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="title-cart-shopping">
              <h5>${product.title}</h5>
              <div class="style-cart-item">
                <div class="style-color-cart">
                  <span>Màu sắc:</span>
                  <p style="margin:0 0 0 6px;">N/A</p>
                </div>
                <div class="style-size-cart">
                  <span>Size:</span>
                  <p style="margin:0 0 0 6px;">N/A</p>
                </div>
              </div>
              <div class="count-input">
                <div class="quantity">
                  <button class="minus" aria-label="Giảm số lượng">-</button>
                  <span class="value-display">1</span>
                  <button class="plus" aria-label="Tăng số lượng">+</button>
                </div>
                <div class="total-price-quan">
                  ${product.price.toLocaleString("vi-VN")}₫
                </div>
              </div>
            </div>
          </div>
        `;
      cartContainer.innerHTML += cartItemHTML;
    }

    updateCartCount();
    updateCartSummary();
    // Đảm bảo thông báo xuất hiện sau khi cập nhật giỏ hàng
   // Hiển thị thông báo toast khi sản phẩm được thêm vào giỏ hàng
   iziToast.success({
    title: 'Thành công!',
    message: 'Sản phẩm đã được thêm vào giỏ hàng.',
    position: 'topRight', // Hiển thị ở phía trên bên phải
    top: '300%', // Cách bên trên 1 khoảng 50px
  });
   
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartCount = () => {
    const cartItems = cartContainer.querySelectorAll(".cart-shopping-item");
    const totalCount = cartItems.length; // Số sản phẩm trong giỏ hàng
    cartCount.textContent = totalCount; // Cập nhật số lượng trong giỏ hàng ở phần giỏ hàng
    numberShopping.textContent = totalCount; // Cập nhật số lượng sản phẩm trong icon giỏ hàng
  };

  // Hàm cập nhật tổng số tiền
  const updateCartSummary = () => {
    const cartItems = document.querySelectorAll(".cart-shopping-item");
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((item) => {
      const quantity = parseInt(
        item.querySelector(".value-display").textContent,
        10
      );
      const price = parseInt(
        item
          .querySelector(".total-price-quan")
          .textContent.replace(/[^\d]/g, ""),
        10
      );
      totalItems += quantity;
      totalPrice += price * quantity;
    });

    // Cập nhật tổng số tiền
    const totalPriceElement = document.querySelector(".total-price-shopping a");
    totalPriceElement.textContent = `${totalPrice.toLocaleString("vi-VN")}₫`;
  };

  // Lắng nghe sự kiện thay đổi số lượng trong giỏ hàng
  cartContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.classList.contains("minus") ||
      target.classList.contains("plus")
    ) {
      const quantityDisplay = target
        .closest(".quantity")
        .querySelector(".value-display");
      let quantity = parseInt(quantityDisplay.textContent, 10);

      if (target.classList.contains("minus") && quantity > 1) {
        quantity -= 1;
      } else if (target.classList.contains("plus")) {
        quantity += 1;
      }

      quantityDisplay.textContent = quantity;
      updateCartSummary();
      updateCartCount(); // Cập nhật lại số lượng sản phẩm trong giỏ hàng khi thay đổi số lượng
    }
  });
});

// Product Detail
// document.addEventListener("DOMContentLoaded", function() {
//   const productListContainer = document.querySelector('.pr-rlisst');

//   // URL API lấy danh sách sản phẩm
//   const productApiUrl = 'https://api-mini-shop.vercel.app/Female';

//   // Hàm lấy danh sách sản phẩm và hiển thị
//   function fetchProductList() {
//       fetch(productApiUrl)
//           .then(response => response.json())
//           .then(products => {
//               if (products && products.length > 0) {
//                   products.forEach(product => {
//                       // Tạo phần tử cho từng sản phẩm
//                       const productItem = document.createElement('div');
//                       productItem.classList.add('product-item');

//                       // Thêm link vào sản phẩm để chuyển đến trang chi tiết
//                       productItem.innerHTML = `
//                           <a href="product-detail.html?id=${product.id}">
//                               <img src="${product.image}" alt="${product.name}">
//                               <h2>${product.name}</h2>
//                               <p>${product.price} VND</p>
//                           </a>
//                       `;

//                       // Thêm sản phẩm vào danh sách
//                       productListContainer.appendChild(productItem);
//                   });
//               } else {
//                   productListContainer.innerHTML = '<p>Không có sản phẩm nào.</p>';
//               }
//           })
//           .catch(error => {
//               console.error('Lỗi khi lấy danh sách sản phẩm:', error);
//               productListContainer.innerHTML = '<p>Có lỗi xảy ra. Vui lòng thử lại sau.</p>';
//           });
//   }

//   // Gọi hàm lấy dữ liệu khi trang tải xong
//   fetchProductList();
// });
