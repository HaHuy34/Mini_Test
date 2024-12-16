document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.image-container');
    const image = container.querySelector('img');

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left; // X-coordinate within container
      const y = e.clientY - rect.top; // Y-coordinate within container

      const moveX = (x / rect.width) * 100;
      const moveY = (y / rect.height) * 100;

      image.style.transformOrigin = `${moveX}% ${moveY}%`;
    });
  });

  var swiper = new Swiper(".mySwiper", {
    direction: 'vertical',
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

  // Detail Product

  document.addEventListener("DOMContentLoaded", async () => {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('Sản phẩm không hợp lệ.');
        return;
    }

    // API lấy thông tin chi tiết sản phẩm
    const apiUrl = `https://api-mini-shop.vercel.app/Female/${productId}`;
    console.log(apiUrl);
    

    try {
        // Fetch data từ API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const product = await response.json();
        console.log(product);
        
        

        // Hiển thị chi tiết sản phẩm
        // Slider main
        document.getElementById('imageperent').src = product.image;
        document.getElementById('imageChild01').src = product.imageChild.imageChild01;
        document.getElementById('imageChild02').src = product.imageChild.imageChild02;
        document.getElementById('imageChild03').src = product.imageChild.imageChild03;
        document.getElementById('imageChild04').src = product.imageChild.imageChild01;
        // Slider Child
        document.getElementById('imageperent01').src = product.image;
        document.getElementById('imageChild001').src = product.imageChild.imageChild01;
        document.getElementById('imageChild002').src = product.imageChild.imageChild02;
        document.getElementById('imageChild003').src = product.imageChild.imageChild03;
        document.getElementById('imageChild004').src = product.imageChild.imageChild01;
        //Detail Product
        document.getElementById('productName').textContent = product.title;
        document.getElementById('code').textContent = product.code;
        document.getElementById('color-pr').textContent = product.color;
        document.getElementById('price-product').textContent = `${product.price.toLocaleString('vi-VN')} đ`;
        document.getElementById('pr-description').textContent = product.description;



        
    } catch (error) {
        console.error("Error fetching product details:", error);
    }
});
