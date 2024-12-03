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

const countContainers = document.querySelectorAll('.count-container'); // Находим все контейнеры

countContainers.forEach(container => {
    const buttonPlus = container.querySelector('.count-plus'); // Кнопка для увеличения в этом контейнере
    const buttonMinus = container.querySelector('.count-minus'); // Кнопка для уменьшения в этом контейнере
    const btnCount = container.querySelector('#count'); // Элемент с числом в этом контейнере

    function countPlus() {
        let currentValue = parseInt(btnCount.innerText); // Получаем текущее значение как число
        currentValue++;
        btnCount.innerText = currentValue.toString();
    }

    function countMinus() {

        let currentValue = parseInt(btnCount.innerText);
        if(currentValue > 1) {
            currentValue--;
            btnCount.innerText = currentValue.toString();
        }
    }


    buttonPlus.addEventListener('click', countPlus);
    buttonMinus.addEventListener('click', countMinus);
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

});