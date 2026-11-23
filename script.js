/* =====================================
   RESTAURANT DATA
===================================== */

let restaurants = [

    {
        name: "Pizza Palace",
        rating: 4.5,
        cuisine: "Italian",
        category: "pizza",
        time: "30 min"
    },

    {
        name: "Burger House",
        rating: 4.8,
        cuisine: "American",
        category: "burgers",
        time: "30 min"
    },

    {
        name: "Noodles Lover",
        rating: 4.2,
        cuisine: "Chinese",
        category: "noodles",
        time: "25 min"
    },

    {
        name: "Pasta Paradise",
        rating: 4.6,
        cuisine: "Italian",
        category: "pasta",
        time: "35 min"
    },

    {
        name: "Healthy Salads",
        rating: 4.4,
        cuisine: "Indian",
        category: "salads",
        time: "20 min"
    },

    {
        name: "Sweet Home",
        rating: 4.7,
        cuisine: "Desserts",
        category: "desserts",
        time: "25 min"
    }

];


/* =====================================
   MENU DATA
===================================== */

let menuItems = {

    "Pizza Palace": [
        { name: "Margherita Pizza", price: 249 },
        { name: "Farmhouse Pizza", price: 349 },
        { name: "Cheese Burst Pizza", price: 399 }
    ],

    "Burger House": [
        { name: "Classic Burger", price: 149 },
        { name: "Cheese Burger", price: 199 },
        { name: "Veggie Burger", price: 179 }
    ],

    "Noodles Lover": [
        { name: "Veg Hakka Noodles", price: 179 },
        { name: "Schezwan Noodles", price: 199 },
        { name: "Chilli Garlic Noodles", price: 219 }
    ],

    "Pasta Paradise": [
        { name: "White Sauce Pasta", price: 249 },
        { name: "Red Sauce Pasta", price: 229 },
        { name: "Cheese Pasta", price: 299 }
    ],

    "Healthy Salads": [
        { name: "Green Salad", price: 149 },
        { name: "Paneer Salad", price: 199 },
        { name: "Fruit Salad", price: 179 }
    ],

    "Sweet Home": [
        { name: "Chocolate Cake", price: 199 },
        { name: "Brownie", price: 149 },
        { name: "Ice Cream", price: 129 }
    ]

};


/* =====================================
   VARIABLES
===================================== */

let cart = [];

let restaurantList =
    document.getElementById("restaurant-list");

let searchInput =
    document.getElementById("search-input");

let searchBtn =
    document.getElementById("search-btn");

let cartBtn =
    document.getElementById("cart-btn");

let cartSidebar =
    document.getElementById("cart-sidebar");

let cartOverlay =
    document.getElementById("cart-overlay");

let closeCart =
    document.getElementById("close-cart");

let cartItems =
    document.getElementById("cart-items");

let cartCount =
    document.getElementById("cart-count");

let cartTotal =
    document.getElementById("cart-total");

let checkoutBtn =
    document.getElementById("checkout-btn");

let successMessage =
    document.getElementById("success-message");

let successClose =
    document.getElementById("success-close");


/* =====================================
   DISPLAY RESTAURANTS
===================================== */

function displayRestaurants(list) {

    if (list.length === 0) {

        restaurantList.innerHTML =
            "<h3 class='empty-cart'>No restaurants found 😔</h3>";

        return;
    }


    restaurantList.innerHTML =
        list.map(function(restaurant) {

            return `
                <div class="restaurant-card">

                    <h3>${restaurant.name}</h3>

                    <p>⭐ ${restaurant.rating}</p>

                    <p>🍴 ${restaurant.cuisine}</p>

                    <p>🕒 ${restaurant.time}</p>

                    <button
                        class="menu-btn"
                        onclick="showMenu('${restaurant.name}')"
                    >
                        View Menu
                    </button>

                </div>
            `;

        }).join("");
}


/* =====================================
   INITIAL DISPLAY
===================================== */

displayRestaurants(restaurants);


/* =====================================
   SEARCH
===================================== */

searchBtn.addEventListener("click", function() {

    let searchText =
        searchInput.value.toLowerCase().trim();


    let results =
        restaurants.filter(function(restaurant) {

            return (
                restaurant.name.toLowerCase().includes(searchText) ||

                restaurant.cuisine.toLowerCase().includes(searchText) ||

                restaurant.category.toLowerCase().includes(searchText)
            );

        });


    displayRestaurants(results);

});


/* =====================================
   SEARCH WITH ENTER KEY
===================================== */

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


/* =====================================
   CATEGORY FILTER
===================================== */

let categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function(card) {

    card.addEventListener("click", function() {

        let category =
            card.getAttribute("data-category");


        let filtered =
            restaurants.filter(function(restaurant) {

                return restaurant.category === category;

            });


        displayRestaurants(filtered);


        document.getElementById("restaurants")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =====================================
   SHOW ALL
===================================== */

document
    .getElementById("show-all-btn")
    .addEventListener("click", function() {

        displayRestaurants(restaurants);

    });


/* =====================================
   SHOW MENU
===================================== */

function showMenu(restaurantName) {

    let items =
        menuItems[restaurantName];


    if (!items) {
        return;
    }


    let menuHTML = "";


    items.forEach(function(item) {

        menuHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>₹${item.price}</p>

                </div>

                <button
                    class="menu-btn"
                    onclick="addToCart('${item.name}', ${item.price})"
                >
                    Add
                </button>

            </div>

        `;

    });


    cartItems.innerHTML = `

        <h3 style="margin-bottom:20px;">
            ${restaurantName} Menu
        </h3>

        ${menuHTML}

    `;


    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(name, price) {

    let existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

}


/* =====================================
   UPDATE CART
===================================== */

function updateCart() {

    cartCount.innerText =
        cart.reduce(function(total, item) {

            return total + item.quantity;

        }, 0);


    let total =
        cart.reduce(function(sum, item) {

            return sum + item.price * item.quantity;

        }, 0);


    cartTotal.innerText = total;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty 😋</p>";

        return;
    }


    cartItems.innerHTML =
        cart.map(function(item, index) {

            return `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₹${item.price * item.quantity}
                        </p>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})"
                        >
                            Remove
                        </button>

                    </div>


                    <div class="quantity-controls">

                        <button
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================
   INCREASE QUANTITY
===================================== */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* =====================================
   DECREASE QUANTITY
===================================== */

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =====================================
   REMOVE ITEM
===================================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =====================================
   OPEN CART
===================================== */

cartBtn.addEventListener("click", function() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    updateCart();

});


/* =====================================
   CLOSE CART
===================================== */

function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =====================================
   CHECKOUT
===================================== */

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    cart = [];

    updateCart();

    closeCartSidebar();

    successMessage.classList.add("active");

});


/* =====================================
   SUCCESS CLOSE
===================================== */

successClose.addEventListener("click", function() {

    successMessage.classList.remove("active");

});