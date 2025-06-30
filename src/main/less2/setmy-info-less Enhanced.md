# setmy-info-less Enhanced

A modern, extensible CSS framework built on LESS that combines the simplicity of the original setmy-info-less with
cutting-edge CSS features, comprehensive theming, and powerful extensibility.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theme System](#theme-system)
- [Utility Classes](#utility-classes)
- [Responsive Design](#responsive-design)
- [Modern CSS Features](#modern-css-features)
- [Extensibility](#extensibility)
- [Browser Support](#browser-support)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

## Overview

setmy-info-less Enhanced represents a significant evolution of the original setmy-info-less project, transforming it
from a simple CSS reset into a comprehensive, modern CSS framework. This enhanced version maintains backward
compatibility while introducing powerful new features that address the needs of contemporary web development.

The framework is built with a mobile-first approach and emphasizes progressive enhancement, ensuring that your
applications work beautifully across all devices and browsers. Whether you're building a simple website or a complex web
application, setmy-info-less Enhanced provides the tools and flexibility you need to create exceptional user
experiences.

At its core, the framework embraces modern CSS capabilities while providing graceful fallbacks for older browsers. This
dual approach ensures that you can leverage cutting-edge features like CSS Grid, Flexbox gap property, clamp() function,
and :is() selector without sacrificing compatibility with legacy systems.

## Features

### 🎨 Advanced Theme System

- **Dark/Light Mode Support**: Seamless theme switching with system preference detection
- **CSS Custom Properties**: Modern theming approach with full customization
- **Multiple Built-in Themes**: Corporate, seasonal, and specialty themes ready to use
- **Theme Variants**: Compact, comfortable, rounded, and accessibility-focused options
- **Dynamic Theme Creation**: Easy-to-use mixins for creating custom themes

### 🛠️ Comprehensive Utility Classes

- **Spacing System**: Consistent spacing scale with responsive variants
- **Typography Utilities**: Fluid typography that scales with viewport
- **Layout Utilities**: Flexbox and Grid utilities for modern layouts
- **Color System**: Theme-aware color utilities with semantic naming
- **Display & Positioning**: Complete set of display and positioning utilities

### 📱 Enhanced Responsive Design

- **Fluid Typography**: CSS clamp() for smooth text scaling
- **Modern Breakpoints**: Seven-tier breakpoint system (XS to 3XL)
- **Container System**: Responsive containers with intelligent sizing
- **Responsive Utilities**: Breakpoint-specific utility classes
- **Mobile-First Approach**: Optimized for mobile devices with progressive enhancement

### 🚀 Modern CSS Features

- **CSS clamp()**: Fluid sizing for typography, spacing, and dimensions
- **:is() Selector**: Efficient selector grouping and reduced code duplication
- **Enhanced Grid**: Named grid lines, grid areas, and advanced layout patterns
- **Modern Flexbox**: Gap property, advanced flex properties, and intelligent ordering
- **Aspect Ratio**: Native aspect ratio control for consistent proportions
- **Scroll Snap**: Smooth scrolling with snap points for better UX
- **CSS Filters**: Visual effects with filters and backdrop filters
- **Logical Properties**: Internationalization-ready logical properties

### 🔧 Extensibility System

- **Plugin Architecture**: Modular system for extending functionality
- **Custom Variables**: Easy customization of design tokens
- **Component System**: Framework for creating reusable components
- **Mixin Library**: Powerful mixins for common patterns
- **Configuration Options**: Fine-grained control over framework features

### ♿ Accessibility First

- **Focus Management**: Enhanced focus indicators with :focus-visible
- **Motion Preferences**: Respects user's reduced motion preferences
- **High Contrast**: Support for high contrast mode
- **Screen Reader**: Semantic markup and ARIA support
- **Keyboard Navigation**: Full keyboard accessibility

### 🌐 Progressive Enhancement

- **Feature Detection**: @supports queries for graceful degradation
- **Fallback Systems**: Automatic fallbacks for unsupported features
- **Browser Compatibility**: Works across all modern and legacy browsers
- **Performance Optimized**: Minimal runtime overhead with compile-time optimizations

## Installation

setmy-info-less Enhanced can be integrated into your project through multiple methods, each suited to different
development workflows and project requirements.

### Method 1: Direct Download

The simplest way to get started is by downloading the framework files directly and including them in your project. This
method is ideal for static websites or projects where you don't need a build process.

```bash
# Download the latest release
curl -L https://github.com/setmy-info/setmy-info-less-enhanced/archive/main.zip -o setmy-info-less-enhanced.zip

# Extract the files
unzip setmy-info-less-enhanced.zip

# Copy the source files to your project
cp -r setmy-info-less-enhanced/src/main/less/ your-project/css/
```

### Method 2: NPM Installation

For projects using Node.js and npm, you can install the framework as a dependency. This method provides version
management and easy updates.

```bash
# Install as a dependency
npm install setmy-info-less-enhanced

# Or install as a dev dependency
npm install --save-dev setmy-info-less-enhanced
```

### Method 3: Git Submodule

If you're using Git for version control and want to track the framework's development, you can add it as a submodule.

```bash
# Add as a submodule
git submodule add https://github.com/setmy-info/setmy-info-less-enhanced.git vendor/setmy-info-less-enhanced

# Initialize and update the submodule
git submodule init
git submodule update
```

### Method 4: CDN Integration

For rapid prototyping or when you don't want to host the files yourself, you can use a CDN. Note that this method
requires an internet connection and may have performance implications.

```html
<!-- Include the compiled CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/setmy-info/setmy-info-less-enhanced@main/dist/setmy-info-less-enhanced.css">

<!-- Include the theme switcher JavaScript (optional) -->
<script src="https://cdn.jsdelivr.net/gh/setmy-info/setmy-info-less-enhanced@main/theme-switcher.js"></script>
```

### Build Process Setup

To use the LESS source files, you'll need to set up a build process. Here are examples for popular build tools:

#### Using LESS Compiler

```bash
# Install LESS compiler globally
npm install -g less

# Compile the main LESS file
lessc src/main/less/main-enhanced.less dist/setmy-info-less-enhanced.css

# Compile with minification
lessc --clean-css src/main/less/main-enhanced.less dist/setmy-info-less-enhanced.min.css
```

#### Using Webpack

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'setmy-info-less-enhanced': path.resolve(__dirname, 'node_modules/setmy-info-less-enhanced/src/main/less')
    }
  }
};
```

#### Using Gulp

```javascript
// gulpfile.js
const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('css', function() {
  return gulp.src('src/main/less/main-enhanced.less')
    .pipe(less())
    .pipe(gulp.dest('dist/'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/'));
});
```

## Quick Start

Getting started with setmy-info-less Enhanced is straightforward. This section will guide you through creating your
first page using the framework's core features.

### Basic HTML Structure

Start with a clean HTML5 document structure that includes the framework's CSS and optional JavaScript components:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My setmy-info-less Enhanced Project</title>
    
    <!-- Framework CSS -->
    <link rel="stylesheet" href="dist/setmy-info-less-enhanced.css">
    
    <!-- Optional: Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>
    <!-- Your content goes here -->
    
    <!-- Optional: Theme switcher JavaScript -->
    <script src="theme-switcher.js"></script>
    <script>
        // Initialize theme switcher
        const themeSwitcher = new ThemeSwitcher({
            defaultTheme: 'system'
        });
    </script>
</body>
</html>
```

### Creating Your First Layout

The framework provides powerful layout utilities that make creating responsive designs intuitive. Here's an example of a
typical webpage layout:

```html
<!-- Navigation -->
<nav class="nav">
    <div class="container">
        <div class="flex justify-between items-center">
            <h1 class="clamp-text-xl font-bold">My Website</h1>
            <div class="flex gap-4">
                <a href="#" class="nav-link">Home</a>
                <a href="#" class="nav-link">About</a>
                <a href="#" class="nav-link">Contact</a>
                <button class="btn btn-primary" data-theme-toggle="">🌓</button>
            </div>
        </div>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero clamp-py-xl">
    <div class="container">
        <div class="text-center">
            <h1 class="clamp-text-5xl font-bold mb-4">
                Welcome to the Future
            </h1>
            <p class="clamp-text-lg text-secondary mb-8 max-w-2xl mx-auto">
                Experience modern web development with setmy-info-less Enhanced. 
                Build beautiful, responsive, and accessible websites with ease.
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
                <button class="btn btn-primary btn-lg">Get Started</button>
                <button class="btn btn-outline btn-lg">Learn More</button>
            </div>
        </div>
    </div>
</section>

<!-- Features Grid -->
<section class="section">
    <div class="container">
        <h2 class="section-title">Key Features</h2>
        <div class="grid grid-responsive gap-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="clamp-text-xl font-semibold mb-3">🎨 Modern Theming</h3>
                    <p class="text-secondary">
                        Advanced theme system with dark/light mode support and 
                        custom theme creation capabilities.
                    </p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 class="clamp-text-xl font-semibold mb-3">📱 Responsive Design</h3>
                    <p class="text-secondary">
                        Fluid typography and responsive utilities that adapt 
                        beautifully to any screen size.
                    </p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 class="clamp-text-xl font-semibold mb-3">🚀 Modern CSS</h3>
                    <p class="text-secondary">
                        Leverage cutting-edge CSS features with automatic 
                        fallbacks for older browsers.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Understanding the Class System

The framework uses a systematic approach to class naming that makes it easy to understand and remember. Here are the key
patterns:

#### Utility Classes

- **Spacing**: `m-4`, `p-6`, `mx-auto`, `py-8`
- **Typography**: `text-lg`, `font-bold`, `text-center`, `text-secondary`
- **Layout**: `flex`, `grid`, `justify-center`, `items-center`
- **Responsive**: `sm:text-lg`, `md:grid-cols-2`, `lg:flex-row`

#### Component Classes

- **Cards**: `card`, `card-body`, `card-header`, `card-footer`
- **Buttons**: `btn`, `btn-primary`, `btn-lg`, `btn-outline`
- **Navigation**: `nav`, `nav-link`, `nav-brand`

#### Fluid Classes

- **Typography**: `clamp-text-lg`, `clamp-text-3xl`
- **Spacing**: `clamp-p-md`, `clamp-py-lg`
- **Sizing**: `clamp-w-md`, `clamp-h-lg`

### Customizing Your Design

The framework is designed to be highly customizable. You can override default values by creating custom CSS or by
modifying the LESS variables:

```css
/* Custom CSS approach */
:root {
    --color-primary: #6366f1;
    --color-secondary: #06b6d4;
    --font-family-sans: 'Inter', sans-serif;
    --border-radius-base: 0.5rem;
}
```

```less
// LESS variables approach
@brand-primary: #6366f1;
@brand-secondary: #06b6d4;
@font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
@border-radius-base: 0.5rem;
```

### Adding Interactivity

While the framework focuses on styling, it includes optional JavaScript components for common interactive elements:

```javascript
// Theme switching
const themeSwitcher = new ThemeSwitcher({
    defaultTheme: 'system',
    onThemeChange: (theme, preference) => {
        console.log(`Theme changed to: ${theme} (preference: ${preference})`);
    }
});

// Manual theme switching
document.getElementById('theme-toggle').addEventListener('click', () => {
    themeSwitcher.toggle();
});

// Set specific theme
themeSwitcher.setTheme('dark');
```

### Performance Considerations

To ensure optimal performance, consider these best practices when using the framework:

1. **Use Only What You Need**: The framework is modular. Import only the components you're using.
2. **Optimize for Production**: Always minify CSS in production environments.
3. **Leverage Caching**: Set appropriate cache headers for CSS files.
4. **Consider Critical CSS**: Extract above-the-fold CSS for faster initial rendering.

```html
<!-- Example of critical CSS inlining -->
<style>
    /* Critical CSS for above-the-fold content */
    .hero { /* styles */ }
    .nav { /* styles */ }
</style>

<!-- Load full CSS asynchronously -->
<link rel="preload" href="dist/setmy-info-less-enhanced.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

This quick start guide provides the foundation for building with setmy-info-less Enhanced. The following sections dive
deeper into specific features and advanced usage patterns.

## Theme System

The theme system in setmy-info-less Enhanced represents one of its most powerful features, providing a comprehensive
solution for creating consistent, customizable, and accessible user interfaces. Built on CSS custom properties (CSS
variables), the theme system offers unprecedented flexibility while maintaining excellent performance and browser
compatibility.

### Understanding the Theme Architecture

The theme system operates on multiple layers, each serving a specific purpose in the overall design system. At its
foundation, the system uses CSS custom properties to define design tokens that can be dynamically changed at runtime
without requiring CSS recompilation.

The base layer consists of semantic color tokens that define the fundamental color palette. These tokens are
intentionally abstract, using names like `--color-primary` and `--color-background-primary` rather than specific color
names. This abstraction allows the same component to work seamlessly across different themes without modification.

```css
:root {
    /* Semantic color tokens */
    --color-primary: #3b82f6;
    --color-secondary: #10b981;
    --color-accent: #f59e0b;
    
    /* Background tokens */
    --color-background-primary: #ffffff;
    --color-background-secondary: #f9fafb;
    --color-background-elevated: #ffffff;
    
    /* Text tokens */
    --color-text-primary: #1f2937;
    --color-text-secondary: #6b7280;
    --color-text-tertiary: #9ca3af;
    
    /* Border tokens */
    --color-border-primary: #e5e7eb;
    --color-border-secondary: #d1d5db;
    --color-border-focus: #3b82f6;
}
```

### Built-in Themes

The framework includes several carefully crafted themes that demonstrate the system's capabilities and provide
ready-to-use options for common design needs.

#### Light Theme (Default)

The light theme serves as the framework's default appearance, featuring a clean, modern aesthetic with high contrast
ratios for excellent readability. The color palette is built around neutral grays with blue accents, providing a
professional appearance suitable for business applications and content-focused websites.

#### Dark Theme

The dark theme offers a sophisticated alternative that reduces eye strain in low-light environments while maintaining
the same level of usability as the light theme. The color relationships are carefully preserved, ensuring that
interactive elements remain clearly distinguishable and accessible.

```html
<!-- Activate dark theme -->
<html data-theme="dark">
```

#### System Theme

The system theme automatically adapts to the user's operating system preference, providing a seamless experience that
respects user choice. This theme uses CSS media queries to detect the user's preference and applies the appropriate
theme automatically.

```css
@media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
        /* Dark theme variables */
    }
}
```

#### Specialty Themes

Beyond the standard light and dark themes, the framework includes several specialty themes designed for specific use
cases:

**Corporate Blue Theme**: A professional theme featuring deep blues and clean whites, perfect for business applications
and corporate websites. The color palette conveys trust and reliability while maintaining excellent readability.

**Sunset Theme**: A warm, inviting theme using oranges and reds, ideal for creative projects and lifestyle brands. The
color progression mimics natural sunset colors, creating an emotional connection with users.

**Forest Theme**: An earthy theme combining greens and blues, suitable for environmental organizations and outdoor
brands. The natural color palette creates a sense of calm and connection with nature.

**Purple Haze Theme**: A creative theme featuring purples and magentas, perfect for artistic projects and innovative
brands. The bold color choices make a strong visual statement while remaining professional.

**Monochrome Theme**: A minimalist theme using only grayscale colors, ideal for typography-focused designs and when
color distraction needs to be minimized.

### Theme Switching Implementation

The framework provides a robust theme switching system that handles the complexity of theme management while providing a
simple API for developers.

```javascript
// Initialize the theme switcher
const themeSwitcher = new ThemeSwitcher({
    defaultTheme: 'system',
    storageKey: 'preferred-theme',
    onThemeChange: (theme, preference) => {
        // Handle theme change events
        updateThemeIndicator(theme, preference);
        logThemeChange(theme);
    }
});

// Theme switching methods
themeSwitcher.setTheme('dark');        // Set specific theme
themeSwitcher.toggle();                // Toggle between light/dark
themeSwitcher.reset();                 // Reset to system preference

// Get current theme information
const currentTheme = themeSwitcher.getResolvedTheme(); // 'light' or 'dark'
const preference = themeSwitcher.getTheme();           // 'light', 'dark', or 'system'
```

The theme switcher automatically handles several important aspects of theme management:

**Persistence**: User theme preferences are automatically saved to localStorage and restored on subsequent visits.

**System Integration**: The switcher respects the user's operating system theme preference when set to 'system' mode.

**Smooth Transitions**: Theme changes are animated smoothly to provide visual continuity.

**Event Handling**: The system provides hooks for responding to theme changes, allowing you to update other parts of
your application accordingly.

### Creating Custom Themes

The framework makes it easy to create custom themes that integrate seamlessly with the existing system. Custom themes
can be created using LESS mixins or by directly defining CSS custom properties.

#### Using LESS Mixins

The framework provides a powerful mixin for creating themes programmatically:

```less
// Create a custom theme using the mixin
.create-theme(
    ocean;              // Theme name
    #0ea5e9;           // Primary color
    #06b6d4;           // Secondary color  
    #f0f9ff;           // Background color
    #0c4a6e;           // Text color
    #bae6fd            // Border color
);
```

This mixin automatically generates all the necessary color variations, including hover states, light variants, and
semantic color mappings.

#### Manual Theme Creation

For more control, you can create themes manually by defining the complete set of CSS custom properties:

```css
[data-theme="cyberpunk"] {
    /* Base colors */
    --color-primary: #00ff9f;
    --color-secondary: #ff0080;
    --color-accent: #ffff00;
    
    /* Background colors */
    --color-background-primary: #0a0a0a;
    --color-background-secondary: #1a1a1a;
    --color-background-tertiary: #2a2a2a;
    --color-background-elevated: #1a1a1a;
    
    /* Text colors */
    --color-text-primary: #00ff9f;
    --color-text-secondary: #ffffff;
    --color-text-tertiary: #cccccc;
    
    /* Interactive states */
    --color-primary-hover: #00cc7f;
    --color-primary-light: rgba(0, 255, 159, 0.1);
    --color-primary-dark: #00b36b;
    
    /* Special effects */
    --shadow-sm: 0 0 5px rgb(0 255 159 / 0.3);
    --shadow-md: 0 0 10px rgb(0 255 159 / 0.4);
    --neon-glow: 0 0 5px currentColor, 0 0 10px currentColor;
}
```

### Theme Variants and Modifiers

The theme system supports variants and modifiers that can be combined with base themes to create specialized appearances
without creating entirely new themes.

#### Density Modifiers

Density modifiers adjust the spacing and sizing throughout the interface:

```html
<!-- Compact variant - reduced spacing -->
<html data-theme="light" data-theme-modifier="compact">

<!-- Comfortable variant - increased spacing -->
<html data-theme="light" data-theme-modifier="comfortable">
```

#### Shape Modifiers

Shape modifiers control the border radius and overall geometric appearance:

```html
<!-- Rounded variant - more rounded corners -->
<html data-theme="light" data-theme-modifier="rounded">

<!-- Sharp variant - no rounded corners -->
<html data-theme="light" data-theme-modifier="sharp">
```

### Accessibility and Themes

The theme system is designed with accessibility as a primary concern. All themes maintain WCAG AA contrast ratios, and
the system provides special accessibility-focused themes for users with specific needs.

#### High Contrast Theme

The high contrast theme uses pure black and white colors with minimal gray tones to provide maximum contrast for users
with visual impairments:

```css
[data-theme="high-contrast"] {
    --color-primary: #0000ff;
    --color-secondary: #008000;
    --color-background-primary: #ffffff;
    --color-text-primary: #000000;
    --color-border-primary: #000000;
}
```

#### Reduced Motion Support

The theme system respects the user's motion preferences, automatically disabling animations and transitions when the
user has requested reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Theme Performance Optimization

The theme system is optimized for performance through several strategies:

**CSS Custom Property Inheritance**: The system leverages CSS custom property inheritance to minimize the number of
property definitions needed.

**Selective Updates**: Only the properties that actually change between themes are redefined, reducing the CSS payload.

**Hardware Acceleration**: Theme transitions use transform properties that can be hardware accelerated for smooth
animations.

**Lazy Loading**: Specialty themes can be loaded on demand to reduce initial bundle size.

### Advanced Theme Techniques

For advanced use cases, the framework provides several sophisticated theming techniques:

#### Dynamic Theme Generation

Themes can be generated dynamically based on user input or external data:

```javascript
function createDynamicTheme(primaryColor, secondaryColor) {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primaryColor);
    root.style.setProperty('--color-secondary', secondaryColor);
    
    // Generate derived colors
    const primaryHover = adjustColor(primaryColor, -10);
    root.style.setProperty('--color-primary-hover', primaryHover);
}
```

#### Theme Inheritance

Themes can inherit from other themes, allowing for easy customization:

```less
// Base theme
.base-theme() {
    --color-primary: #3b82f6;
    --color-secondary: #10b981;
    // ... other properties
}

// Inherited theme with modifications
[data-theme="custom"] {
    .base-theme();
    --color-primary: #6366f1; // Override only what's needed
}
```

#### Contextual Theming

Different parts of your application can use different themes simultaneously:

```html
<div data-theme="light">
    <header>Light themed header</header>
    <main data-theme="dark">
        <p>Dark themed content area</p>
    </main>
</div>
```

This comprehensive theme system provides the foundation for creating beautiful, consistent, and accessible user
interfaces that can adapt to any brand or user preference while maintaining excellent performance and usability.

## Utility Classes

The utility class system in setmy-info-less Enhanced provides a comprehensive collection of single-purpose classes that
enable rapid prototyping and consistent styling across your projects. This approach, often called "utility-first" or "
atomic CSS," allows developers to build complex interfaces by composing small, focused utility classes rather than
writing custom CSS for every component.

### Philosophy and Benefits

The utility-first approach offers several significant advantages over traditional CSS methodologies. By providing
granular control over individual CSS properties, utility classes eliminate the need for context switching between HTML
and CSS files. Developers can see exactly what styles are being applied by reading the HTML markup, making the codebase
more maintainable and easier to understand.

This methodology also reduces CSS bloat by encouraging reuse of existing classes rather than creating new ones. Since
utility classes are designed to be immutable and single-purpose, they create a consistent design language that prevents
style drift over time. The framework's utility classes are carefully designed to work together harmoniously, ensuring
that combinations always produce predictable results.

### Spacing System

The spacing system forms the foundation of consistent layouts throughout your application. Built on a carefully crafted
scale that balances mathematical precision with visual harmony, the spacing utilities provide both flexibility and
consistency.

#### Base Spacing Scale

The framework uses a base spacing unit of 0.25rem (4px at default font size) and builds a scale using both linear and
exponential progressions:

```css
/* Linear progression for small values */
.m-1  { margin: 0.25rem; }    /* 4px */
.m-2  { margin: 0.5rem; }     /* 8px */
.m-3  { margin: 0.75rem; }    /* 12px */
.m-4  { margin: 1rem; }       /* 16px */

/* Exponential progression for larger values */
.m-8  { margin: 2rem; }       /* 32px */
.m-12 { margin: 3rem; }       /* 48px */
.m-16 { margin: 4rem; }       /* 64px */
.m-24 { margin: 6rem; }       /* 96px */
```

#### Directional Spacing

The framework provides granular control over spacing direction, allowing you to apply spacing to specific sides or axes:

```css
/* All sides */
.m-4  { margin: 1rem; }
.p-4  { padding: 1rem; }

/* Horizontal and vertical */
.mx-4 { margin-left: 1rem; margin-right: 1rem; }
.my-4 { margin-top: 1rem; margin-bottom: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }

/* Individual sides */
.mt-4 { margin-top: 1rem; }
.mr-4 { margin-right: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-4 { margin-left: 1rem; }
.pt-4 { padding-top: 1rem; }
.pr-4 { padding-right: 1rem; }
.pb-4 { padding-bottom: 1rem; }
.pl-4 { padding-left: 1rem; }
```

#### Responsive Spacing

All spacing utilities include responsive variants that allow different spacing at different breakpoints:

```html
<!-- Responsive margin example -->
<div class="m-2 sm:m-4 md:m-6 lg:m-8">
    Margin increases with screen size
</div>

<!-- Responsive padding example -->
<div class="p-4 md:p-8 lg:p-12">
    Padding scales with viewport
</div>
```

#### Negative Spacing

Negative margins are available for advanced layout techniques:

```css
.-m-4  { margin: -1rem; }
.-mt-4 { margin-top: -1rem; }
.-mx-4 { margin-left: -1rem; margin-right: -1rem; }
```

### Typography Utilities

The typography system provides comprehensive control over text appearance, from basic sizing to advanced typographic
features. The system is built around fluid typography principles, ensuring text remains readable and proportional across
all device sizes.

#### Font Sizing

The framework offers both fixed and fluid font sizing options:

```css
/* Fixed sizes */
.text-xs   { font-size: 0.75rem; }
.text-sm   { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg   { font-size: 1.125rem; }
.text-xl   { font-size: 1.25rem; }
.text-2xl  { font-size: 1.5rem; }
.text-3xl  { font-size: 1.875rem; }
.text-4xl  { font-size: 2.25rem; }
.text-5xl  { font-size: 3rem; }

/* Fluid sizes using clamp() */
.clamp-text-lg  { font-size: clamp(1rem, 3vw, 1.125rem); }
.clamp-text-xl  { font-size: clamp(1.125rem, 3.5vw, 1.25rem); }
.clamp-text-2xl { font-size: clamp(1.25rem, 4vw, 1.5rem); }
.clamp-text-3xl { font-size: clamp(1.5rem, 4.5vw, 1.875rem); }
.clamp-text-4xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
.clamp-text-5xl { font-size: clamp(2.25rem, 6vw, 3rem); }
```

#### Font Weight and Style

Complete control over font weight and style:

```css
.font-thin       { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light      { font-weight: 300; }
.font-normal     { font-weight: 400; }
.font-medium     { font-weight: 500; }
.font-semibold   { font-weight: 600; }
.font-bold       { font-weight: 700; }
.font-extrabold  { font-weight: 800; }
.font-black      { font-weight: 900; }

.italic          { font-style: italic; }
.not-italic      { font-style: normal; }
```

#### Text Alignment and Decoration

Text alignment and decoration utilities for all common needs:

```css
.text-left     { text-align: left; }
.text-center   { text-align: center; }
.text-right    { text-align: right; }
.text-justify  { text-align: justify; }

.underline     { text-decoration: underline; }
.line-through  { text-decoration: line-through; }
.no-underline  { text-decoration: none; }

.uppercase     { text-transform: uppercase; }
.lowercase     { text-transform: lowercase; }
.capitalize    { text-transform: capitalize; }
.normal-case   { text-transform: none; }
```

#### Line Height and Letter Spacing

Fine-grained control over text spacing:

```css
.leading-none    { line-height: 1; }
.leading-tight   { line-height: 1.25; }
.leading-snug    { line-height: 1.375; }
.leading-normal  { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose   { line-height: 2; }

.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight   { letter-spacing: -0.025em; }
.tracking-normal  { letter-spacing: 0em; }
.tracking-wide    { letter-spacing: 0.025em; }
.tracking-wider   { letter-spacing: 0.05em; }
.tracking-widest  { letter-spacing: 0.1em; }
```

### Layout Utilities

The layout utilities provide powerful tools for creating complex layouts using modern CSS features like Flexbox and
Grid. These utilities are designed to work together seamlessly, allowing you to build sophisticated interfaces without
writing custom CSS.

#### Flexbox Utilities

Comprehensive Flexbox utilities for one-dimensional layouts:

```css
/* Display */
.flex        { display: flex; }
.inline-flex { display: inline-flex; }

/* Direction */
.flex-row         { flex-direction: row; }
.flex-row-reverse { flex-direction: row-reverse; }
.flex-col         { flex-direction: column; }
.flex-col-reverse { flex-direction: column-reverse; }

/* Wrap */
.flex-wrap         { flex-wrap: wrap; }
.flex-wrap-reverse { flex-wrap: wrap-reverse; }
.flex-nowrap       { flex-wrap: nowrap; }

/* Justify Content */
.justify-start    { justify-content: flex-start; }
.justify-end      { justify-content: flex-end; }
.justify-center   { justify-content: center; }
.justify-between  { justify-content: space-between; }
.justify-around   { justify-content: space-around; }
.justify-evenly   { justify-content: space-evenly; }

/* Align Items */
.items-start    { align-items: flex-start; }
.items-end      { align-items: flex-end; }
.items-center   { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch  { align-items: stretch; }

/* Gap (modern browsers) */
.gap-1  { gap: 0.25rem; }
.gap-2  { gap: 0.5rem; }
.gap-4  { gap: 1rem; }
.gap-6  { gap: 1.5rem; }
.gap-8  { gap: 2rem; }
```

#### CSS Grid Utilities

Modern CSS Grid utilities for two-dimensional layouts:

```css
/* Display */
.grid        { display: grid; }
.inline-grid { display: inline-grid; }

/* Template Columns */
.grid-cols-1  { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2  { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3  { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4  { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-6  { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Auto-fit and Auto-fill */
.grid-cols-auto-fit { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-cols-auto-fill { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }

/* Column Span */
.col-span-1  { grid-column: span 1 / span 1; }
.col-span-2  { grid-column: span 2 / span 2; }
.col-span-3  { grid-column: span 3 / span 3; }
.col-span-4  { grid-column: span 4 / span 4; }
.col-span-6  { grid-column: span 6 / span 6; }
.col-span-12 { grid-column: span 12 / span 12; }
.col-span-full { grid-column: 1 / -1; }

/* Gap */
.gap-1  { gap: 0.25rem; }
.gap-2  { gap: 0.5rem; }
.gap-4  { gap: 1rem; }
.gap-6  { gap: 1.5rem; }
.gap-8  { gap: 2rem; }
```

### Color Utilities

The color system provides theme-aware utilities that automatically adapt to the current theme. This ensures consistency
across theme changes while providing comprehensive color options.

#### Text Colors

Theme-aware text color utilities:

```css
.text-primary     { color: var(--color-text-primary); }
.text-secondary   { color: var(--color-text-secondary); }
.text-tertiary    { color: var(--color-text-tertiary); }

/* Semantic colors */
.text-success     { color: var(--color-success); }
.text-warning     { color: var(--color-warning); }
.text-danger      { color: var(--color-danger); }
.text-info        { color: var(--color-info); }

/* Brand colors */
.text-brand       { color: var(--color-primary); }
.text-accent      { color: var(--color-accent); }
```

#### Background Colors

Background color utilities that work with the theme system:

```css
.bg-primary       { background-color: var(--color-background-primary); }
.bg-secondary     { background-color: var(--color-background-secondary); }
.bg-elevated      { background-color: var(--color-background-elevated); }

/* Semantic backgrounds */
.bg-success       { background-color: var(--color-success); }
.bg-warning       { background-color: var(--color-warning); }
.bg-danger        { background-color: var(--color-danger); }
.bg-info          { background-color: var(--color-info); }

/* Transparent backgrounds */
.bg-transparent   { background-color: transparent; }
.bg-current       { background-color: currentColor; }
```

#### Border Colors

Border color utilities for consistent theming:

```css
.border-primary   { border-color: var(--color-border-primary); }
.border-secondary { border-color: var(--color-border-secondary); }
.border-focus     { border-color: var(--color-border-focus); }

/* Semantic border colors */
.border-success   { border-color: var(--color-success); }
.border-warning   { border-color: var(--color-warning); }
.border-danger    { border-color: var(--color-danger); }
.border-info      { border-color: var(--color-info); }
```

### Display and Positioning

Complete control over element display and positioning:

```css
/* Display */
.block       { display: block; }
.inline      { display: inline; }
.inline-block { display: inline-block; }
.flex        { display: flex; }
.inline-flex { display: inline-flex; }
.grid        { display: grid; }
.inline-grid { display: inline-grid; }
.hidden      { display: none; }

/* Position */
.static   { position: static; }
.fixed    { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.sticky   { position: sticky; }

/* Top, Right, Bottom, Left */
.top-0    { top: 0; }
.right-0  { right: 0; }
.bottom-0 { bottom: 0; }
.left-0   { left: 0; }

.top-auto    { top: auto; }
.right-auto  { right: auto; }
.bottom-auto { bottom: auto; }
.left-auto   { left: auto; }
```

### Responsive Utilities

Every utility class includes responsive variants that allow different styles at different breakpoints. The framework
uses a mobile-first approach, meaning styles apply to all screen sizes unless overridden by a larger breakpoint.

```html
<!-- Responsive text sizing -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
    Responsive heading
</h1>

<!-- Responsive layout -->
<div class="flex flex-col md:flex-row gap-4 md:gap-8">
    <div class="w-full md:w-1/2">Content</div>
    <div class="w-full md:w-1/2">Content</div>
</div>

<!-- Responsive spacing -->
<section class="p-4 md:p-8 lg:p-12">
    Responsive padding
</section>
```

### Utility Composition Patterns

The power of utility classes becomes apparent when they're composed together to create complex designs. Here are some
common patterns:

#### Card Pattern

```html
<div class="bg-elevated border border-primary rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
    <h3 class="text-xl font-semibold text-primary mb-3">Card Title</h3>
    <p class="text-secondary leading-relaxed">Card content goes here.</p>
</div>
```

#### Button Pattern

```html
<button class="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover focus:ring-2 focus:ring-primary-light transition-colors">
    Click me
</button>
```

#### Responsive Grid Pattern

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-elevated p-6 rounded-lg">Item 1</div>
    <div class="bg-elevated p-6 rounded-lg">Item 2</div>
    <div class="bg-elevated p-6 rounded-lg">Item 3</div>
</div>
```

This comprehensive utility system provides the building blocks for creating any design while maintaining consistency and
reducing the need for custom CSS. The responsive variants ensure your designs work beautifully across all device sizes,
while the theme integration keeps everything consistent across different visual themes.

## Responsive Design

The responsive design system in setmy-info-less Enhanced represents a modern approach to creating layouts that work
seamlessly across all device sizes. Built on a foundation of fluid typography, intelligent breakpoints, and progressive
enhancement, the system ensures your designs look and function beautifully from the smallest mobile devices to the
largest desktop displays.

### Breakpoint System

The framework employs a seven-tier breakpoint system that covers the full spectrum of modern devices. Unlike traditional
frameworks that focus primarily on common device sizes, this system includes breakpoints for emerging form factors and
ultra-wide displays.

```css
/* Breakpoint definitions */
@breakpoint-xs: 475px;    /* Extra small devices (large phones) */
@breakpoint-sm: 640px;    /* Small devices (landscape phones, small tablets) */
@breakpoint-md: 768px;    /* Medium devices (tablets) */
@breakpoint-lg: 1024px;   /* Large devices (laptops, small desktops) */
@breakpoint-xl: 1280px;   /* Extra large devices (desktops) */
@breakpoint-2xl: 1536px;  /* 2X large devices (large desktops) */
@breakpoint-3xl: 1920px;  /* 3X large devices (ultra-wide displays) */
```

Each breakpoint is carefully chosen based on real-world device usage patterns and represents a meaningful change in how
content should be presented. The mobile-first approach means styles are applied to all screen sizes by default, with
larger breakpoints adding enhancements rather than overriding base styles.

### Fluid Typography

One of the most powerful features of the responsive system is fluid typography, which uses the CSS clamp() function to
create text that scales smoothly between minimum and maximum sizes based on the viewport width. This eliminates the
jarring size jumps that occur with traditional breakpoint-based typography.

```css
/* Fluid typography examples */
.clamp-text-sm  { font-size: clamp(0.875rem, 2.5vw, 1rem); }
.clamp-text-base { font-size: clamp(1rem, 3vw, 1.125rem); }
.clamp-text-lg  { font-size: clamp(1.125rem, 3.5vw, 1.25rem); }
.clamp-text-xl  { font-size: clamp(1.25rem, 4vw, 1.5rem); }
.clamp-text-2xl { font-size: clamp(1.5rem, 4.5vw, 1.875rem); }
.clamp-text-3xl { font-size: clamp(1.875rem, 5vw, 2.25rem); }
.clamp-text-4xl { font-size: clamp(2.25rem, 5.5vw, 3rem); }
.clamp-text-5xl { font-size: clamp(3rem, 6vw, 4rem); }
```

The fluid typography system ensures optimal readability across all device sizes while maintaining visual hierarchy. The
minimum and maximum values are carefully calculated to prevent text from becoming too small on mobile devices or too
large on desktop displays.

### Container System

The container system provides intelligent content width management that adapts to different screen sizes while
maintaining optimal reading lengths and visual balance.

```css
.container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}

/* Responsive max-widths */
@media (min-width: 640px) {
    .container { max-width: 640px; }
}

@media (min-width: 768px) {
    .container { max-width: 768px; }
}

@media (min-width: 1024px) {
    .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
    .container { max-width: 1280px; }
}

@media (min-width: 1536px) {
    .container { max-width: 1536px; }
}
```

The container system also includes variants for different content types:

```html
<!-- Full-width container -->
<div class="container-fluid">
    Content spans full width
</div>

<!-- Narrow container for reading -->
<div class="container-narrow">
    Optimal for text content (max-width: 65ch)
</div>

<!-- Wide container for dashboards -->
<div class="container-wide">
    Wider container for data-heavy interfaces
</div>
```

### Responsive Utilities

Every utility class in the framework includes responsive variants that allow different styles at different breakpoints.
This provides granular control over how your design adapts to different screen sizes.

```html
<!-- Responsive spacing -->
<div class="p-4 md:p-8 lg:p-12 xl:p-16">
    Padding increases with screen size
</div>

<!-- Responsive layout -->
<div class="flex flex-col md:flex-row lg:flex-row xl:flex-row">
    <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        Responsive width
    </div>
</div>

<!-- Responsive typography -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
    Responsive heading
</h1>

<!-- Responsive visibility -->
<div class="block md:hidden">
    Visible only on mobile
</div>
<div class="hidden md:block">
    Hidden on mobile, visible on desktop
</div>
```

### Advanced Layout Patterns

The framework provides several advanced layout patterns that demonstrate the power of combining responsive utilities:

#### Responsive Grid System

```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
    <div class="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2">
        Featured item
    </div>
    <div>Regular item</div>
    <div>Regular item</div>
    <div>Regular item</div>
</div>
```

#### Responsive Navigation

```html
<nav class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 lg:p-8">
    <div class="mb-4 md:mb-0">
        <h1 class="text-xl md:text-2xl font-bold">Brand</h1>
    </div>
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-6">
        <a href="#" class="text-base md:text-lg hover:text-primary">Home</a>
        <a href="#" class="text-base md:text-lg hover:text-primary">About</a>
        <a href="#" class="text-base md:text-lg hover:text-primary">Contact</a>
    </div>
</nav>
```

#### Responsive Card Layout

```html
<div class="bg-elevated rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="aspect-video md:aspect-square lg:aspect-video bg-secondary rounded-t-lg"></div>
    <div class="p-4 md:p-6 lg:p-8">
        <h3 class="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 lg:mb-4">
            Card Title
        </h3>
        <p class="text-secondary text-sm md:text-base lg:text-lg leading-relaxed">
            Card description that adapts to different screen sizes.
        </p>
    </div>
</div>
```

## Modern CSS Features

setmy-info-less Enhanced leverages cutting-edge CSS features while maintaining compatibility with older browsers through
progressive enhancement and intelligent fallbacks. This approach allows you to use the latest CSS capabilities without
sacrificing accessibility or user experience.

### CSS clamp() Function

The clamp() function represents one of the most powerful additions to modern CSS, enabling truly fluid design that
responds to viewport changes without media queries. The framework makes extensive use of clamp() for typography,
spacing, and sizing.

```css
/* Fluid typography with clamp() */
.clamp-text-responsive {
    font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem);
    /* Minimum: 1rem (16px)
       Preferred: 2.5vw + 0.5rem (scales with viewport)
       Maximum: 2rem (32px) */
}

/* Fluid spacing with clamp() */
.clamp-p-responsive {
    padding: clamp(1rem, 5vw, 3rem);
    /* Padding scales smoothly between 1rem and 3rem */
}

/* Fluid width with clamp() */
.clamp-w-responsive {
    width: clamp(300px, 50vw, 800px);
    /* Width scales between 300px and 800px based on viewport */
}
```

The framework provides pre-built clamp() utilities for common use cases:

```html
<!-- Fluid text sizing -->
<h1 class="clamp-text-4xl">Scales smoothly with viewport</h1>
<p class="clamp-text-lg">Body text that remains readable at all sizes</p>

<!-- Fluid spacing -->
<div class="clamp-p-lg clamp-my-xl">
    Responsive padding and margin
</div>

<!-- Fluid dimensions -->
<div class="clamp-w-md clamp-h-sm">
    Responsive width and height
</div>
```

### :is() Selector

The :is() selector dramatically reduces CSS duplication by allowing efficient grouping of selectors. This modern
selector is particularly useful for styling multiple elements with the same properties.

```css
/* Traditional approach (repetitive) */
h1 { color: var(--color-text-primary); font-weight: 600; }
h2 { color: var(--color-text-primary); font-weight: 600; }
h3 { color: var(--color-text-primary); font-weight: 600; }
h4 { color: var(--color-text-primary); font-weight: 600; }

/* Modern approach with :is() */
:is(h1, h2, h3, h4, h5, h6) {
    color: var(--color-text-primary);
    font-weight: 600;
    line-height: 1.2;
}

/* Complex selector grouping */
:is(.card, .modal, .dropdown) :is(h1, h2, h3) {
    margin-bottom: 1rem;
    color: var(--color-text-primary);
}

/* Form element styling */
:is(input, select, textarea):focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
    outline: none;
}
```

### Enhanced CSS Grid

The framework leverages advanced CSS Grid features including named grid lines, grid areas, and modern layout patterns
that were not possible with traditional layout methods.

```css
/* Named grid lines */
.grid-named-lines {
    display: grid;
    grid-template-columns: 
        [sidebar-start] 250px 
        [sidebar-end main-start] 1fr 
        [main-end aside-start] 200px 
        [aside-end];
    grid-template-rows: 
        [header-start] auto 
        [header-end content-start] 1fr 
        [content-end footer-start] auto 
        [footer-end];
}

/* Grid areas for semantic layouts */
.grid-semantic {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive grid with auto-fit */
.grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}
```

### Modern Flexbox Features

The framework takes advantage of modern Flexbox features, particularly the gap property, which simplifies spacing in
flex layouts.

```css
/* Modern Flexbox with gap */
.flex-modern {
    display: flex;
    gap: 1rem; /* Replaces margin-based spacing */
    align-items: center;
    justify-content: space-between;
}

/* Responsive flex direction with gap */
.flex-responsive {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .flex-responsive {
        flex-direction: row;
        gap: 2rem;
    }
}

/* Advanced flex properties */
.flex-advanced {
    display: flex;
    gap: 1rem;
}

.flex-item-grow-2 {
    flex: 2 1 0%; /* grow: 2, shrink: 1, basis: 0% */
}

.flex-item-no-shrink {
    flex: 0 0 auto; /* Don't grow or shrink */
}
```

### CSS Aspect Ratio

Native aspect ratio control ensures consistent proportions across different screen sizes without JavaScript
calculations.

```css
/* Common aspect ratios */
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-photo { aspect-ratio: 4 / 3; }
.aspect-golden { aspect-ratio: 1.618 / 1; }

/* Custom aspect ratios */
.aspect-ultrawide { aspect-ratio: 21 / 9; }
.aspect-portrait { aspect-ratio: 3 / 4; }
```

```html
<!-- Responsive aspect ratios -->
<div class="aspect-square md:aspect-video lg:aspect-photo">
    <img src="image.jpg" alt="Responsive image" class="w-full h-full object-cover">
</div>
```

### CSS Scroll Snap

Smooth scrolling with snap points creates better user experiences, especially on touch devices.

```css
/* Horizontal scroll snap */
.scroll-snap-x {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
}

.scroll-snap-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
}

/* Vertical scroll snap */
.scroll-snap-y {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

.scroll-snap-y > section {
    height: 100vh;
    scroll-snap-align: start;
}
```

### CSS Filters and Effects

Modern visual effects using CSS filters and backdrop filters.

```css
/* Image filters */
.filter-blur-sm { filter: blur(4px); }
.filter-brightness-75 { filter: brightness(0.75); }
.filter-contrast-125 { filter: contrast(1.25); }
.filter-grayscale { filter: grayscale(100%); }
.filter-sepia { filter: sepia(100%); }
.filter-hue-rotate-90 { filter: hue-rotate(90deg); }

/* Backdrop filters for glass effects */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.8);
}

