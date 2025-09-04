
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}


// --- Data Simulation ---
const allProducts = [
    { id: '1', name: 'Elegant Pearl Necklace', category: 'Necklaces', price: 120.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Pearl+Necklace' },
    { id: '2', name: 'Vintage Silver Earrings', category: 'Earrings', price: 75.50, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Silver+Earrings' },
    { id: '3', name: 'Diamond Solitaire Ring', category: 'Rings', price: 450.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Diamond+Ring' },
    { id: '4', name: 'Gold Charm Bracelet', category: 'Bracelets', price: 99.99, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Charm+Bracelet' },
    { id: '5', name: 'Sapphire Drop Necklace', category: 'Necklaces', price: 210.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Sapphire+Necklace' },
    { id: '6', name: 'Emerald Stud Earrings', category: 'Earrings', price: 150.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Emerald+Earrings' },
    { id: '7', name: 'Ruby Engagement Ring', category: 'Rings', price: 780.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Ruby+Ring' },
    { id: '8', name: 'Leather Cuff Bracelet', category: 'Bracelets', price: 60.00, image: 'https://via.placeholder.com/400x350/F5F5DC/8B0000?text=Leather+Cuff' },
];

const getCategories = () => {
    const categories = new Set(allProducts.map(product => product.category));
    return Array.from(categories);
};

// --- DOM Elements ---
const productsGrid = document.getElementById('products-grid');
const filterButtonsContainer = document.getElementById('filter-buttons');
const sortSelect = document.getElementById('sort');
const emptyState = document.getElementById('empty-state');

// --- State Variables ---
let filteredProducts = [...allProducts];
let activeFilter = 'all';
let sortBy = 'default';

// --- Functions ---

const renderProducts = (productsToRender) => {
    productsGrid.innerHTML = ''; // Xóa các sản phẩm hiện có
    if (productsToRender.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        productsToRender.forEach(product => {
            const productCard = `
                <div class="product-card h-full flex flex-col justify-between">
                    <a href="/products/${product.id}" class="image-container">
                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            class="w-full h-[350px] object-cover object-center"
                        />
                        <div class="quick-add">
                            <button class="quick-add-button w-full text-center py-2 font-medium text-sm hover:text-clelie-burgundy transition-colors"
                                data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.price}"
                                data-image="${product.image}">
                                Quick Add
                            </button>
                        </div>
                    </a>
                    <div class="mt-4">
                        <span class="text-xs text-gray-500">${product.category}</span>
                        <h3 class="font-medium mt-1">
                            <a href="/products/${product.id}" class="hover:text-clelie-burgundy transition-colors">
                                ${product.name}
                            </a>
                        </h3>
                        <p class="mt-1">$${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productsGrid.insertAdjacentHTML('beforeend', productCard);
        });
    }
};
const updateFilterButtons = () => {
    const categories = getCategories();
    
    filterButtonsContainer.innerHTML = '<button data-category="all" class="px-4 py-2 text-sm bg-clelie-burgundy text-white">All</button>';

    categories.forEach(category => {
        const button = document.createElement('button');
        button.dataset.category = category.toLowerCase();
        button.className = `px-4 py-2 text-sm bg-white border border-gray-300 hover:bg-clelie-light-gray`;
        button.textContent = category;
        filterButtonsContainer.appendChild(button);
    });

    
    const currentActiveButton = filterButtonsContainer.querySelector(`[data-category="${activeFilter}"]`);
    if (currentActiveButton) {
        filterButtonsContainer.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-clelie-burgundy', 'text-white');
            btn.classList.add('bg-white', 'border', 'border-gray-300', 'hover:bg-clelie-light-gray');
        });
        currentActiveButton.classList.remove('bg-white', 'border', 'border-gray-300', 'hover:bg-clelie-light-gray');
        currentActiveButton.classList.add('bg-clelie-burgundy', 'text-white');
    }
};

const handleFilterChange = (category) => {
    activeFilter = category;
    if (category === 'all') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }
    applySort(); 
    updateFilterButtons();
};

const applySort = () => {
    let sorted = [...filteredProducts]; 

    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            if (activeFilter === 'all') {
                sorted = [...allProducts];
            } else {
                sorted = allProducts.filter(product => product.category.toLowerCase() === activeFilter.toLowerCase());
            }
            break;
    }
    renderProducts(sorted);
};

// --- Event Listeners ---
filterButtonsContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const category = e.target.dataset.category;
        handleFilterChange(category);
    }
});

sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    applySort();
});

// --- Initial Render ---
document.addEventListener('DOMContentLoaded', () => {
    updateFilterButtons();
    renderProducts(filteredProducts);
});

window.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort');
    const productsGrid = document.getElementById('products-grid');

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const productCards = Array.from(productsGrid.children);

        productCards.sort((a, b) => {
            const nameA = a.querySelector('h3').innerText.trim().toLowerCase();
            const nameB = b.querySelector('h3').innerText.trim().toLowerCase();
            const priceA = parseFloat(a.querySelector('p.font-bold').innerText.replace('$', ''));
            const priceB = parseFloat(b.querySelector('p.font-bold').innerText.replace('$', ''));

            switch (sortValue) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                default:
                    return 0;
            }
        });

        // Làm mới sản phẩm trên giao diện
        productsGrid.innerHTML = '';
        productCards.forEach(card => productsGrid.appendChild(card));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.quick-add-button');

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn chặn redirect nếu có

            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseInt(button.dataset.price);
            const image = button.dataset.image;

            const product = { id, name, price, image, quantity: 1 };

            // Lấy giỏ hàng từ localStorage (nếu có)
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Kiểm tra nếu sản phẩm đã có thì tăng số lượng
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${name} đã được thêm vào giỏ hàng!`);
        });
    });
});
function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.textContent = total.toLocaleString() + " VND";
    }
}
