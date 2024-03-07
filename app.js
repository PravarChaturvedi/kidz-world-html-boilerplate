document.addEventListener("DOMContentLoaded", function() {
    // Get the cart element
    const cartElement = document.querySelector('.cart');
    let cartCount = 0;
    let orderDetails = [];

    // Get all the Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.product button');

    // Add event listener to each Add to Cart button
    addToCartButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            cartCount++;
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.split('Rs.')[1]);
            orderDetails.push({ name: productName, price: productPrice });
            updateCartCount(cartCount);
        });
    });

    // Function to update cart count
    function updateCartCount(count) {
        cartElement.textContent = `Cart (${count})`;
    }

    // Function to calculate total price
    function calculateTotalPrice() {
        return orderDetails.reduce((total, item) => total + item.price, 0);
    }

    // Function to format order details
    function formatOrderDetails() {
        let message = "Order Details:\n";
        orderDetails.forEach(item => {
            message += `${item.name}: Rs.${item.price}\n`;
        });
        message += `Total Price: Rs.${calculateTotalPrice()}`;
        return encodeURIComponent(message);
    }

    // Open WhatsApp message with order summary
    cartElement.addEventListener('click', function() {
        if (orderDetails.length > 0) {
            const orderSummary = formatOrderDetails();
            const whatsappLink = `https://wa.me/+91900000000?text=${orderSummary}`;
            window.open(whatsappLink, '_blank');
        } else {
            alert("Your cart is empty. Please add items to your cart.");
        }
    });
});
