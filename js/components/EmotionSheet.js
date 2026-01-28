/**
 * Emotion Sheet Component
 * Handles emotion selection bottom sheet
 */



export class EmotionSheet {
    constructor() {
        this.currentEmotionBtn = null;
        this.overlay = null;
        this.bottomSheet = null;
    }

    /**
     * Setup emotion selection
     */
    setup() {
        this.overlay = document.getElementById('emotionOverlay');
        this.bottomSheet = document.getElementById('emotionBottomSheet');
        const closeBtn = document.getElementById('emotionCloseBtn');
        const emotionChips = document.querySelectorAll('.emotion-chip');

        if (!this.overlay || !this.bottomSheet) return;

        // Emotion select button click (event delegation)
        document.addEventListener('click', (e) => {
            const emotionBtn = e.target.closest('.emotion-select-btn');
            if (emotionBtn) {
                this.currentEmotionBtn = emotionBtn;
                this.open();
            }
        });

        // Overlay click to close
        this.overlay.addEventListener('click', () => {
            this.close();
        });

        // Close button click
        closeBtn?.addEventListener('click', () => {
            this.close();
        });

        // Emotion chip click
        emotionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.selectEmotion(chip.dataset.emotion);
            });
        });
    }

    /**
     * Open emotion sheet
     */
    open() {
        const emotionChips = document.querySelectorAll('.emotion-chip');

        // Highlight current selection
        const currentEmotion = this.currentEmotionBtn?.dataset.selectedEmotion;
        emotionChips.forEach(chip => {
            chip.classList.toggle('selected', chip.dataset.emotion === currentEmotion);
        });

        this.overlay.classList.add('active');
        this.bottomSheet.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close emotion sheet
     */
    close() {
        this.overlay.classList.remove('active');
        this.bottomSheet.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEmotionBtn = null;
    }

    /**
     * Select an emotion
     */
    selectEmotion(emotion) {
        if (!this.currentEmotionBtn) return;

        const textSpan = this.currentEmotionBtn.querySelector('span');

        if (emotion === '없음') {
            if (textSpan) {
                textSpan.textContent = '감정표현';
            }
            delete this.currentEmotionBtn.dataset.selectedEmotion;
            this.currentEmotionBtn.classList.remove('selected');

            this.close();

        } else {
            if (textSpan) {
                textSpan.textContent = emotion;
            }
            this.currentEmotionBtn.dataset.selectedEmotion = emotion;
            this.currentEmotionBtn.classList.add('selected');

            this.close();

        }
    }
}
