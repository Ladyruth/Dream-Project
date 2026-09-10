/**
 * ==============================================================================
 * Life-Area Controller (life-area.js)
 * ==============================================================================
 * 
 * HOW THE URL PARAMETER CONNECTS TO THE DATA & HTML:
 * 1. The user visits: life-area.html?id=family (or ?id=appearance, ?id=purpose, etc.)
 * 2. URLSearchParams extracts the value of 'id' from the URL bar (e.g. "family").
 * 3. We search 'lifeAreaData' from data.js to find the matching object.
 * 4. We inject that object's question, figure name, image, and copy into the HTML elements.
 * 5. Clicking any of the 3 tabs dynamically updates the reading card text without a page reload.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. URL Parameter Extraction
    // -------------------------------------------------------------------------
    // Read the query string after '?' in the browser URL bar
    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = urlParams.get('id');

    // Retrieve data from data.js (fallback to empty array if not yet loaded)
    const dataset = window.lifeAreaData || [];

    // Find the item matching either string ID ('family') or numeric ID ('1')
    let currentItem = dataset.find((item) => {
        if (!requestedId) return false;
        const query = requestedId.toLowerCase().trim();
        return item.id.toLowerCase() === query || item.numericId === query;
    });

    // Safe fallback: default to the first item (Rose of Lima / Family) if missing or invalid
    if (!currentItem && dataset.length > 0) {
        currentItem = dataset[0];
    }

    if (!currentItem) {
        console.warn('Life area data could not be found.');
        return;
    }

    // -------------------------------------------------------------------------
    // 2. DOM Elements Reference
    // -------------------------------------------------------------------------
    const questionEl = document.getElementById('areaQuestion') || document.querySelector('.area-image-group > p');
    const imageEl = document.getElementById('areaImage') || document.querySelector('.image-wrap img');
    const figureNameEl = document.getElementById('figureName') || document.querySelector('.figure-name');
    const tabTextEl = document.getElementById('tabText') || document.querySelector('.text-wrapper p');
    const tabButtons = document.querySelectorAll('.tab-button');

    // -------------------------------------------------------------------------
    // 3. Initial DOM Injection
    // -------------------------------------------------------------------------
    // Inject question headline
    if (questionEl) {
        questionEl.textContent = currentItem.question;
    }

    // Inject portrait image source and alt text
    if (imageEl) {
        imageEl.src = currentItem.image;
        imageEl.alt = currentItem.figureName || currentItem.question;
    }

    // Inject figure caption (e.g., "// Rose of Lima")
    if (figureNameEl) {
        figureNameEl.textContent = `// ${currentItem.figureName}`;
    }

    // Tab button display labels (active tab gets wrapped in brackets: [ ... ])
    const tabLabels = {
        story: '1 Story',
        thoughts: '2 Thoughts',
        action: '3 One thing to do'
    };

    // -------------------------------------------------------------------------
    // 4. Tab Switching Logic
    // -------------------------------------------------------------------------
    /**
     * Set active tab and swap the content card text
     * @param {string} tabKey - 'story' | 'thoughts' | 'action'
     */
    function switchTab(tabKey) {
        // 1. Swap the reading card text with a smooth subtle fade
        if (tabTextEl && currentItem[tabKey]) {
            tabTextEl.style.opacity = '0';
            setTimeout(() => {
                tabTextEl.textContent = currentItem[tabKey];
                tabTextEl.style.opacity = '1';
            }, 150);
        }

        // 2. Update the tab buttons: toggle .is-active and toggle [ brackets ]
        tabButtons.forEach((btn) => {
            const key = btn.getAttribute('data-tab');
            const isActive = (key === tabKey);

            btn.classList.toggle('is-active', isActive);

            // In the design, the active tab is wrapped in brackets: [ 1 Story ]
            const labelText = tabLabels[key] || btn.textContent.replace(/[\[\]]/g, '').trim();
            btn.textContent = isActive ? `[ ${labelText} ]` : labelText;
        });
    }

    // Attach click listener to each tab button
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabKey = btn.getAttribute('data-tab');
            if (tabKey) {
                switchTab(tabKey);
            }
        });
    });

    // Display initial tab ('story') on page load
    switchTab('story');
});
