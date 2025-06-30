/**
 * Theme Switcher for setmy-info-less Enhanced
 * Provides JavaScript utilities for theme management and switching
 */

class ThemeSwitcher {
    constructor(options = {}) {
        this.options = {
            // Default theme ('light', 'dark', or 'system')
            defaultTheme: 'system',
            // Storage key for persisting theme preference
            storageKey: 'theme-preference',
            // CSS class to add during theme transitions
            transitionClass: 'theme-switching',
            // Transition duration in milliseconds
            transitionDuration: 200,
            // Callback functions
            onThemeChange: null,
            // Auto-initialize on construction
            autoInit: true,
            ...options
        };

        this.currentTheme = null;
        this.systemTheme = null;
        this.mediaQuery = null;

        if (this.options.autoInit) {
            this.init();
        }
    }

    /**
     * Initialize the theme switcher
     */
    init() {
        this.setupSystemThemeDetection();
        this.loadSavedTheme();
        this.applyTheme(this.getEffectiveTheme());
        this.setupEventListeners();
    }

    /**
     * Set up system theme detection using media queries
     */
    setupSystemThemeDetection() {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.updateSystemTheme();

        // Listen for system theme changes
        this.mediaQuery.addEventListener('change', () => {
            this.updateSystemTheme();
            if (this.currentTheme === 'system') {
                this.applyTheme('system');
            }
        });
    }

    /**
     * Update the detected system theme
     */
    updateSystemTheme() {
        this.systemTheme = this.mediaQuery.matches ? 'dark' : 'light';
    }

    /**
     * Load saved theme preference from localStorage
     */
    loadSavedTheme() {
        try {
            const saved = localStorage.getItem(this.options.storageKey);
            this.currentTheme = saved || this.options.defaultTheme;
        } catch (error) {
            console.warn('Failed to load theme preference:', error);
            this.currentTheme = this.options.defaultTheme;
        }
    }

