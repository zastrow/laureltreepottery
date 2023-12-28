import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
	// Small Screen to Large Screen Media Query Breakpoint
	const toggleQueryWidth = window.matchMedia("(max-width: calc(50rem - 1px))");

	// Get Navigation from Google Docs
	const navMeta = getMetadata('nav');
	const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
	const fragment = await loadFragment(navPath);

	// Create `nav` element
	const nav = document.createElement('nav');
	nav.id = 'nav';
	nav.classList.add('nav');

	// decorate nav DOM from Google Docs
	while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

	// Create home link
	const navHomeLink = nav.querySelector(':scope .default-content-wrapper:first-child > .button-container > .button');
	navHomeLink.classList.remove('button');
	navHomeLink.classList.add('nav__home-link');
	navHomeLink.parentElement.after(navHomeLink);
	navHomeLink.previousSibling.remove();

	// get nav list
	const navList = nav.querySelector(':scope .default-content-wrapper > ul');
	navList.classList.add('nav__list');

	// get nav items
	nav.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navItem) => {
		navItem.classList.add('nav__item')
	});

	// get nav links
	nav.querySelectorAll(':scope .default-content-wrapper > ul a').forEach((navLink) => {
		navLink.classList.add('nav__link')
		navLink.removeAttribute('title');
	});

	// Wrap the navigation in a `div`
	const navWrapper = document.createElement('div');
	navWrapper.classList.add('nav-wrapper');
	navWrapper.append(nav);

	// Add `nav` element to the block DOM
	block.append(navWrapper);

	// Remove unsused element
	navWrapper.previousSibling.remove();

	const navToggleButton = document.createElement('button');
	navToggleButton.classList.add('nav__toggle');
	navToggleButton.classList.add('nav__toggle--closed');
	navToggleButton.setAttribute('type','button');
	navToggleButton.innerText = 'Menu';

	// State and breakpoint checker
	const toggleChecker = () => {
		if (toggleQueryWidth.matches) {
			if (!navList.hasAttribute('aria-hidden')) {
				// setup small screen DOM
				navHomeLink.after(navToggleButton);
				navList.setAttribute('aria-hidden', true);
				navToggleButton.setAttribute('aria-expanded', false);
				navToggleButton.innerText = 'Menu';
			}
		} else {
			// unset small screen DOM
			navToggleButton.remove();
			navList.removeAttribute('aria-hidden');
		}
	}

	// Initiate Small Screen Check
	toggleChecker();

	navToggleButton.addEventListener('click', () => {
		if (navList.getAttribute('aria-hidden') === 'true') {
			navList.setAttribute('aria-hidden', false);
			navToggleButton.setAttribute('aria-expanded', true);
			navToggleButton.innerText = 'Close';
		} else {
			navList.setAttribute('aria-hidden', true);
			navToggleButton.setAttribute('aria-expanded', false);
			navToggleButton.innerText = 'Menu';
		}
	});

	// Rerun Small Screen Check on screen size change
	window.addEventListener("resize", () => toggleChecker());
}