.backdrop-blur-md {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.6);
}
```

### Progressive Enhancement

The framework uses feature detection to provide fallbacks for older browsers while enabling modern features where
supported.

```css
/* Grid with Flexbox fallback */
.progressive-layout {
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
}

.progressive-layout > * {
    flex: 1 1 250px;
    margin: 0.5rem;
}

@supports (display: grid) {
    .progressive-layout {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin: 0;
    }
    
    .progressive-layout > * {
        margin: 0;
    }
}

/* Gap property with margin fallback */
.progressive-flex {
    display: flex;
    margin: -0.5rem;
}

.progressive-flex > * {
    margin: 0.5rem;
}

@supports (gap: 1rem) {
    .progressive-flex {
        gap: 1rem;
        margin: 0;
    }
    
    .progressive-flex > * {
        margin: 0;
    }
}
```

This comprehensive approach to modern CSS ensures that your designs can leverage the latest capabilities while remaining
accessible to users on older browsers. The progressive enhancement strategy means that all users receive a functional
experience, with modern browser users getting enhanced visual and interactive features.

## Extensibility

The extensibility system in setmy-info-less Enhanced is designed to accommodate the diverse needs of modern web
development projects. Whether you're building a simple website or a complex application, the framework provides multiple
pathways for customization and extension without compromising the core system's integrity or performance.

### Configuration System

The framework's configuration system allows you to enable or disable entire modules, providing fine-grained control over
the final CSS output. This modular approach ensures you only include the features you need, keeping your CSS bundle size
optimized.

```less
// Framework configuration in config.less
@enable-themes: true;        // Enable/disable theme system
@enable-utilities: true;     // Enable/disable utility classes
@enable-responsive: true;    // Enable/disable responsive features
@enable-modern-css: true;    // Enable/disable modern CSS features
@enable-components: true;    // Enable/disable component library
@enable-animations: true;    // Enable/disable animation utilities
```

### Custom Variables

The framework exposes hundreds of customizable variables that control every aspect of the design system. These variables
are organized into logical groups and include comprehensive documentation.

```less
// Custom color palette
@brand-primary: #6366f1;
@brand-secondary: #06b6d4;
@brand-accent: #f59e0b;