    /**
     * Save theme preference to localStorage
     */
    saveTheme(theme) {
        try {
            localStorage.setItem(this.options.storageKey, theme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
    }

    /**
     * Get the effective theme (resolves 'system' to actual theme)
     */
    getEffectiveTheme() {
        if (this.currentTheme === 'system') {
            return this.systemTheme;
        }
        return this.currentTheme;
    }

    /**
     * Apply theme to the document
     */
    applyTheme(theme, withTransition = true) {
        const effectiveTheme = theme === 'system' ? this.systemTheme : theme;
        const documentElement = document.documentElement;

        // Add transition class to prevent flash during theme change
        if (withTransition) {
            documentElement.classList.add(this.options.transitionClass);
        }

        // Remove existing theme attributes and classes
        documentElement.removeAttribute('data-theme');
        documentElement.classList.remove('theme-light', 'theme-dark');

        // Apply new theme
        if (effectiveTheme && effectiveTheme !== 'system') {
            documentElement.setAttribute('data-theme', effectiveTheme);
            documentElement.classList.add(`theme-${effectiveTheme}`);
        }

        // Remove transition class after transition duration
        if (withTransition) {
            setTimeout(() => {
                documentElement.classList.remove(this.options.transitionClass);
            }, this.options.transitionDuration);
        }

        // Call callback if provided
        if (typeof this.options.onThemeChange === 'function') {
            this.options.onThemeChange(effectiveTheme, this.currentTheme);
        }

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: {
                theme: effectiveTheme,
                preference: this.currentTheme
            }
        }));
    }

    /**
     * Set theme preference
     */
    setTheme(theme) {
        if (!['light', 'dark', 'system'].includes(theme)) {
            console.warn(`Invalid theme: ${theme}. Must be 'light', 'dark', or 'system'.`);
            return;
        }

        this.currentTheme = theme;
        this.saveTheme(theme);
        this.applyTheme(theme);
    }

    /**
     * Toggle between light and dark themes
     */
    toggle() {
        const effectiveTheme = this.getEffectiveTheme();
        const newTheme = effectiveTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Get current theme preference
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Get effective (resolved) theme
     */
    getResolvedTheme() {
        return this.getEffectiveTheme();
    }

    /**
     * Check if system supports dark mode
     */
    supportsSystemTheme() {
        return this.mediaQuery && this.mediaQuery.media !== 'not all';
    }

    /**
     * Set up event listeners for manual theme switching
     */
    setupEventListeners() {
        // Listen for keyboard shortcuts (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
                event.preventDefault();
                this.toggle();
            }
        });

        // Listen for theme switch buttons
        document.addEventListener('click', (event) => {
            const themeButton = event.target.closest('[data-theme-toggle]');
            if (themeButton) {
                event.preventDefault();
                const targetTheme = themeButton.getAttribute('data-theme-toggle');
                if (targetTheme) {
                    this.setTheme(targetTheme);
                } else {
                    this.toggle();
                }
            }
        });
    }

    /**
     * Create a theme toggle button
     */
    createToggleButton(options = {}) {
        const {
            className = 'theme-toggle',
            lightIcon = '☀️',
            darkIcon = '🌙',
            systemIcon = '💻',
            showLabel = false,
            lightLabel = 'Light',
            darkLabel = 'Dark',
            systemLabel = 'System'
        } = options;

        const button = document.createElement('button');
        button.className = className;
        button.setAttribute('data-theme-toggle', '');
        button.setAttribute('aria-label', 'Toggle theme');

        const updateButton = () => {
            const effectiveTheme = this.getEffectiveTheme();
            const preference = this.getTheme();

            let icon, label;
            if (preference === 'system') {
                icon = systemIcon;
                label = systemLabel;
            } else if (effectiveTheme === 'dark') {
                icon = darkIcon;
                label = darkLabel;
            } else {
                icon = lightIcon;
                label = lightLabel;
            }

            button.innerHTML = showLabel ? `${icon} ${label}` : icon;
            button.setAttribute('aria-label', `Current theme: ${label}. Click to toggle.`);
        };

        // Update button initially and on theme changes
        updateButton();
        window.addEventListener('themechange', updateButton);

        return button;
    }

    /**
     * Create a theme selector dropdown
     */
    createThemeSelector(options = {}) {
        const {
            className = 'theme-selector',
            options: themeOptions = [
                {value: 'light', label: 'Light', icon: '☀️'},
                {value: 'dark', label: 'Dark', icon: '🌙'},
                {value: 'system', label: 'System', icon: '💻'}
            ]
        } = options;

        const select = document.createElement('select');
        select.className = className;
        select.setAttribute('aria-label', 'Select theme');

        themeOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = `${option.icon} ${option.label}`;
            select.appendChild(optionElement);
        });

        // Set initial value
        select.value = this.getTheme();

        // Handle changes
        select.addEventListener('change', () => {
            this.setTheme(select.value);
        });

        // Update on theme changes from other sources
        window.addEventListener('themechange', () => {
            select.value = this.getTheme();
        });

        return select;
    }

    /**
     * Destroy the theme switcher and clean up event listeners
     */
    destroy() {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.updateSystemTheme);
        }
        // Note: We don't remove document event listeners as they might be used by other instances
    }
}

// Auto-initialize if not in a module environment
if (typeof module === 'undefined' && typeof window !== 'undefined') {
    window.ThemeSwitcher = ThemeSwitcher;

    // Auto-initialize with default options
    window.themeSwitcher = new ThemeSwitcher();

    // Expose global functions for convenience
    window.setTheme = (theme) => window.themeSwitcher.setTheme(theme);
    window.toggleTheme = () => window.themeSwitcher.toggle();
    window.getTheme = () => window.themeSwitcher.getTheme();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
}

// Export for ES modules
if (typeof window !== 'undefined') {
    window.ThemeSwitcher = ThemeSwitcher;
}

