' use strict ';

import tabs from '../modules/tabs';
import calc from '../modules/calc';
import cards from '../modules/cards';
import form from '../modules/form';
import modal from '../modules/modal';
import slider from '../modules/slider';
import timer from '../modules/timer';
import {showMod} from '../modules/modal';
window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(()=> showMod('.modal', modalTimerId), 60000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	calc();
	cards();
	form('form', modalTimerId);
	modal('[data-modalOpen]', '.modal', modalTimerId);
	slider({
		totalCounter : '#total',
		currentCounter : '#current',
		container : '.offer__slider',
		slide : '.offer__slide',
		nextBtn : '.offer__slider-next',
		prevBtn : '.offer__slider-prev',
		wrapper : '.offer__slider-wrapper',
		field :  '.offer__slider-inner'
		
	});
	timer('.timer', '2021-12-15');

});