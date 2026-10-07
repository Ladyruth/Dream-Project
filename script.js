document.addEventListener('DOMContentLoaded', () => {
    initCanvasZoom();
    initSplitScreenList();
});

/**
 * Canvas Zoom & Slider Controller (for index.html)
 */
/**
 * Canvas Zoom & Slider Controller (for index.html)
 */
/**
 * Canvas Zoom & Slider Controller (for index.html)
 */
function initCanvasZoom() {
    if (document.getElementById('canvasWrapper') && document.getElementById('canvas')) {
        window.infiniteCanvas2D = new InfiniteCanvas2D();
    }
}

/**
 * Infinite 2D Seamless Canvas Controller
 * Matches initial 5x3 grid view (Image 1) at zoom 0% with CSS --progress image zoom and 2D pan dragging.
 */
class InfiniteCanvas2D {
    constructor() {
        this.wrapper = document.getElementById('canvasWrapper');
        this.canvas = document.getElementById('canvas');
        this.sliderTrack = document.getElementById('sliderTrack');
        this.zoomHandle = document.getElementById('zoomHandle');
        this.zoomLabel = document.getElementById('zoomLabel');
        this.zoomSlider = document.getElementById('zoomSlider');
        this.leftArrow = document.querySelector('.left-arrow');
        this.rightArrow = document.querySelector('.right-arrow');

        if (!this.wrapper || !this.canvas) return;

        // Retrieve 15 life area items
        this.items = (window.lifeAreaData && window.lifeAreaData.length > 0)
            ? window.lifeAreaData
            : this.getFallbackItems();

        this.COLS = 5;
        this.ROWS = 3;

        // Panning & Progress State
        this.panX = 0;
        this.panY = 0;
        this.targetProgress = 0;
        this.currentProgress = 0;

        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
        this.panOriginX = 0;
        this.panOriginY = 0;
        this.dragDistance = 0;

        // Inertia state
        this.velX = 0;
        this.velY = 0;
        this.lastPanX = 0;
        this.lastPanY = 0;
        this.lastPanTime = 0;
        this.inertiaRaf = 0;

        // Virtual DOM pool
        this.pool = [];
        this.poolCols = 0;
        this.poolRows = 0;
        this.lastStartCol = null;
        this.lastStartRow = null;

        this.isSliderDragging = false;
        this.pinchActive = false;
        this.pinchStartDist = 0;
        this.pinchStartProgress = 0;

        this.init();
    }

    getFallbackItems() {
        return [
            { id: "family", question: "Why doesn't the life everyone wants for me feel right?", image: "images/1-family.jpg" },
            { id: "appearance", question: "Why do I care so much about how I look?", image: "images/2-appearance.jpg" },
            { id: "purpose", question: "Should I quit and do something that actually matters to me?", image: "images/3-purpose.jpg" },
            { id: "career", question: "I have an idea... but who am I to do it?", image: "images/4-career.jpg" },
            { id: "loss", question: "How do I move on after my whole life fell apart?", image: "images/5-loss.jpg" },
            { id: "healing", question: "Can I ever be happy after everything I've been through?", image: "images/6-healing.jpg" },
            { id: "identity", question: "Why do I feel like I don't fit into my own life?", image: "images/7-identity.jpg" },
            { id: "work", question: "What if everyone thinks I'm wrong?", image: "images/8-work.jpg" },
            { id: "decisions", question: "How do I know I'm making the right decision?", image: "images/9-decisions.jpg" },
            { id: "midlife", question: "Is it too late to start over?", image: "images/10-midlife.jpg" },
            { id: "reassurance", question: "Will I ever feel like myself again?", image: "images/11-identity.jpg" },
            { id: "opinions", question: "Why do I always feel different from everyone else?", image: "images/12-opinions.jpg" },
            { id: "community", question: "I want to make a difference, but where do I even begin?", image: "images/13-community.jpg" },
            { id: "health", question: "Should I stay quiet, or should I say what I really think?", image: "images/14-health.jpg" },
            { id: "voice", question: "When will my voice finally feel like it matters?", image: "images/15-voice.jpg" }
        ];
    }

