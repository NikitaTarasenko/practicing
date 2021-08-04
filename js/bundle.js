/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(` Couldnt fetch ${url}, status : ${res.status}`);
		}

		return await res.json();
	};






/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // calc

    const resCalc = document.querySelector('.calculating__result span');
    let sex, weight, age, height, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    function calcTotal() {
        if (!sex || !weight || !height || !age || !ratio) {
            resCalc.textContent = '____';
            return;
        }

        if (sex === 'female') {
            resCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            resCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });

        });

    }

    function getInputData(selector) {
        const inputs = document.querySelectorAll(`${selector} input`);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {

                if (input.value.match(/\D/g)) {
                    input.style.border = '2px solid red';
                } else {
                    input.style.border = 'none';
                }
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
        });


    }


    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getInputData('.calculating__choose_medium');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);



/***/ }),

/***/ "./src/modules/cards.js":
/*!******************************!*\
  !*** ./src/modules/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _js_services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/services/services */ "./src/js/services/services.js");


function cards() {
    // info blocks
    class menuItem {
        constructor(img, alt, titleH3, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.titleH3 = titleH3;
            this.price = price;
            this.descr = descr;
            this.transfer = 26;
            this.convertToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        renderMenuItem() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(classEl => element.classList.add(classEl));
            }

            element.innerHTML =
                `
			<div class="menu__item">
			<img src="${this.img}" alt="${this.alt}">
			<h3 class="menu__item-subtitle">${this.titleH3}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		</div>
			`;

            this.parent.append(element);
        }

        convertToUAH() {
            this.price = this.price * this.transfer;
        }
    }
     (0,_js_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new menuItem(img, altimg, title, descr, price, '.menu__field .container').renderMenuItem();
			});
		});





    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new menuItem(img, altimg, title, descr, price, '.menu__field .container').renderMenuItem();
    //         });
    //     });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);



/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _js_services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/services/services */ "./src/js/services/services.js");



function form(formSelector, modalTimerId){
    // form

	const forms = document.querySelectorAll(formSelector);
	const messages = {
		loading: 'img/spinner.svg',
		loaded: 'we will contact with u',
		error: 'smth went wrong'
	};

	forms.forEach(item => {
		bindPostData(item);
	});



	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let message = document.createElement('img');

			message.src = messages.loading;
			message.style.cssText = `
				display : block;
				margin : 0 auto;
				margin-top : 20px;
			`;

			form.insertAdjacentElement('afterend', message);

			const formData = new FormData(form);
			const json = JSON.stringify(Object.fromEntries(formData.entries()));



			(0,_js_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					showStatusMessage(messages.loaded);
					message.remove();
				}).catch(() => {
					showStatusMessage(messages.error);
				}).finally(() => {
					form.reset();
					message.remove();
				});
 
		});

	}

	function showStatusMessage(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showMod)('.modal', modalTimerId);

		const statusModal = document.createElement('div');
		statusModal.classList.add('modal__dialog');
		statusModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close">&times;</div>
			<div class="modal__title">${message}</div>	
		</div>
		`;

		document.querySelector('.modal').append(statusModal);

		setTimeout(() => {
			statusModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideMod)('.modal');
		}, 4000);
	}
	

	fetch('http://localhost:3000/requests')
		.then(data => data.json())
		.then(data => console.log(data));

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showMod": () => (/* binding */ showMod),
/* harmony export */   "hideMod": () => (/* binding */ hideMod)
/* harmony export */ });
function showMod(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId)
    {
        clearInterval(modalTimerId);
    }
    
}

function hideMod(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal

    const modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(triggerSelector);
        // modalClose = document.querySelector('.modal__close');



    modalOpen.forEach((item) => {
        item.addEventListener('click', ()=> showMod(modalSelector, modalTimerId));
    });

    // modalClose.addEventListener('click', hideMod);


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__close')) {
            hideMod(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            hideMod(modalSelector);
        }
    });

    

    function showModOnScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showMod(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModOnScroll);
        }

    }
    window.addEventListener('scroll', showModOnScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // slieder 

    const slidesArray = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        navPrev = document.querySelector('.offer__slider-prev'),
        navNext = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        totalBtn = document.querySelector('#total'),
        currentBtn = document.querySelector('#current');
    let current = 0;
    let prev = 0;
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabsLinks = document.querySelectorAll(tabsSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabs = document.querySelectorAll(tabsContentSelector);

    function hideTabsContent() {
        tabs.forEach((item, index) => {
            item.classList.add('hide');
            item.classList.remove('show');
            tabsLinks[index].classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add('show');
        tabs[i].classList.remove('hide');
        tabsLinks[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabContent();



    tabsParent.addEventListener('click', (event) => {
        const target = event.target;


        if (target && target.classList.contains('tabheader__item')) {
            tabsLinks.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    // Timer

  

    function getTimeRemaning(endTime) {
        const t = new Date();
        const leftTime = Date.parse(endTime) - Date.parse(t),
            days = Math.floor(leftTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24),
            min = Math.floor((leftTime / (1000 * 60)) % 60),
            sec = Math.floor((leftTime / 1000) % 60);

        return {
            total: leftTime,
            days,
            hours,
            min,
            sec
        };
    }

    function addZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            min = timer.querySelector('#minutes'),
            sec = timer.querySelector('#seconds'),
            timInterval = setInterval(upDateCLock, 1000);

        function upDateCLock() {
            const t = getTimeRemaning(endTime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            min.innerHTML = addZero(t.min);
            sec.innerHTML = addZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timInterval);
            }
        }
        upDateCLock();

    }

    setClock(id, deadLine);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/tabs */ "./src/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/calc */ "./src/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/cards */ "./src/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/form */ "./src/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer */ "./src/modules/timer.js");
' use strict ';









window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.showMod)('.modal', modalTimerId), 60000);

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
	(0,_modules_form__WEBPACK_IMPORTED_MODULE_3__.default)('form', modalTimerId);
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modalOpen]', '.modal', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)('.timer', '2021-12-15');

	// class User {
	// 	constructor(name, age) {
	// 		this.name = name;
	// 		this._age = age;
	// 	}

	// 	#surname = 'Sator';

	// 	say = () => {
	// 		console.log(`My name is ${this.name} ${this.#surname}, age = ${this._age}`);
	// 	}
	// 	get age() {
	// 		return this._age;
	// 	}

	// 	set age(age) {
	// 		if (typeof age === 'number') {
	// 			this._age = age;
	// 		} else {
	// 			console.log('Error');
	// 		}
	// 	}
	// }
	// const nikita = new User('Nikita', 25);
	// nikita.say();
	// console.log(nikita.age);
	// nikita.age = 40;
	// console.log(nikita.age);
	// nikita.age = 'asd';
	// nikita.say();
	// console.log(nikita.age);

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map