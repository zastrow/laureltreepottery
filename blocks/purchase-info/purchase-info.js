import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const purchaseInfoMeta = getMetadata('purchase-info');
  block.textContent = '';

  // load footer fragment
  const purchaseInfoPath = purchaseInfoMeta.purchaseInfo || '/purchase-info';
  const fragment = await loadFragment(purchaseInfoPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
