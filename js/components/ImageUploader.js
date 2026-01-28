/**
 * Image Uploader Component
 */

import { showToast } from '../utils/toast.js';

export class ImageUploader {
    constructor() {
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
    }

    /**
     * Setup image upload functionality
     */
    setup() {
        document.querySelectorAll('.image-upload, .situation-upload').forEach(area => {
            this.setupUploadArea(area);
        });
    }

    /**
     * Setup individual upload area
     */
    setupUploadArea(area) {
        area.addEventListener('click', (e) => {
            // Prevent if clicking on buttons inside
            if (e.target.closest('.image-delete-btn') || e.target.closest('.image-change-btn')) {
                return;
            }

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';

            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > this.maxFileSize) {
                    showToast('파일 크기는 5MB 이하여야 합니다.', 'error');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    if (area.classList.contains('situation-upload')) {
                        // For situation uploads, show with preview and buttons
                        area.innerHTML = `
              <img class="image-preview" src="${e.target.result}" alt="Preview">
              <button class="image-delete-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <button class="image-change-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9.5 1.5L10.5 2.5M2 10L2.5 7.5L9 1L11 3L4.5 9.5L2 10Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>변경</span>
              </button>
            `;
                        area.classList.add('has-image');

                        // Setup button handlers
                        this.setupPreviewButtons(area);
                    } else {
                        // For main image upload
                        area.style.backgroundImage = `url(${e.target.result})`;
                        area.style.backgroundSize = 'cover';
                        area.style.backgroundPosition = 'center';
                        area.innerHTML = '';
                        area.classList.add('has-image');
                    }

                    showToast('이미지가 등록되었습니다.', 'success');
                };
                reader.readAsDataURL(file);
            });

            input.click();
        });
    }

    /**
     * Setup preview button handlers
     */
    setupPreviewButtons(area) {
        const deleteBtn = area.querySelector('.image-delete-btn');
        const changeBtn = area.querySelector('.image-change-btn');

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                area.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M15.75 11.25V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.75 6L9 2.25L5.25 6" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 2.25V11.25" stroke="#909090" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>이미지 등록</span>
        `;
                area.classList.remove('has-image');
                showToast('이미지가 삭제되었습니다.', 'info');
            });
        }

        if (changeBtn) {
            changeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Trigger new file input
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';

                input.addEventListener('change', (evt) => {
                    const file = evt.target.files[0];
                    if (!file) return;

                    if (file.size > this.maxFileSize) {
                        showToast('파일 크기는 5MB 이하여야 합니다.', 'error');
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const preview = area.querySelector('.image-preview');
                        if (preview) {
                            preview.src = e.target.result;
                        }
                        showToast('이미지가 변경되었습니다.', 'success');
                    };
                    reader.readAsDataURL(file);
                });

                input.click();
            });
        }
    }
}
