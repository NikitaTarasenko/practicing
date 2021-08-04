import {showMod, hideMod} from './modal';
import {postData} from '../js/services/services';

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
 
		});

	}

	function showStatusMessage(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		showMod('.modal', modalTimerId);

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
			hideMod('.modal');
		}, 4000);
	}
	

	fetch('http://localhost:3000/requests')
		.then(data => data.json())
		.then(data => console.log(data));

}
export default form;