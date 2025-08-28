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
    <label class="empty-container">
        <div class="empty-card">
            <img src="../image/empty.png" width="1200"></div>
    </label>`;

    const buttonPlus = scooterContainer.querySelector('.count-plus');
    const buttonMinus = scooterContainer.querySelector('.count-minus');
    const countElement = scooterContainer.querySelector('#count');

    buttonPlus.addEventListener('click', () => updateCount(1));
    buttonMinus.addEventListener('click', () => updateCount(-1));

    function updateCount(delta) {
        let count = parseInt(countElement.textContent);

        count = Math.max(1, count + delta);
        countElement.textContent = count;

        const checkbox = scooterContainer.querySelector('.checkbox-input');
        if (checkbox) checkbox.checked = true;

        updateGlobalSummary();
    }

    function updateGlobalSummary() {
        const globalSummary = document.querySelector('.summary');
        if (!globalSummary) return;

        console.log(globalSummary);

        let totalCount = 0;
        let totalPrice = 0;

        document.querySelectorAll('.scooter-container').forEach(container => {
            const checkbox = container.querySelector('.checkbox-input');
            if (!checkbox || !checkbox.checked) return;

            const countElements = container.querySelector('#count');
            const productCount = parseInt(countElements.textContent); // само значение для умножения
            const currentPrice = parseFloat(container.dataset.unitPrice);
            console.log(currentPrice);

            totalCount += productCount;
            totalPrice += productCount * currentPrice;
        });

        globalSummary.querySelector('.product-count').textContent = totalCount;
        globalSummary.querySelector('.total-price').textContent = `${totalPrice.toLocaleString()} ₽`;
        globalSummary.querySelector('.unit-price').textContent = `${totalPrice.toLocaleString()} ₽`;
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