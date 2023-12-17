document.addEventListener("DOMContentLoaded", function () {
  let wishlist = [];
  let cart = [];

  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(function (likeButton) {
    likeButton.addEventListener("click", function () {
      const productContainer = likeButton.closest("li");
      const productName = productContainer.querySelector("h3").textContent;
      const productPrice = parseFloat(
        productContainer.querySelector("p").textContent.replace("$", "")
      );
      addToWishlist(productName, productPrice);
    });
  });

  function addToWishlist(productName, productPrice) {
    const product = {
      name: productName,
      price: productPrice,
    };
    wishlist.push(product);
    updateWishlistUI();
  }

  function updateWishlistUI() {
    const wishlistContainer = document.getElementById("wishlist-container");
    wishlistContainer.innerHTML = "";

    wishlist.forEach(function (product) {
      const listItem = document.createElement("li");
      listItem.innerHTML =
        "<span>" + product.name + " - $" + product.price.toFixed(2) + "</span>";
      wishlistContainer.appendChild(listItem);
    });
  }

  const cartContainer = document.getElementById("cart-container");

  const cartButtons = document.querySelectorAll(".cart-btn");
  cartButtons.forEach(function (cartButton) {
    cartButton.addEventListener("click", function () {
      const productContainer = cartButton.closest("li");
      const productName = productContainer.querySelector("h3").textContent;
      const productPrice = parseFloat(
        productContainer.querySelector("p").textContent.replace("$", "")
      );
      addToCart(productName, productPrice);
    });
  });

  function addToCart(productName, productPrice) {
    const product = {
      name: productName,
      price: productPrice,
      quantity: 1,
    };

    const existingProductIndex = cart.findIndex(function (item) {
      return item.name === product.name;
    });

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity++;
    } else {
      cart.push(product);
    }

    updateCartUI();
  }

  function removeCartItem(productName) {
    const productIndex = cart.findIndex(function (item) {
      return item.name === productName;
    });

    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
      updateCartUI();
    }
  }

  function updateCartUI() {
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach(function (product) {
      const listItem = document.createElement("li");

      const trashIcon = document.createElement("span");
      trashIcon.innerHTML = ' <i class="fas fa-trash-alt trash-icon"></i>';
      trashIcon.addEventListener("click", function () {
        removeCartItem(product.name);
      });

      const productTotal = product.price * product.quantity;

      listItem.innerHTML =
        "<span>" +
        product.name +
        " - $" +
        product.price.toFixed(2) +
        " - Quantity: " +
        product.quantity +
        " - Total: $" +
        productTotal.toFixed(2) +
        "</span>";
      listItem.appendChild(trashIcon);

      cartContainer.appendChild(listItem);

      total += productTotal;
    });

    const totalElement = document.createElement("li");
    totalElement.innerHTML = "<span>Total: $" + total.toFixed(2) + "</span>";
    cartContainer.appendChild(totalElement);
  }
});
