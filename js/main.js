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
	// const getResource = async (url) => {
	// 	let res = await fetch(url);

	// 	if (!res.ok) {
	// 		throw new Error(` Couldnt fetch ${url}, status : ${res.status}`);
	// 	}

	// 	return await res.json();
	// };

	axios.get('http://localhost:3000/menu')
		.then(data => {
			console.log(data);
			data.data.forEach(({
				img,
				altimg,
				title,
				descr,
				price
			}) => {
				new menuItem(img, altimg, title, descr, price, '.menu__field .container').renderMenuItem();
			});
		});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new menuItem(img, altimg, title, descr, price, '.menu__field .container').renderMenuItem();
	// 		});
	// 	});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));


	// const createCard = (data) => {
	// 	data.forEach(({
	// 		img,
	// 		altimg,
	// 		title,
	// 		descr,
	// 		price
	// 	}) => {
	// 		const element = document.createElement('div');
	// 		price = price * 26;
	// 		element.classList.add('menu__item');

	// 		element.innerHTML = `
	// 		<div class="menu__item">
	// 		<img src="${img}" alt="${altimg}">
	// 		<h3 class="menu__item-subtitle">${title}</h3>
	// 		<div class="menu__item-descr">${descr}</div>
	// 		<div class="menu__item-divider"></div>
	// 		<div class="menu__item-price">
	// 			<div class="menu__item-cost">Цена:</div>
	// 			<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 		</div>
	// 	</div>
	// 		`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// };
	// form

	const forms = document.querySelectorAll('form');
	const messages = {
		loading: 'img/spinner.svg',
		loaded: 'we will contact with u',
		error: 'smth went wrong'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

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

			// const clone = {};

			// formData.forEach((key, value) => {
			// 	clone[key] = value;
			// });
			const json = JSON.stringify(Object.fromEntries(formData.entries()));



			postData('http://localhost:3000/requests', json)
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

			// request.addEventListener('load', () => {
			// 	if (request.status === 200) {
			// 		showStatusMessage(messages.loaded);
			// 		console.log(request.response);
			// 		form.reset();

			// 		message.remove();

			// 	} else {
			// 		showStatusMessage(messages.error);
			// 	}
			// });
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


	// fetch('https://jsonplaceholder.typicode.com/posts', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			name: 'Nikita'
	// 		}),
	// 		headers: {
	// 			'Content-type': 'application/json'
	// 		}
	// 	})
	// 	.then(response => response.json())
	// 	.then(json => console.log(json));


	fetch('http://localhost:3000/requests')
		.then(data => data.json())
		.then(data => console.log(data));


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

	for(let i = 0; i < slidesArray.length; i++) {
		const  dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		dots.append(dot);
		dotsArray.push(dot);
		if(i == 0)
		{
			dot.style.opacity = 1;
		}
		 
	}



	navNext.addEventListener('click', () => {
		if( offSet == +width.slice(0, width.length - 2) * (slidesArray.length -1))
		{
			offSet = 0;
			current = 1;
		}
		else{
			offSet += +width.slice(0, width.length - 2);
			current ++;
		}
		sliderField.style.transform = `translateX(-${offSet}px)`;
		currentBtn.innerHTML = currentNumb(current);
		activeDot(current);
	});

	navPrev.addEventListener('click', () => {
		if(	offSet == 0 )
		{
			offSet = +width.slice(0, width.length - 2) * (slidesArray.length -1);
			current = slidesArray.length;
		}
		else{
			offSet -= +width.slice(0, width.length - 2);
			current --;
		}
		sliderField.style.transform = `translateX(-${offSet}px)`;
		currentBtn.innerHTML = currentNumb(current);
		activeDot(current);
	});

	function activeDot(n){
		dotsArray.forEach(item => item.style.opacity = 0.5);
		dotsArray[n - 1].style.opacity = 1;
	}
	
	dotsArray.forEach(dot => {
		dot.addEventListener('click', (e)=>{
			console.log('asdasd');
			const slideTo = e.target.getAttribute('data-slide-to');
			current = slideTo;
			offSet = +width.slice(0, width.length - 2) * (current -1); 

			sliderField.style.transform = `translateX(-${offSet}px)`;
			activeDot(current);
		});
	});

	// totalBtn.innerHTML = currentNumb(slidesArray.length);
	// plusSlides(current);

	// function plusSlides(n) {
	// 	showSlides(current +=n);
	// }
	// function showSlides(n) {
	// 	if (n <= -1) {
	// 		current = slidesArray.length - 1;
	// 	}
	// 	if (n >= slidesArray.length) {
	// 		current = 0;
	// 	}

	// 	slidesArray.forEach((item) => {
	// 		removeSlides(item);
	// 	});

	// 	slidesArray[current].classList.add('opacityOn');
	// 	slidesArray[current].classList.remove('opacityOff');
	// 	currentBtn.innerHTML = currentNumb(current + 1);
	// }

	// navPrev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });
	// navNext.addEventListener('click', () => {
	// 	plusSlides(1);
	// });


	// function removeSlides(item) {
	// 	item.classList.add('opacityOff');
	// 	item.classList.remove('opacityOn');
	// }

	function currentNumb(numb) {
		if (numb < 10) {
			return `0${numb}`;
		} else {
			return numb;
		}
	}
});