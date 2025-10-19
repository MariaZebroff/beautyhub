import { createRoot, createElement } from '@wordpress/element';

const hydrate = (className, El) => {
  const wrappers = document.querySelectorAll(className);

  wrappers.forEach((wrapper) => {
    let dataDiv = wrapper.querySelector('.data-div');

    if (!dataDiv) {
      console.error('No data-div found in wrapper');
      return;
    }

    let attributes = JSON.parse(dataDiv.dataset.attributes);

    const root = createRoot(wrapper);
    root.render(createElement(El, attributes));
  });
};

export default hydrate;