// Typography customization
@font-family-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
@font-scale-ratio: 1.333; // Perfect fourth scale
@line-height-base: 1.6;

// Spacing customization
@spacing-scale-ratio: 1.5;
@spacing-base: 1rem;

// Component customization
@border-radius-base: 0.5rem;
@transition-duration-base: 0.2s;
@shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### Theme Creation

Creating custom themes is straightforward using the provided mixins and utilities. The framework supports both simple
color-based themes and complex themes with custom properties and effects.

```less
// Simple theme creation
.create-theme(
    ocean;              // Theme name
    #0ea5e9;           // Primary color
    #06b6d4;           // Secondary color
    #f0f9ff;           // Background color
    #0c4a6e;           // Text color
    #bae6fd            // Border color
);

// Advanced theme with custom properties
[data-theme="cyberpunk"] {
    --color-primary: #00ff9f;
    --color-secondary: #ff0080;
    --color-background-primary: #0a0a0a;
    --color-text-primary: #00ff9f;
    
    // Custom effects
    --neon-glow: 0 0 5px currentColor, 0 0 10px currentColor;
    --shadow-neon: 0 0 20px rgb(0 255 159 / 0.5);
}
```

### Component System

The framework provides a powerful component creation system that integrates seamlessly with the theme system and utility
classes.

