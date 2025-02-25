document.addEventListener('DOMContentLoaded', () => {
  let orderCart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartUI() {
      const cartContainer = document.querySelector('.cart-items');
      const totalContainer = document.querySelector('.cart-total');
      if (!cartContainer || !totalContainer) return;

      cartContainer.innerHTML = '';
      let total = 0;

      orderCart.forEach((item, index) => {
          total += item.price;
          cartContainer.innerHTML += `<p>${item.name} - ${item.price.toFixed(2)} 
          <button onclick="removeFromCart(${index})">Remove</button></p>`;
      });

      totalContainer.innerHTML = `<strong>Total: ${total.toFixed(2)}</strong>`;
  }

  function addToOrder(itemName, price) {
      if (!itemName || price <= 0) return;
      orderCart.push({ name: itemName, price });
      localStorage.setItem('cart', JSON.stringify(orderCart));
      updateCartUI();
  }

  window.removeFromCart = function(index) {
      orderCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(orderCart));
      updateCartUI();
  };

  window.showBill = function () {
      document.getElementById('bill-modal').style.display = 'flex';
      updateCartUI();
  };

  window.confirmOrder = function () {
      alert("Order placed successfully!");
      orderCart = [];
      localStorage.removeItem('cart');
      updateCartUI();
      closeBill();
  };

  window.closeBill = function () {
      document.getElementById('bill-modal').style.display = 'none';
  };

  document.querySelectorAll('.menu-item button').forEach(button => {
      button.addEventListener('click', () => {
          const menuItem = button.closest('.menu-item');
          const itemName = menuItem.querySelector('h3').innerText;
          const itemPrice = parseFloat(menuItem.querySelector('.price').innerText.replace('₹', ''));
          addToOrder(itemName, itemPrice);
      });
  });
  document.querySelectorAll('.offer-card .cta-btn').forEach(button => {
    button.addEventListener('click', () => {
        const offerCard = button.closest('.offer-card');
        const itemName = offerCard.querySelector('h2').innerText;
        const itemPrice = parseFloat(offerCard.querySelector('.discount-price').innerText.replace('₹', ''));
        addToOrder(itemName, itemPrice);
    });
});


  updateCartUI();
});
