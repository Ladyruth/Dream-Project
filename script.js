document.addEventListener('DOMContentLoaded', () => {
    initCanvasZoom();
    initSplitScreenList();
});

/**
 * Canvas Zoom & Slider Controller (for index.html)
 */
function initCanvasZoom() {
    const sliderTrack = document.getElementById('sliderTrack');
    const zoomHandle = document.getElementById('zoomHandle');
    const zoomLabel = document.getElementById('zoomLabel');
    const zoomSlider = document.getElementById('zoomSlider');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    // Only run if canvas zoom slider elements exist
    if (!sliderTrack || !zoomSlider) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let isDragging = false;
    let isRunning = false;

    // Calculate progress (0.0 to 1.0) from client X coordinate relative to track bounds
    function getProgressFromX(clientX) {
        if (!sliderTrack) return 0;
        const rect = sliderTrack.getBoundingClientRect();
        if (rect.width <= 0) return 0;
        const handleWidth = zoomHandle ? zoomHandle.offsetWidth : 0;
        const maxLeft = Math.max(1, rect.width - handleWidth);
        const offset = clientX - rect.left - (handleWidth / 2);
        return Math.min(1, Math.max(0, offset / maxLeft));
    }

    // Update CSS custom property and UI handle position
    function render() {
        // Lerp for smooth spring-like movement
        const diff = targetProgress - currentProgress;
        if (Math.abs(diff) > 0.0001) {
            currentProgress += diff * 0.2;
        } else {
            currentProgress = targetProgress;
        }

        // 1. Set CSS root property --progress (0.0 to 1.0)
        document.documentElement.style.setProperty('--progress', currentProgress.toFixed(4));

        // 2. Position the zoom handle along the horizontal slider track while preserving translateY(-50%)
        if (sliderTrack && zoomHandle) {
            const trackWidth = sliderTrack.clientWidth;
            const handleWidth = zoomHandle.offsetWidth;
            const maxLeft = Math.max(0, trackWidth - handleWidth);
            const leftPx = currentProgress * maxLeft;
            zoomHandle.style.transform = `translate(${leftPx.toFixed(2)}px, -50%)`;
        }

        // 3. Update text percentage display
        const percentage = Math.round(currentProgress * 100);
        if (zoomLabel) {
            zoomLabel.textContent = `[ scroll to zoom - ${percentage}% ]`;
        }

        if (Math.abs(targetProgress - currentProgress) > 0.0001 || isDragging) {
            requestAnimationFrame(render);
        } else {
            isRunning = false;
        }
    }

    function requestRender() {
        if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(render);
        }
    }

    function setProgressFromPointer(e) {
        const clientX = (e.touches && e.touches.length > 0)
            ? e.touches[0].clientX
            : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);
        
        if (clientX !== undefined) {
            targetProgress = getProgressFromX(clientX);
            requestRender();
        }
    }

    // Pointer / Drag Events
    if (zoomSlider) {
        const startDrag = (e) => {
            if (e.target.classList.contains('arrow')) return;
            isDragging = true;
            zoomSlider.classList.add('dragging');
            if (e.pointerId && zoomSlider.setPointerCapture) {
                try { zoomSlider.setPointerCapture(e.pointerId); } catch (err) {}
            }
            setProgressFromPointer(e);
            if (e.cancelable) e.preventDefault();
        };

        if (window.PointerEvent) {
            zoomSlider.addEventListener('pointerdown', startDrag);
        } else {
            zoomSlider.addEventListener('mousedown', startDrag);
            zoomSlider.addEventListener('touchstart', startDrag, { passive: false });
        }
    }

    const onPointerMove = (e) => {
        if (isDragging) {
            setProgressFromPointer(e);
        }
    };

    const stopDragging = (e) => {
        if (isDragging) {
            isDragging = false;
            if (zoomSlider) zoomSlider.classList.remove('dragging');
            if (e && e.pointerId && zoomSlider && zoomSlider.hasPointerCapture && zoomSlider.hasPointerCapture(e.pointerId)) {
                try { zoomSlider.releasePointerCapture(e.pointerId); } catch (err) {}
            }
        }
    };

    if (window.PointerEvent) {
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', stopDragging);
        window.addEventListener('pointercancel', stopDragging);
    } else {
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('touchend', stopDragging);
        window.addEventListener('touchcancel', stopDragging);
    }

    // Arrow Button Handlers
    if (leftArrow) {
        leftArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            targetProgress = Math.max(0, targetProgress - 0.1);
            requestRender();
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            targetProgress = Math.min(1, targetProgress + 0.1);
            requestRender();
        });
    }

    // Keyboard Arrow & Plus/Minus Shortcuts
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
            targetProgress = Math.min(1, targetProgress + 0.05);
            requestRender();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === '-' || e.key === '_') {
            targetProgress = Math.max(0, targetProgress - 0.05);
            requestRender();
        }
    });

    // Wheel Event (Horizontal Scroll or Mousewheel)
    window.addEventListener('wheel', (e) => {
        let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (e.deltaMode === 1) {
            delta *= 33;
        } else if (e.deltaMode === 2) {
            delta *= 500;
        }
        const step = delta * 0.001;
        targetProgress = Math.min(1, Math.max(0, targetProgress + step));
        requestRender();
    }, { passive: true });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        requestRender();
    });

    // Initial render
    requestRender();
}

/**
 * Editorial Split-Screen List View Controller (for list.html)
 */
function initSplitScreenList() {
    const listItems = document.querySelectorAll('.list-wrapper .list-item');
    const imageWrappers = document.querySelectorAll('.image-group .image-wrapper');

    // Only run if split-screen list elements exist
    if (!listItems.length || !imageWrappers.length) return;

    // Cache image wrappers by id for quick reference
    const imageMap = new Map();
    imageWrappers.forEach((wrapper) => {
        if (wrapper.id) {
            imageMap.set(wrapper.id, wrapper);
        }
    });

    let currentActiveWrapper = null;

    /**
     * Reveal target image wrapper with smooth scale/fade transition and hide others
     * @param {string} targetId
     * @param {number} fallbackIndex
     */
    function activateImage(targetId, fallbackIndex = 0) {
        let targetWrapper = imageMap.get(targetId);

        // Fallback to index if matching ID is not found
        if (!targetWrapper && imageWrappers[fallbackIndex]) {
            targetWrapper = imageWrappers[fallbackIndex];
        }

        if (!targetWrapper || targetWrapper === currentActiveWrapper) return;

        // Deactivate previous wrapper
        if (currentActiveWrapper) {
            currentActiveWrapper.classList.remove('is-active');
        }

        // Activate new target wrapper
        targetWrapper.classList.add('is-active');
        currentActiveWrapper = targetWrapper;
    }

    // Attach mouseenter and focus listeners to each list item
    listItems.forEach((item, index) => {
        const targetId = item.getAttribute('data-image');

        item.addEventListener('mouseenter', () => {
            activateImage(targetId, index % imageWrappers.length);
        });

        item.addEventListener('focusin', () => {
            activateImage(targetId, index % imageWrappers.length);
        });
    });

    // Ensure the initial active item's image is displayed on page load by default
    const firstItem = listItems[0];
    const initialTargetId = firstItem ? firstItem.getAttribute('data-image') : null;
    activateImage(initialTargetId, 0);
}


