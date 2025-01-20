document.addEventListener('DOMContentLoaded', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');


    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id')
        });
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);


    };

    document.querySelector('.search-container').addEventListener('mouseenter', function () {
        const container = this;
        container.classList.add('hover-active');
        setTimeout(() => {
            container.classList.remove('hover-active');
        }, 10000);
    });


    const menuButton = document.querySelector('.btn-head');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');

    menuButton.addEventListener('click', togglePopup);
    closeBtn.addEventListener('click', hidePopup);

    function togglePopup() {
        popup.classList.toggle('show');
    }

    function hidePopup(event) {
        if (event.target === closeBtn ||
            event.target.closest('.close-btn') ||
            !event.target.closest('.menu')) {
            popup.classList.remove('show');
        }
    }

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.menu')) {
            popup.classList.remove('show');
        }
    });




    const selectAllCheckbox = document.querySelector('.checkbox-container input[type="checkbox"]');
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');

    selectAllCheckbox.addEventListener('change', function() {
        if (this.checked) {
            checkboxes.forEach(checkbox => checkbox.checked = true);
        } else {
            checkboxes.forEach(checkbox => checkbox.checked = false);
        }
    });


    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            const allOtherChecked = Array.from(
                checkboxes).filter(active => active !== selectAllCheckbox).every(active => active.checked);

            if (!selectAllCheckbox.checked && allOtherChecked) {
                selectAllCheckbox.checked = true;
            } else if (!allChecked) {
                selectAllCheckbox.checked = false;
            }
        });
    });

    async function fetchProductData(id) {
        try {
            // Запрашиваем данные с API
            const response = await fetch(`http://localhost:8080/api/product/${id}`);
            const product = await response.json();

            console.log('sosal', product);
            return product
        } catch (error) {

        }
    }

    function renderScooterContainer(product, scooterContainer, isFirst) {
        if (!product || !scooterContainer) return;

        const unitPrice = parseFloat(product.price); // Цена за единицу товара

        scooterContainer.innerHTML = `
    <label class="checkbox-container second-checkbox">
        <div class="checkbox">
            <input type="checkbox" class="checkbox-input">
            <span class="custom-checkbox"></span>
        </div>
        <div class="scooter-card">
            <div class="scooter-info">
                <h2>${product.scooter_name}</h2>
                <p>${product.about}</p>
            </div>
            <img src="${product.image}" alt="${product.scooter_name}" class="scooter-product" width="200" height="300">
            <img src="../image/Auto%20Layout%20Horizontal.png" class="new" width="120" height="150">
        </div>
    </label>

    <div class="count-container">
        <button class="count-minus"><img src="../image/Vector2.png" alt=""></button>
        <span><b id="count">1</b></span>
        <button class="count-plus"><img src="../image/Vector3.png" alt=""></button>
    </div> 
    ${isFirst ? `
    <div class="summary">
        <p>Товары, <span class="product-count">1</span> шт. <strong class="unit-price">${unitPrice.toLocaleString()} ₽</strong></p>
        <p>Скидки/акции <strong>-</strong></p>
        <div class="horizontal-line"></div>
        <p>Итого: <strong class="total-price">${unitPrice.toLocaleString()} ₽</strong></p>
        <button>Оформить заказ</button>
    </div>` : `<div class="summary-place"></div>`}`;

    const buttonPlus = scooterContainer.querySelector('.count-plus');
    const buttonMinus = scooterContainer.querySelector('.count-minus');
    const countElement = scooterContainer.querySelector('#count');

    buttonPlus.addEventListener('click', () => updateCount(1));
    buttonMinus.addEventListener('click', () => updateCount(-1));

    function updateCount(delta) {
        let count = parseInt(countElement.textContent);

        count = Math.max(1, count + delta);
        countElement.textContent = count;
        updateGlobalSummary();
    }

    function updateGlobalSummary() {
        const globalSummary = document.querySelector('.summary');
        if (!globalSummary) return;

        console.log(globalSummary);
        const countElements = document.querySelectorAll('#count'); //находит то откуда брать значение для умножения
        let totalCount = 0;
        let totalPrice = 0;

        countElements.forEach((elem, index) => {
            const productCount = parseInt(elem.textContent); // само значение для умножения
            const currentPrice = parseFloat(document.querySelectorAll('.scooter-container')[index].dataset.unitPrice);
            console.log(currentPrice);
            totalCount += productCount;
            totalPrice += productCount * currentPrice;
        });

        const productCountElement = globalSummary.querySelector('.product-count');
        const totalPriceElement = globalSummary.querySelector('.total-price');

        productCountElement.textContent = totalCount;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} ₽`;
    }
}

async function initApp() {
    const scooterContainers = document.querySelectorAll('.scooter-container');

    for (let i = 0; i < scooterContainers.length; i++) {
        const product = await fetchProductData(i + 1);
        if (!product) continue;
        scooterContainers[i].dataset.unitPrice = product.price;
        renderScooterContainer(product, scooterContainers[i], i === 0);
    }
}

initApp();

});