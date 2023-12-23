export default async function decorate(block) {
	const productImages = block.querySelectorAll('picture');
	const newBlock = document.createElement('div');
	newBlock.classList.add('product-image__container')
	const imageSelectorList = document.createElement('ul');
	imageSelectorList.classList.add('product-image__list');
	productImages.forEach((image, i) => {
		const imageContainer = document.createElement('li');
		imageContainer.classList.add('product-image__item');

		const imageButton = document.createElement('button')
		imageButton.classList.add('product-image__button');
		imageButton.dataset.count = i;
		imageButton.setAttribute('type', 'button');

		image.querySelector('img').classList.add('product-image__media')

		imageButton.append(image);
		imageContainer.append(imageButton);
		imageSelectorList.append(imageContainer);
	});

	block.innerHTML = '';

	block.append(newBlock);
	block.append(imageSelectorList);

	newBlock.innerHTML = DOMPurify.sanitize(productImages[0]);

	const allButtons = block.querySelectorAll('button');

	allButtons.forEach(button => {
		button.addEventListener("click", e => {
			newBlock.innerHTML = DOMPurify.sanitize(productImages[button.dataset.count]);
		})
	});
}