```less
// Component creation with variants
.create-component(
    alert;
    {
        // Base styles
        border: 1px solid var(--color-border-primary);
        border-radius: var(--border-radius-md);
        padding: var(--spacing-4);
        position: relative;
    };
    {
        // Variants
        success, {
            background: color-mix(in srgb, var(--color-success) 10%, transparent);
            border-color: var(--color-success);
            color: var(--color-success);
        };
        
        warning, {
            background: color-mix(in srgb, var(--color-warning) 10%, transparent);
            border-color: var(--color-warning);
            color: var(--color-warning);
        };
    }
);
```

### Plugin Architecture

The framework supports a plugin architecture that allows third-party extensions and custom functionality.

```less
// Plugin registration
.register-plugin(forms; "plugins/enhanced-forms.less");
.register-plugin(charts; "plugins/chart-components.less");
.register-plugin(animations; "plugins/micro-interactions.less");

// Plugin structure example
// plugins/enhanced-forms.less
.form-enhanced {
    .form-group {
        margin-bottom: var(--spacing-4);
        
        label {
            display: block;
            font-weight: var(--font-weight-medium);
            margin-bottom: var(--spacing-2);
            color: var(--color-text-primary);
        }
        
        input, select, textarea {
            width: 100%;
            padding: var(--spacing-3);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--border-radius-md);
            transition: all var(--transition-duration-base);
            
            &:focus {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px var(--color-primary-light);
                outline: none;
            }
        }
    }
}
```