    // Grid step dimensions at default view (0% zoom)
    getGridDimensions() {
        const W = window.innerWidth;
        const H = window.innerHeight;

        // 5 columns x 3 rows grid step size
        const stepX = W / 5;
        const stepY = H / 3;

        return { W, H, stepX, stepY, tileW: stepX, tileH: stepY };
    }

    getItemForCell(col, row) {
        if (!this.items || !this.items.length) return null;
        const c = ((col % this.COLS) + this.COLS) % this.COLS;
        const r = ((row % this.ROWS) + this.ROWS) % this.ROWS;
        const index = r * this.COLS + c;
        return this.items[index % this.items.length];
    }

    createTileElement(tileW, tileH) {
        const card = document.createElement('a');
        card.className = 'card';
        card.style.position = 'absolute';
        card.style.width = tileW + 'px';
        card.style.height = tileH + 'px';

        const imgBox = document.createElement('div');
        imgBox.className = 'img-box';

        const img = document.createElement('img');
        img.className = 'card-image';
        img.draggable = false;
        img.alt = '';
        imgBox.appendChild(img);

        const title = document.createElement('p');
        title.className = 'card-title';

        card.appendChild(imgBox);
        card.appendChild(title);
        this.canvas.appendChild(card);

        card.addEventListener('click', (e) => {
            if (this.dragDistance > 6) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        return card;
    }

    assignTile(entry, col, row, dims) {
        entry.col = col;
        entry.row = row;

        const posX = col * dims.stepX;
        const posY = row * dims.stepY;
        entry.el.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0)`;

        const item = this.getItemForCell(col, row);
        if (item) {
            entry.el.href = `life-area.html?id=${encodeURIComponent(item.id)}`;
            const img = entry.el.querySelector('.card-image');
            if (img.getAttribute('data-src') !== item.image) {
                img.setAttribute('data-src', item.image);
                img.src = item.image;
            }
            img.alt = item.id;

            const title = entry.el.querySelector('.card-title');
            const displayTitle = item.id ? item.id.charAt(0).toUpperCase() + item.id.slice(1) : '';
            title.textContent = `- ${displayTitle} -`;
        }
    }

    initPool() {
        this.pool.forEach(e => {
            if (this.canvas.contains(e.el)) this.canvas.removeChild(e.el);
        });
        this.pool = [];
        this.lastStartCol = null;
        this.lastStartRow = null;

        const dims = this.getGridDimensions();

        // Number of pool columns and rows to cover screen + buffer in 2D
        this.poolCols = Math.ceil(dims.W / dims.stepX) + 4;
        this.poolRows = Math.ceil(dims.H / dims.stepY) + 4;

        for (let r = 0; r < this.poolRows; r++) {
            for (let c = 0; c < this.poolCols; c++) {
                this.pool.push({
                    el: this.createTileElement(dims.tileW, dims.tileH),
                    col: 0,
                    row: 0
                });
            }
        }
        this.repositionPool();
    }

    repositionPool() {
        const dims = this.getGridDimensions();
        const startCol = Math.floor(-this.panX / dims.stepX) - 2;
        const startRow = Math.floor(-this.panY / dims.stepY) - 2;

        if (startCol === this.lastStartCol && startRow === this.lastStartRow) return;

        this.lastStartCol = startCol;
        this.lastStartRow = startRow;

        let index = 0;
        for (let r = 0; r < this.poolRows; r++) {
            for (let c = 0; c < this.poolCols; c++) {
                if (index < this.pool.length) {
                    this.assignTile(this.pool[index++], startCol + c, startRow + r, dims);
                }
            }
        }
    }

    applyTransform() {
        this.canvas.style.transform = `translate3d(${this.panX.toFixed(2)}px, ${this.panY.toFixed(2)}px, 0)`;
        this.repositionPool();
    }

    render() {
        const diff = this.targetProgress - this.currentProgress;
        if (Math.abs(diff) > 0.0001) {
            this.currentProgress += diff * 0.2;
        } else {
            this.currentProgress = this.targetProgress;
        }

        // Set CSS root property --progress (0.0 to 1.0) to drive image thumbnail zoom
        document.documentElement.style.setProperty('--progress', this.currentProgress.toFixed(4));

        if (this.sliderTrack && this.zoomHandle) {
            const trackWidth = this.sliderTrack.clientWidth;
            const handleWidth = this.zoomHandle.offsetWidth || 80;
            const maxLeft = Math.max(0, trackWidth - handleWidth);
            const leftPx = this.currentProgress * maxLeft;
            this.zoomHandle.style.transform = `translate(${leftPx.toFixed(2)}px, -50%)`;
        }

        const percentage = Math.round(this.currentProgress * 100);
        if (this.zoomLabel) {
            this.zoomLabel.textContent = `[ scroll to zoom - ${percentage}% ]`;
        }

        this.applyTransform();

        if (Math.abs(this.targetProgress - this.currentProgress) > 0.0001) {
            requestAnimationFrame(() => this.render());
        }
    }

    sampleVelocity(x, y) {
        const now = performance.now();
        const dt = now - this.lastPanTime;
        if (dt > 0 && dt < 80) {
            const vx = (x - this.lastPanX) / dt;
            const vy = (y - this.lastPanY) / dt;
            this.velX = this.velX * 0.4 + vx * 0.6;
            this.velY = this.velY * 0.4 + vy * 0.6;
        }
        this.lastPanX = x; this.lastPanY = y; this.lastPanTime = now;
    }

    cancelInertia() {
        if (this.inertiaRaf) {
            cancelAnimationFrame(this.inertiaRaf);
            this.inertiaRaf = 0;
        }
        this.velX = 0; this.velY = 0;
    }

    startInertia() {
        this.cancelInertia();
        const speed = Math.hypot(this.velX, this.velY);
        if (speed < 0.04) return;

        const maxVel = 1.8;
        if (speed > maxVel) {
            const f = maxVel / speed;
            this.velX *= f; this.velY *= f;
        }

        let lastTime = performance.now();
        const step = (now) => {
            const dt = Math.min(now - lastTime, 50);
            lastTime = now;
            const friction = Math.pow(0.88, dt / 16);
            this.velX *= friction; this.velY *= friction;
            this.panX += this.velX * dt;
            this.panY += this.velY * dt;
            this.applyTransform();

            if (Math.hypot(this.velX, this.velY) > 0.04) {
                this.inertiaRaf = requestAnimationFrame(step);
            } else {
                this.inertiaRaf = 0;
            }
        };
        this.inertiaRaf = requestAnimationFrame(step);
    }

    getProgressFromX(clientX) {
        if (!this.sliderTrack) return 0;
        const rect = this.sliderTrack.getBoundingClientRect();
        if (rect.width <= 0) return 0;
        const handleWidth = this.zoomHandle ? this.zoomHandle.offsetWidth : 0;
        const maxLeft = Math.max(1, rect.width - handleWidth);
        const offset = clientX - rect.left - (handleWidth / 2);
        return Math.min(1, Math.max(0, offset / maxLeft));
    }

    init() {
        this.initPool();
        this.applyTransform();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // --- Mouse Drag / Pan ---
        this.wrapper.addEventListener('mousedown', (e) => {
            if (e.target.closest('.navbar') || e.target.closest('.side-nav') || e.target.closest('.zoom-slider-container')) return;

            this.cancelInertia();
            this.isPanning = true;
            this.dragDistance = 0;
            this.panStartX = e.clientX;
            this.panStartY = e.clientY;
            this.panOriginX = this.panX;
            this.panOriginY = this.panY;

            this.lastPanX = e.clientX; this.lastPanY = e.clientY; this.lastPanTime = performance.now();
            this.wrapper.classList.add('is-panning');
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isPanning) return;
            const dx = e.clientX - this.panStartX;
            const dy = e.clientY - this.panStartY;
            this.dragDistance = Math.hypot(dx, dy);

            this.sampleVelocity(e.clientX, e.clientY);
            this.panX = this.panOriginX + dx;
            this.panY = this.panOriginY + dy;
            this.applyTransform();
        });

        window.addEventListener('mouseup', () => {
            if (this.isPanning) {
                this.isPanning = false;
                this.wrapper.classList.remove('is-panning');
                this.startInertia();
            }
        });

        // --- Touch Drag & Pinch Zoom ---
        this.wrapper.addEventListener('touchstart', (e) => {
            if (e.target.closest('.navbar') || e.target.closest('.side-nav') || e.target.closest('.zoom-slider-container')) return;

            this.cancelInertia();
            if (e.touches.length === 2) {
                this.isPanning = false;
                this.pinchActive = true;
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                this.pinchStartDist = Math.hypot(dx, dy);
                this.pinchStartProgress = this.currentProgress;
                return;
            }

            if (e.touches.length === 1) {
                this.pinchActive = false;
                this.isPanning = true;
                this.dragDistance = 0;
                this.panStartX = e.touches[0].clientX;
                this.panStartY = e.touches[0].clientY;
                this.panOriginX = this.panX;
                this.panOriginY = this.panY;

                this.lastPanX = e.touches[0].clientX;
                this.lastPanY = e.touches[0].clientY;
                this.lastPanTime = performance.now();
            }
        }, { passive: true });

        this.wrapper.addEventListener('touchmove', (e) => {
            if (this.pinchActive && e.touches.length === 2) {
                e.preventDefault();
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const dist = Math.hypot(dx, dy);
                if (this.pinchStartDist > 0) {
                    this.targetProgress = Math.min(1, Math.max(0, this.pinchStartProgress * (dist / this.pinchStartDist)));
                    this.render();
                }
                return;
            }

            if (this.isPanning && e.touches.length === 1) {
                const dx = e.touches[0].clientX - this.panStartX;
                const dy = e.touches[0].clientY - this.panStartY;
                this.dragDistance = Math.hypot(dx, dy);

                this.sampleVelocity(e.touches[0].clientX, e.touches[0].clientY);
                this.panX = this.panOriginX + dx;
                this.panY = this.panOriginY + dy;
                this.applyTransform();
            }
        }, { passive: false });

        this.wrapper.addEventListener('touchend', (e) => {
            if (this.pinchActive && e.touches.length < 2) {
                this.pinchActive = false;
                return;
            }
            if (this.isPanning) {
                this.isPanning = false;
                this.startInertia();
            }
        }, { passive: true });

        // --- Wheel Zoom ---
        this.wrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.cancelInertia();

            const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            const step = delta * 0.0015;
            this.targetProgress = Math.min(1, Math.max(0, this.targetProgress + step));
            this.render();
        }, { passive: false });

        // --- Bottom Slider Drag ---
        if (this.zoomSlider) {
            const handleSliderPointer = (e) => {
                const clientX = (e.touches && e.touches.length > 0)
                    ? e.touches[0].clientX
                    : (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX);

                if (clientX !== undefined) {
                    this.targetProgress = this.getProgressFromX(clientX);
                    this.render();
                }
            };

            const startSliderDrag = (e) => {
                if (e.target.classList.contains('arrow')) return;
                this.isSliderDragging = true;
                this.zoomSlider.classList.add('dragging');
                handleSliderPointer(e);
                if (e.cancelable) e.preventDefault();
            };

            if (window.PointerEvent) {
                this.zoomSlider.addEventListener('pointerdown', startSliderDrag);
            } else {
                this.zoomSlider.addEventListener('mousedown', startSliderDrag);
                this.zoomSlider.addEventListener('touchstart', startSliderDrag, { passive: false });
            }

            const onSliderMove = (e) => {
                if (this.isSliderDragging) {
                    handleSliderPointer(e);
                }
            };

            const stopSliderDrag = () => {
                if (this.isSliderDragging) {
                    this.isSliderDragging = false;
                    this.zoomSlider.classList.remove('dragging');
                }
            };

            window.addEventListener('mousemove', onSliderMove);
            window.addEventListener('touchmove', onSliderMove, { passive: true });
            window.addEventListener('mouseup', stopSliderDrag);
            window.addEventListener('touchend', stopSliderDrag);
        }

        // --- Arrow Buttons ---
        if (this.leftArrow) {
            this.leftArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                this.targetProgress = Math.max(0, this.targetProgress - 0.1);
                this.render();
            });
        }

        if (this.rightArrow) {
            this.rightArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                this.targetProgress = Math.min(1, this.targetProgress + 0.1);
                this.render();
            });
        }

        // --- Keyboard Shortcuts ---
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
                this.targetProgress = Math.min(1, this.targetProgress + 0.05);
                this.render();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === '-' || e.key === '_') {
                this.targetProgress = Math.max(0, this.targetProgress - 0.05);
                this.render();
            }
        });

        // --- Window Resize ---
        window.addEventListener('resize', () => {
            this.initPool();
            this.applyTransform();
            this.render();
        });
    }
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


