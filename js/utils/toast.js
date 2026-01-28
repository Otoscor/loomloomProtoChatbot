/**
 * Toast Notification Utility
 */

/**
 * Shows a toast notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of toast ('info', 'success', 'error')
 */
export function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Toast styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease'
    });

    // Type-specific styles
    const typeStyles = {
        info: { backgroundColor: '#333', color: '#fff' },
        success: { backgroundColor: '#4CAF50', color: '#fff' },
        error: { backgroundColor: '#FF4757', color: '#fff' }
    };

    Object.assign(toast.style, typeStyles[type] || typeStyles.info);

    // Add to DOM
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    // Remove after delay
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
