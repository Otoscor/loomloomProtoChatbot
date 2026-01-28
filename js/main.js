/**
 * loomloom - Main Application Entry Point
 * Initializes all components
 */

import { CharacterSection } from './components/CharacterSection.js';
import { CommandSection } from './components/CommandSection.js';
import { EmotionSheet } from './components/EmotionSheet.js';
import { HashtagManager } from './components/HashtagManager.js';
import { ImageUploader } from './components/ImageUploader.js';
import { FormValidation } from './components/FormValidation.js';

/**
 * Main Application Class
 */
class ChatbotForm {
    constructor() {
        this.characterSection = new CharacterSection();
        this.commandSection = new CommandSection();
        this.emotionSheet = new EmotionSheet();
        this.hashtagManager = new HashtagManager();
        this.imageUploader = new ImageUploader();
        this.formValidation = new FormValidation();
    }

    /**
     * Initialize all components
     */
    init() {
        // Character sections
        this.characterSection.setup();

        // Command sections
        this.commandSection.setup();

        // Emotion selection
        this.emotionSheet.setup();

        // Hashtags
        this.hashtagManager.setup();

        // Image uploads
        this.imageUploader.setup();

        // Form validation & utilities
        this.formValidation.setup();

        console.log('loomloom ChatbotForm initialized');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new ChatbotForm();
    app.init();
});