### Utility Generation

The framework provides mixins for generating custom utility classes that follow the same patterns as the built-in
utilities.

```less
// Generate custom spacing utilities
.create-utility(margin-top; (
    (0.125rem, xs),
    (0.25rem, sm),
    (0.5rem, md),
    (1rem, lg),
    (2rem, xl)
); mt-);

// Generate responsive utilities
.create-responsive-utility(font-size; (
    (0.875rem, sm),
    (1rem, base),
    (1.125rem, lg),
    (1.25rem, xl)
); text-);

// Generate color utilities
.create-color-utilities((
    (primary, var(--color-primary)),
    (secondary, var(--color-secondary)),
    (accent, var(--color-accent))
));
```

### Build Integration

The framework integrates with popular build tools and provides configuration options for different development
workflows.

```javascript
// Webpack configuration
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    'brand-primary': '#6366f1',
                                    'enable-animations': false
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
};

// Gulp configuration
gulp.task('css', function() {
    return gulp.src('src/styles/main.less')
        .pipe(less({
            modifyVars: {
                'brand-primary': '#6366f1',
                'font-family-sans': '"Inter", sans-serif'
            }
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});
```

## Browser Support

setmy-info-less Enhanced is designed to work across a wide range of browsers while taking advantage of modern CSS
features where available. The framework uses progressive enhancement to ensure all users receive a functional
experience, with modern browser users getting enhanced features.

