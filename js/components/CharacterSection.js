/**
 * Character Section Component
 * Handles adding, deleting, and renumbering character sections
 */



export class CharacterSection {
    constructor() {
        this.characterCount = 1;
        this.maxCharacters = 5;
    }

    /**
     * Setup add character button
     */
    setup() {
        const addBtn = document.getElementById('addCharacterBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const container = document.getElementById('characterSectionsContainer');
                if (container) {
                    this.addSection(container);
                }
            });
        }

        // Setup initial delete button
        this.setupDeleteButtons();
    }

    /**
     * Add a new character section
     */
    addSection(container) {
        if (this.characterCount >= this.maxCharacters) {

            return;
        }

        this.characterCount++;

        // Get existing section to clone
        const existingSection = container.querySelector('.character-section');
        if (!existingSection) return;

        // Clone section
        const newSection = existingSection.cloneNode(true);

        // Update index
        newSection.dataset.characterIndex = this.characterCount;

        // Update title
        const title = newSection.querySelector('.section-title');
        if (title) {
            title.textContent = `캐릭터 설정 ${(this.characterCount)}`;
        }

        // Show delete button
        const deleteBtn = newSection.querySelector('.delete-character-btn');
        if (deleteBtn) {
            deleteBtn.style.display = 'flex';
        }

        // Reset inputs
        newSection.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
        });

        // Reset image uploads
        newSection.querySelectorAll('.image-upload, .situation-upload').forEach(upload => {
            upload.style.backgroundImage = '';
            upload.classList.remove('has-image');

            if (upload.classList.contains('situation-upload')) {
                upload.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.75 6L9 2.25L5.25 6" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 2.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>이미지 등록</span>
        `;
            }
        });

        // Reset counters
        newSection.querySelectorAll('.char-counter').forEach(counter => {
            const maxLength = counter.textContent.split('/')[1];
            counter.textContent = `0/${maxLength}`;
            counter.style.color = '#909090';
        });

        // Add to container
        container.appendChild(newSection);

        // Update button states
        this.updateDeleteButtons();
        this.updateAddButtonState();



        return newSection;
    }

    /**
     * Delete a character section
     */
    deleteSection(section) {
        const container = document.getElementById('characterSectionsContainer');
        const sections = container.querySelectorAll('.character-section');

        if (sections.length <= 1) {

            return;
        }

        // Animate out
        section.classList.add('removing');

        setTimeout(() => {
            section.remove();
            this.characterCount--;
            this.updateDeleteButtons();
            this.renumberSections();
            this.updateAddButtonState();

        }, 300);
    }

    /**
     * Setup delete button event listeners
     */
    setupDeleteButtons() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.delete-character-btn');
            if (btn) {
                const section = btn.closest('.character-section');
                if (section) {
                    this.deleteSection(section);
                }
            }
        });
    }

    /**
     * Update delete button visibility
     */
    updateDeleteButtons() {
        const container = document.getElementById('characterSectionsContainer');
        const sections = container.querySelectorAll('.character-section');

        sections.forEach((section, index) => {
            const deleteBtn = section.querySelector('.delete-character-btn');
            if (deleteBtn) {
                deleteBtn.style.display = sections.length > 1 ? 'flex' : 'none';
            }
        });
    }

    /**
     * Renumber sections after deletion
     */
    renumberSections() {
        const container = document.getElementById('characterSectionsContainer');
        const sections = container.querySelectorAll('.character-section');

        sections.forEach((section, index) => {
            const num = index + 1;
            section.dataset.characterIndex = num;

            const title = section.querySelector('.section-title');
            if (title) {
                title.textContent = num === 1 ? '캐릭터 설정 (기본)' : `캐릭터 설정 ${num}`;
            }
        });
    }

    /**
     * Update add button state/text
     */
    updateAddButtonState() {
        const addBtn = document.getElementById('addCharacterBtn');
        if (addBtn) {
            const remaining = this.maxCharacters - this.characterCount;
            const textSpan = addBtn.querySelector('span') || addBtn;
            if (remaining > 0) {
                textSpan.textContent = `캐릭터 추가 (${remaining}개 남음)`;
            } else {
                textSpan.textContent = '캐릭터 추가 불가 (최대)';
            }
        }
    }
}
