

function slider({container, slide, nextBtn,prevBtn, wrapper,field, totalCounter, currentCounter}) {
    // slieder 

    const slidesArray = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        navPrev = document.querySelector(prevBtn),
        navNext = document.querySelector(nextBtn),
        slidesWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        totalBtn = document.querySelector(totalCounter),
        currentBtn = document.querySelector(currentCounter);
    let current = 0;
    let offSet = 0;

    totalBtn.innerHTML = currentNumb(slidesArray.length);
    currentBtn.innerHTML = currentNumb(1);

    sliderField.style.width = 100 * slidesArray.length + '%';
    slidesArray.forEach((slide) => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';


    const dots = document.createElement('ul'),
        dotsArray = [];
    dots.classList.add('carousel_dots');

    slider.append(dots);

    for (let i = 0; i < slidesArray.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.append(dot);
        dotsArray.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }

    }



    navNext.addEventListener('click', () => {
        if (offSet == regOnlyNubm(width) * (slidesArray.length - 1)) {
            offSet = 0;
            current = 1;
        } else {
            offSet += regOnlyNubm(width);
            current++;
        }
        sliderField.style.transform = `translateX(-${offSet}px)`;
        currentBtn.innerHTML = currentNumb(current);
        activeDot(current);
    });

    navPrev.addEventListener('click', () => {
        if (offSet == 0) {
            offSet = regOnlyNubm(width) * (slidesArray.length - 1);
            current = slidesArray.length;
        } else {
            offSet -= regOnlyNubm(width);
            current--;
        }
        sliderField.style.transform = `translateX(-${offSet}px)`;
        currentBtn.innerHTML = currentNumb(current);
        activeDot(current);
    });

    function activeDot(n) {
        dotsArray.forEach(item => item.style.opacity = 0.5);
        dotsArray[n - 1].style.opacity = 1;
    }

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            current = slideTo;
            offSet = regOnlyNubm(width) * (current - 1);

            sliderField.style.transform = `translateX(-${offSet}px)`;
            activeDot(current);
            currentBtn.innerHTML = currentNumb(current);
        });
    });

    function regOnlyNubm(str) {
        return +str.replace(/\D/ig, '');
    }

    function currentNumb(numb) {
        if (numb < 10) {
            return `0${numb}`;
        } else {
            return numb;
        }
    }
}


export default slider;