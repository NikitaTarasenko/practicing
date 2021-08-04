function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabsLinks = document.querySelectorAll(tabsSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabs = document.querySelectorAll(tabsContentSelector);

    function hideTabsContent() {
        tabs.forEach((item, index) => {
            item.classList.add('hide');
            item.classList.remove('show');
            tabsLinks[index].classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add('show');
        tabs[i].classList.remove('hide');
        tabsLinks[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabContent();



    tabsParent.addEventListener('click', (event) => {
        const target = event.target;


        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabsLinks.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;