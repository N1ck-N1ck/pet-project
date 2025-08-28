
document.addEventListener('DOMContentLoaded', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');


    window.onscroll = () => {
        sections.forEach(sec => {

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


    let currentProductSlide = 0;
    let currentReviewSlide = 0;

    function showProductSlide(index) {
        const productSlides = document.querySelectorAll('.product-main .slide');
        const totalProductSlides = productSlides.length;

        if (index >= totalProductSlides) {
            currentProductSlide = 0;
        } else if (index < 0) {
            currentProductSlide = totalProductSlides - 1;
        } else {
            currentProductSlide = index;
        }

        const offset = -currentProductSlide * 100;
        productSlides.forEach(slide => {
            slide.style.transform = `translateX(${offset}%)`;
        });
    }


    function showReviewSlide(index) {
        const reviewSlides = document.querySelectorAll('.review-main .review-slide');
        const totalReviewSlides = reviewSlides.length;

        if (index >= totalReviewSlides) {
            currentReviewSlide = 0;
        } else if (index < 0) {
            currentReviewSlide = totalReviewSlides - 1;
        } else {
            currentReviewSlide = index;
        }

        const offset = -currentReviewSlide * 100;
        reviewSlides.forEach(slide => {
            slide.style.transform = `translateX(${offset}%)`;
        });

    }

    function nextProductSlide() {
        showProductSlide(currentProductSlide + 1);
    }

    function prevProductSlide() {
        showProductSlide(currentProductSlide - 1);
    }

    function nextReviewSlide() {
        showReviewSlide(currentReviewSlide + 1);
    }

    function prevReviewSlide() {
        showReviewSlide(currentReviewSlide - 1);
    }


// Event listeners for product slides
    document.querySelector('.product .arrow-back').addEventListener('click', prevProductSlide);
    document.querySelector('.product .arrow-next').addEventListener('click', nextProductSlide);

// Event listeners for review slides
    document.querySelectorAll('#reviews .arrow-back').forEach(button => {
        button.addEventListener('click', prevReviewSlide);
    });
    document.querySelectorAll('#reviews .arrow-next').forEach(button => {
        button.addEventListener('click', nextReviewSlide);
    });


    const elements = document.querySelectorAll('.ellipse-bigger, .red-rictangle-bigger, .green-ellipse-bigger, .green-rictangle-bigger');
    let index = 0;

    function toggleElement() {
        if (index > 0) {
            elements[index - 1].classList.add('fade-out');
            elements[index - 1].addEventListener('animationend', function () {
                elements[index - 1].classList.add('hidden');
                elements[index - 1].classList.remove('fade-out');
            }, {once: true});
        }

        if (index < elements.length) {
            const element = elements[index];
            element.classList.remove('hidden');
            element.classList.add('fade-in');
            element.addEventListener('animationend', function () {
                element.classList.remove('fade-in');
                setTimeout(toggleElement, 3);
            }, {once: true});
            index++;
        } else {
            index = 0;
            setTimeout(toggleElement, 3);
        }
    }

    toggleElement();


    const aovoBtn = document.querySelectorAll('.aovo-btn');
    const buy = document.querySelector('.buy');
    const buyNotification = document.getElementById('hide');

    function error() {console.log('he za huynia');}

    aovoBtn.forEach(btn => {
        btn.addEventListener('click', toglePopup);

    });


    function toglePopup() {
        buy.classList.add('hidden')
        buyNotification.classList.remove('hidden');

    }

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

 function renderScooterCard(product, container) {
     if (!product || !container) return;

     const unitPrice = parseFloat(product.price);
        container.innerHTML = `
        <div class="scooter-info">
            <h2>${product.scooter_name}</h2>
            <p>${product.about}</p>
            <button class="aovo-btn">Купить за<br><span>${unitPrice.toLocaleString()} ₽</span></button>
        </div>
        <img src="${product.image}" alt="${product.scooter_name}" class="scooter-product" width="200" height="300">
        <img src="../image/Auto%20Layout%20Horizontal.png" class="new" width="120" height="150">`;

     const button = container.querySelector('.aovo-btn');
     if (button) {
         button.addEventListener('click', toglePopup);
     }
    }
    async function initApp(){
        const scooterCards = document.querySelectorAll('.scooter-card');
        for (let i = 0; i < scooterCards.length; i++) {
            const product = await fetchProductData(i+1);
            renderScooterCard(product, scooterCards[i]);
        }
    }
    initApp();


});


