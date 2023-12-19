export default async function decorate(block) {
	const file = '/query-index.json';
	const resp = await fetch(file);
	const json = await resp.json();
	const filterData = json['data'].filter(a => a.path.includes('/pottery/'));

	filterData.forEach(entry => {
		const entryContent = (entry) => {
			let hasPrice = entry.price ? `<p class="product-item__price">${entry.price}</p>` : '';
			let isSold = entry.sold ? '<p class="product-item__sold">Sold</p>' : '';
			return `
					<a href="${entry.path}" class="product-item__link">
						<h3 class="product-link__title">${entry.title}</h3>
						<img src="${entry.image}" alt="" class="product-link__image">
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
