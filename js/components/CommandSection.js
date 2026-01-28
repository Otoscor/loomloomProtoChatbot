/**
 * Command Section Component
 * Handles adding, deleting, and renumbering command sections
 */



export class CommandSection {
    constructor() {
        this.commandCount = 1;
        this.maxCommands = 10;
    }

    /**
     * Setup add command button
     */
    setup() {
        const addBtn = document.getElementById('addCommandBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const container = document.getElementById('commandSectionsContainer');
                if (container) {
                    this.addSection(container);
                }
            });
        }

        // Setup initial delete button
        this.setupDeleteButtons();
    }

    /**
     * Add a new command section
     */
    addSection(container) {
        if (this.commandCount >= this.maxCommands) {

            return;
        }

        this.commandCount++;

        // Get existing section to clone
        const existingSection = container.querySelector('.command-section');
        if (!existingSection) return;

        // Clone section
        const newSection = existingSection.cloneNode(true);

        // Update index
        newSection.dataset.commandIndex = this.commandCount;

        // Show delete button
        const deleteBtn = newSection.querySelector('.delete-command-btn');
        if (deleteBtn) {
            deleteBtn.style.display = 'flex';
        }

        // Reset inputs
        newSection.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
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
     * Delete a command section
     */
    deleteSection(section) {
        const container = document.getElementById('commandSectionsContainer');
        const sections = container.querySelectorAll('.command-section');

        if (sections.length <= 1) {

            return;
        }

        section.classList.add('removing');

        setTimeout(() => {
            section.remove();
            this.commandCount--;
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
            const btn = e.target.closest('.delete-command-btn');
            if (btn) {
                const section = btn.closest('.command-section');
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
        const container = document.getElementById('commandSectionsContainer');
        const sections = container.querySelectorAll('.command-section');

        sections.forEach((section, index) => {
            const deleteBtn = section.querySelector('.delete-command-btn');
            if (deleteBtn) {
                deleteBtn.style.display = sections.length > 1 ? 'flex' : 'none';
            }
        });
    }

    /**
     * Renumber sections after deletion
     */
    renumberSections() {
        const container = document.getElementById('commandSectionsContainer');
        const sections = container.querySelectorAll('.command-section');

        sections.forEach((section, index) => {
            const num = index + 1;
            section.dataset.commandIndex = num;
        });
    }

    /**
     * Update add button state/text
     */
    updateAddButtonState() {
        const addBtn = document.getElementById('addCommandBtn');
        if (addBtn) {
            const remaining = this.maxCommands - this.commandCount;
            const textSpan = addBtn.querySelector('span') || addBtn;
            if (remaining > 0) {
                textSpan.textContent = `명령어 추가 (${remaining}개 남음)`;
            } else {
                textSpan.textContent = '명령어 추가 불가 (최대)';
            }
        }
    }
}
