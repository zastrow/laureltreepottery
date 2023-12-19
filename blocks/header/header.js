import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';



/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
	// load nav as fragment
	const navMeta = getMetadata('nav');
	const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
	const fragment = await loadFragment(navPath);

	// decorate nav DOM
	const nav = document.createElement('nav');
	nav.id = 'nav';
	nav.classList.add('nav');
	while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

	const navHomeLink = nav.querySelector(':scope .default-content-wrapper:first-child > .button-container > .button');
	navHomeLink.classList.remove('button');
	navHomeLink.classList.add('nav__home-link');
	navHomeLink.parentElement.classList.remove('button-container');
	navHomeLink.parentElement.classList.add('nav__home-link-container');


	nav.querySelectorAll(':scope .default-content-wrapper > ul').forEach((navList) => {
		navList.classList.add('nav__list')
	});

	nav.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navItem) => {
		navItem.classList.add('nav__item')
	});

	nav.querySelectorAll(':scope .default-content-wrapper > ul a').forEach((navLink) => {
		navLink.classList.add('nav__link')
		navLink.removeAttribute('title');
	});


	const navWrapper = document.createElement('div');
	navWrapper.className = 'nav-wrapper';
	navWrapper.append(nav);
	block.append(navWrapper);
}