### Modern Browser Support

Full feature support is provided for:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

These browsers support all modern CSS features used in the framework, including CSS Grid, Flexbox gap property,
clamp(), :is() selector, aspect-ratio, and CSS custom properties.

### Legacy Browser Support

Graceful degradation is provided for:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Internet Explorer 11 (limited support)

Legacy browsers receive fallback styles that maintain functionality while missing some visual enhancements. The
framework uses feature detection to provide appropriate alternatives.

### Feature Detection and Fallbacks

The framework uses @supports queries to detect feature availability and provide fallbacks:

```css
/* Grid with Flexbox fallback */
.layout-grid {
    display: flex;
    flex-wrap: wrap;
}

@supports (display: grid) {
    .layout-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

/* Gap property with margin fallback */
.flex-container {
    display: flex;
    margin: -0.5rem;
}

.flex-container > * {
    margin: 0.5rem;
}

@supports (gap: 1rem) {
    .flex-container {
        gap: 1rem;
        margin: 0;
    }
    
    .flex-container > * {
        margin: 0;
    }
}

/* CSS custom properties with fallbacks */
.component {
    color: #3b82f6; /* Fallback */
    color: var(--color-primary, #3b82f6);
}
```

### Testing Strategy

The framework includes comprehensive testing across different browsers and devices:

