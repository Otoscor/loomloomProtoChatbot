/**
 * Hashtag Manager Component
 */

import { showToast } from '../utils/toast.js';

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
                    showToast('해시태그가 삭제되었습니다.', 'info');
                });
            });
        };

        const addHashtag = () => {
            const value = input.value.trim().replace(/^#/, '');

            if (!value) return;

            if (this.hashtags.length >= this.maxHashtags) {
                showToast(`해시태그는 최대 ${this.maxHashtags}개까지 추가할 수 있습니다.`, 'error');
                return;
            }

            if (value.length > this.maxLength) {
                showToast(`해시태그는 ${this.maxLength}자 이내로 입력해 주세요.`, 'error');
                return;
            }

            if (this.hashtags.includes(value)) {
                showToast('이미 추가된 해시태그입니다.', 'error');
                return;
            }

            this.hashtags.push(value);
            input.value = '';
            updateDisplay();
            showToast(`#${value} 해시태그가 추가되었습니다.`, 'success');
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
