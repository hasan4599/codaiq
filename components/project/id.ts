import { nanoid } from 'nanoid';

export function addUniqueIdsToHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function recurse(element: Element) {
    if (!element.hasAttribute('data-uid')) {
      element.setAttribute('data-uid', nanoid());
    }
    element.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        recurse(child as Element);
      }
    });
  }

  recurse(doc.documentElement);
  return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
}
