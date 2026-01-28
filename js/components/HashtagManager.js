/**
 * Hashtag Manager Component
 */



export class HashtagManager {
    constructor() {
        this.hashtags = [];
        this.maxHashtags = 10;
        this.maxLength = 10;
    }

    /**
     * Setup hashtag functionality
     */
    setup() {
        const input = document.getElementById('hashtagInput');
        const addBtn = document.querySelector('.hashtag-add-btn');
        const listContainer = document.querySelector('.hashtag-list');

        if (!input || !addBtn) return;

        const updateDisplay = () => {
            if (!listContainer) return;

            listContainer.innerHTML = '';
            this.hashtags.forEach((tag, index) => {
                const tagEl = document.createElement('div');
                tagEl.className = 'hashtag-tag';
                tagEl.innerHTML = `
          #${tag}
          <button class="hashtag-remove" data-index="${index}">×</button>
        `;
                listContainer.appendChild(tagEl);
            });

            // Add remove event listeners
            listContainer.querySelectorAll('.hashtag-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.hashtags.splice(index, 1);
                    updateDisplay();

                });
            });
        };

        const addHashtag = () => {
            const value = input.value.trim().replace(/^#/, '');

            if (!value) return;

            if (this.hashtags.length >= this.maxHashtags) {

                return;
            }

            if (value.length > this.maxLength) {

                return;
            }

            if (this.hashtags.includes(value)) {

                return;
            }

            this.hashtags.push(value);
            input.value = '';
            updateDisplay();

        };

        addBtn.addEventListener('click', addHashtag);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addHashtag();
            }
        });
    }
}
