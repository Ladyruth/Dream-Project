/**
 * ==============================================================================
 * About Page Controller (about.js)
 * ==============================================================================
 * Handles the two-step transition between:
 * - Step 1: 1 - About this project & 2 - Image Attributions
 * - Step 2: 3 - Contributors
 * 
 * Supports Prev / Next button clicks, step dot clicks, and keyboard arrow keys.
 */

document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2')
    ];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.step-dot');

    let currentStep = 0;

    /**
     * Updates the visible step, dot indicators, and button states
     * @param {number} newIndex
     */
    function goToStep(newIndex) {
        if (newIndex < 0 || newIndex >= steps.length) return;

        currentStep = newIndex;

        // Toggle active step with smooth opacity/scale transition
        steps.forEach((step, idx) => {
            if (step) {
                step.classList.toggle('is-active', idx === currentStep);
            }
        });

        // Update dot indicators
        dots.forEach((dot, idx) => {
            dot.classList.toggle('is-active', idx === currentStep);
        });

        // Update Prev button state
        if (prevBtn) {
            prevBtn.disabled = (currentStep === 0);
            prevBtn.style.opacity = (currentStep === 0) ? '0.3' : '1';
            prevBtn.style.cursor = (currentStep === 0) ? 'default' : 'pointer';
        }

        // Update Next button label & state
        if (nextBtn) {
            if (currentStep === steps.length - 1) {
                // On the last step (Contributors), clicking Next proceeds to Contact page
                nextBtn.textContent = 'Contact >';
            } else {
                nextBtn.textContent = 'Next >';
            }
        }
    }

    // Previous Button click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                goToStep(currentStep - 1);
            }
        });
    }

    // Next Button click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                goToStep(currentStep + 1);
            } else {
                // Navigate to contact.html from the contributors step
                window.location.href = 'contact.html';
            }
        });
    }

    // Direct click on step dot indicators
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.getAttribute('data-step'), 10);
            if (!isNaN(target)) {
                goToStep(target);
            }
        });
    });

    // Keyboard Arrow navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
            goToStep(currentStep + 1);
        } else if (e.key === 'ArrowLeft' && currentStep > 0) {
            goToStep(currentStep - 1);
        }
    });

    // Initialize step 0
    goToStep(0);
});
