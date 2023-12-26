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
	navHomeLink.parentElement.after(navHomeLink);
	navHomeLink.previousSibling.remove();

	const navList = nav.querySelector(':scope .default-content-wrapper > ul');
	navList.classList.add('nav__list');

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
	navWrapper.previousSibling.remove();

	const toggleQueryWidth = window.matchMedia("(max-width: calc(60rem - 1px))");

	if (toggleQueryWidth.matches) {
		const navToggleButton = document.createElement('button');

		navToggleButton?.classList.add('nav__toggle');
		navToggleButton?.classList.add('nav__toggle--closed');
		navToggleButton?.setAttribute('type','button');
		navHomeLink.after(navToggleButton);

		function navToggleClose() {
			navToggleButton.setAttribute('aria-label','Open Navigation');
			navToggleButton.setAttribute('aria-expanded', false);
			navList.setAttribute('aria-hidden', true);
			navToggleButton.innerText = 'Menu';
		}

		function navToggleOpen() {
			navToggleButton.setAttribute('aria-label','Close Navigation');
			navToggleButton.setAttribute('aria-expanded', true);
			navList.setAttribute('aria-hidden', false);
			navToggleButton.innerText = 'Close';
		}

		navToggleClose();

		navToggleButton.addEventListener('click', () => {
			if (navToggleButton.getAttribute('aria-expanded') === "true") {
				navToggleClose();
			} else {
				navToggleOpen();
			}
		});
	}
}