- **Automated Testing**: CSS validation and compatibility checking
- **Visual Regression Testing**: Ensuring consistent appearance across browsers
- **Accessibility Testing**: WCAG compliance verification
- **Performance Testing**: Load time and rendering performance analysis

## Migration Guide

Migrating from the original setmy-info-less to the enhanced version is designed to be straightforward, with most
existing code continuing to work without modification.

### Breaking Changes

The enhanced version introduces minimal breaking changes:

1. **File Structure**: The main entry point has changed from `main.less` to `main-enhanced.less`
2. **Variable Names**: Some internal variable names have been updated for consistency
3. **Class Prefixes**: New utility classes use consistent prefixes

### Migration Steps

1. **Update Import Path**

```less
// Old
@import "setmy-info-less/src/main/less/main.less";

// New
@import "setmy-info-less-enhanced/src/main/less/main-enhanced.less";
```

2. **Update Variable References**

```less
// Old variable names (still supported)
@primary-color: #3b82f6;

// New variable names (recommended)
@brand-primary: #3b82f6;
```

3. **Adopt New Features Gradually**

```html
<!-- Start using new utility classes -->
<div class="clamp-p-lg bg-elevated rounded-lg">
    Enhanced styling
</div>

<!-- Enable theme system -->
<html data-theme="light">
```

