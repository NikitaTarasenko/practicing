' use strict ';

window.addEventListener('DOMContentLoaded', () => {


	const tabsLinks = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items'),
		tabs = document.querySelectorAll('.tabcontent');

	function hideTabsContent() {
		tabs.forEach((item, index) => {
			item.classList.add('hide');
			item.classList.remove('show');
			tabsLinks[index].classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabs[i].classList.add('show');
		tabs[i].classList.remove('hide');
		tabsLinks[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabContent();



	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		console.log(target);


		if (target && target.classList.contains('tabheader__item')) {
			tabsLinks.forEach((item, i) => {
				if (item == target) {
					hideTabsContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	const deadLine = new Date('2021-12-15');

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

	setClock('.timer', deadLine);

	//modal

	const modal = document.querySelector('.modal'),
		modalOpen = document.querySelectorAll('[data-modalOpen]'),
		modalClose = document.querySelector('.modal__close');

	function showMod() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(timerModal);
	}

	function hideMod() {
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	modalOpen.forEach((item) => {
		item.addEventListener('click', showMod);
	});

	modalClose.addEventListener('click', hideMod);


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.classList.contains('modal__close')) {
			hideMod();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			hideMod();
		}
	});

	const timerModal = setTimeout(showMod, 60000);

	function showModOnScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			showMod();
			window.removeEventListener('scroll', showModOnScroll);
		}

	}
	window.addEventListener('scroll', showModOnScroll);


	// info blocks

	// const menuContent = document.querySelector('.menu__field .container');


	class menuItem {
		constructor(img, alt, titleH3, desrc, price, parentSelector, ...classes) {
			this.img = img;
			this.alt = alt;
			this.titleH3 = titleH3;
			this.price = price;
			this.desrc = desrc;
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
			<img src="img/tabs/${this.img}" alt="${this.alt}">
			<h3 class="menu__item-subtitle">${this.titleH3}</h3>
			<div class="menu__item-descr">${this.desrc}</div>
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

	new menuItem(
		'vegy.jpg',
		'vegy',
		'Меню "Фитнес',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu__field .container'
	).renderMenuItem();

	new menuItem(
		'elite.jpg',
		'elite',
		'Меню “Премиум” ',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		550,
		'.menu__field .container',
		'big'
	).renderMenuItem();

	new menuItem('post.jpg',
		'post',
		'Меню Постное ',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		430,
		'.menu__field .container'
	).renderMenuItem();


	// form

	const forms = document.querySelectorAll('form');
	const messages = {
		loading: 'img/spinner.svg',
		loaded: 'we will contact with u',
		error: 'smth went wrong'
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const message = document.createElement('img')
				
			message.src = messages.loading;
			message.style.cssText = `
				display : block;
				margin : 0 auto;
				margin-top : 20px;
			`;

			// showStatusMessage(messages.loading);
			// form.append(message);
			form.insertAdjacentElement('afterend', message);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json');

			const formData = new FormData(form);

			const clone = {};

			formData.forEach((key, value) => {
				clone[key] = value;
			});
			const json = JSON.stringify(clone);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					showStatusMessage(messages.loaded);
					console.log(request.response);
					form.reset();
					 
					message.remove();
					 
				} else {
					showStatusMessage(messages.error);
				}
			});
		});

	}

	function showStatusMessage(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		showMod();

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
			hideMod();
		}, 4000);
	}

});