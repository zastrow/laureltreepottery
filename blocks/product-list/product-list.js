export default async function decorate(block) {
	const currentPath = window.location.pathname;
	const pathArray = currentPath.toString().split('/');
	const pathFilter = pathArray[1];

	const file = '/query-index.json';
	const resp = await fetch(file);
	const json = await resp.json();
	const filterData = json['data'].filter(a => a.path.includes(`/${pathFilter}/`));

	const formatCurrency = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
	}

	filterData.forEach(entry => {
		const entryContent = (entry) => {
			let hasPrice = entry.price ? `<p class="product-item__price">${formatCurrency(entry.price)}</p>` : '';
			let isSold = (entry.status.toLowerCase() === "sold") ? '<p class="product-item__sold">Sold</p>' : '';
			return `
					<a href="${entry.path}" class="product-item__link">
						<h3 class="product-item__title">${entry.title}</h3>
						<div class="product-item__image-container">
							<img src="${entry.image}" alt="" class="product-item__image">
						</div>
						${hasPrice}
						${isSold}
					</a>
			`
		};

		const entryBlock = document.createElement('div');
		entryBlock.classList.add('product-item');
		entryBlock.innerHTML = DOMPurify.sanitize(entryContent(entry));

		block.append(entryBlock);
	});
}
