/**
 * Form Validation Component
 * Handles character counters, textarea resize, and form validation
 */



export class FormValidation {
    /**
     * Setup all form validation features
     */
    setup() {
        this.setupCharCounters();
        this.setupTextareaAutoResize();
        this.setupAutoGenerate();
        this.setupTagButtons();
        this.setupBackButton();
        this.setupFormSubmission();
    }

    /**
     * Setup character counters
     */
    setupCharCounters() {
        document.querySelectorAll('.text-input[maxlength], .textarea-input[maxlength]').forEach(input => {
            const wrapper = input.closest('.input-wrapper');
            if (!wrapper) return;

            const counter = wrapper.querySelector('.char-counter') ||
                wrapper.parentElement.querySelector('.char-counter');
            if (!counter) return;

            const maxLength = input.getAttribute('maxlength');

            const updateCounter = () => {
                const currentLength = input.value.length;
                counter.textContent = `${currentLength}/${maxLength}`;
                counter.style.color = currentLength >= maxLength * 0.9 ? '#FF4757' : '#909090';
            };

            input.addEventListener('input', updateCounter);
        });
    }

    /**
     * Setup textarea auto resize
     */
    setupTextareaAutoResize() {
        const autoResize = (el) => {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
        };

        document.querySelectorAll('.textarea-input').forEach(textarea => {
            // Initial resize
            autoResize(textarea);

            // On input
            textarea.addEventListener('input', () => autoResize(textarea));
        });
    }

    /**
     * Setup auto generate buttons (AI sample text)
     */
    setupAutoGenerate() {
        document.querySelectorAll('.generate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const fieldGroup = btn.closest('.field-group') || btn.closest('.field-header-with-btn')?.parentElement;
                const input = fieldGroup?.querySelector('.text-input, .textarea-input');

                if (input) {
                    const sampleTexts = [
                        '당신의 과거에 대해 알려주세요.',
                        '오늘 기분이 어때요?',
                        '무엇을 도와드릴까요?',
                        '안녕하세요, 저는 AI 어시스턴트입니다.',
                        '어떤 이야기를 나눠볼까요?'
                    ];
                    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

                    this.animateText(input, randomText, btn);
                }
            });
        });
    }

    /**
     * Text typing animation
     */
    animateText(input, text, btn) {
        btn.disabled = true;

        let currentText = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                currentText += text[index];
                input.value = currentText;

                // Trigger input event for counter update
                input.dispatchEvent(new Event('input', { bubbles: true }));

                index++;
                setTimeout(type, 30);
            } else {
                btn.disabled = false;
            }
        };

        input.value = '';
        type();
    }

    /**
     * Setup tag suggestion buttons
     */
    setupTagButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-btn')) {
                const tagText = e.target.textContent;
                const fieldGroup = e.target.closest('.field-group');
                const textarea = fieldGroup?.querySelector('.textarea-input');

                if (textarea) {
                    const start = textarea.selectionStart || textarea.value.length;
                    const end = textarea.selectionEnd || textarea.value.length;
                    const before = textarea.value.substring(0, start);
                    const after = textarea.value.substring(end);

                    textarea.value = before + tagText + after;
                    textarea.focus();
                    textarea.setSelectionRange(start + tagText.length, start + tagText.length);

                    // Trigger input event
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));


                }
            }
        });
    }

    /**
     * Setup back button (disabled)
     */
    setupBackButton() {
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.disabled = true;
            backBtn.style.opacity = '0.3';
            backBtn.style.cursor = 'default';
        }
    }

    /**
     * Setup form submission
     */
    setupFormSubmission() {
        const saveBtn = document.querySelector('.cta-btn.primary');
        const previewBtn = document.querySelector('.cta-btn.secondary');

        saveBtn?.addEventListener('click', () => {
            // Validate required fields
            const requiredFields = document.querySelectorAll('[required], .field-required');
            let isValid = true;

            // Simple validation (can be expanded)
            const characterName = document.querySelector('.character-section input.text-input');
            if (characterName && !characterName.value.trim()) {
                isValid = false;

                characterName.focus();
                return;
            }

            if (isValid) {

            }
        });

        previewBtn?.addEventListener('click', () => {

        });
    }
}
