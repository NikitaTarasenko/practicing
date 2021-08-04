import {getResource} from '../js/services/services';

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
     getResource('http://localhost:3000/menu')
		.then(data => {
            console.log(data);
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

export default cards;