### Compatibility Mode

The framework includes a compatibility mode that maintains support for original class names and patterns:

```less
// Enable compatibility mode
@enable-compatibility: true;

// This ensures old class names continue to work
@import "compatibility/legacy-support.less";
```

## Contributing

We welcome contributions to setmy-info-less Enhanced! Whether you're fixing bugs, adding features, or improving
documentation, your help makes the framework better for everyone.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/setmy-info/setmy-info-less-enhanced.git
cd setmy-info-less-enhanced

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation for any changes
- Ensure browser compatibility
- Test accessibility compliance

### Reporting Issues

When reporting issues, please include:

- Browser and version
- Operating system
- Steps to reproduce
- Expected vs. actual behavior
- Code examples when relevant

## License

setmy-info-less Enhanced is released under the MIT License. This means you can use it freely in both personal and
commercial projects.

```
MIT License

Copyright (c) 2024 setmy-info-less Enhanced

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Conclusion

setmy-info-less Enhanced represents the evolution of CSS frameworks for the modern web. By combining the simplicity and
elegance of the original setmy-info-less with cutting-edge CSS features, comprehensive theming, and powerful
extensibility, it provides developers with the tools they need to create exceptional user experiences.

The framework's commitment to progressive enhancement ensures that your applications work beautifully across all
browsers and devices, while the extensive customization options allow you to create unique designs that reflect your
brand and vision.

Whether you're building a simple website or a complex web application, setmy-info-less Enhanced provides the foundation
for creating fast, accessible, and beautiful user interfaces that stand the test of time.

For more information, examples, and community support, visit
our [GitHub repository](https://github.com/setmy-info/setmy-info-less-enhanced) and join our growing community of
developers who are building the future of the web.

