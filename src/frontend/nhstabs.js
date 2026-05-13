(function () {
  function initTabs(root) {
    const tabList = root.querySelector('.nhsuk-tabs__list');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('.nhsuk-tabs__tab'));
    const items = Array.from(tabList.querySelectorAll('.nhsuk-tabs__list-item'));
    const panels = Array.from(root.querySelectorAll('.nhsuk-tabs__panel'));

    if (!tabs.length || !panels.length) return;

    function activateTabById(id) {
      // Tabs + selected state
      tabs.forEach((tab, i) => {
        const isActive = tab.getAttribute('href') === `#${id}`;

        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');

        if (items[i]) {
          items[i].classList.toggle('nhsuk-tabs__list-item--selected', isActive);
        }
      });

      // Panels (theme-proof)
      panels.forEach((panel) => {
        const isActive = panel.id === id;

        // keep class toggling (for themes that use NHS CSS)
        panel.classList.toggle('nhsuk-tabs__panel--hidden', !isActive);

        // force visibility regardless of theme CSS
        panel.style.display = isActive ? '' : 'none';

        // a11y hint
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
    }

    // Initial activation: prefer aria-selected=true, else first tab
    const initiallySelected =
      tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];

    activateTabById(initiallySelected.getAttribute('href').substring(1));

    // Click handling
    tabList.addEventListener('click', function (e) {
      const tab = e.target.closest('.nhsuk-tabs__tab');
      if (!tab) return;

      e.preventDefault();
      activateTabById(tab.getAttribute('href').substring(1));
    });

    // Keyboard support (left/right)
    tabList.addEventListener('keydown', function (e) {
      const currentIndex = tabs.findIndex(
        (t) => t.getAttribute('aria-selected') === 'true'
      );
      if (currentIndex === -1) return;

      let nextIndex = null;
      if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;

      if (nextIndex === null) return;

      e.preventDefault();
      tabs[nextIndex].focus();
      activateTabById(tabs[nextIndex].getAttribute('href').substring(1));
    });
  }

  function initAll() {
    document
      .querySelectorAll('.nhsuk-tabs[data-module="nhsuk-tabs"]')
      .forEach(initTabs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
