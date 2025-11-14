# [Component/Block Name] - Developer Guide

> **INSTRUCTION:** Replace [Component/Block Name] with your actual component name, e.g., "Carousel", "Hero Banner", "Accordion", etc.

---

## Overview

> **INSTRUCTION:** Provide a 2-3 sentence technical description of the component, its purpose, and key technical features.

*[Example: The [Component Name] block is a [describe technical nature] component for AEM Edge Delivery Services that [primary function]. It includes [key features] and full Universal Editor integration.]*

---

## Table of Contents

1. [Technical Architecture](#technical-architecture)
2. [File Structure](#file-structure)
3. [Configuration](#configuration)
4. [Core Functions](#core-functions)
5. [Universal Editor Integration](#universal-editor-integration)
6. [Performance Optimization](#performance-optimization)
7. [Browser Support](#browser-support)
8. [Accessibility Implementation](#accessibility-implementation)
9. [API Reference](#api-reference)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Technical Architecture

> **INSTRUCTION:** Document the technical architecture and technology stack used.

### Technology Stack

> **INSTRUCTION:** List all technologies, APIs, and techniques used in this component.

- **[Technology 1]**: [Purpose/Usage]
- **[Technology 2]**: [Purpose/Usage]
- **[Technology 3]**: [Purpose/Usage]
- **[Technology 4]**: [Purpose/Usage]

*[Example: CSS Transforms for hardware-accelerated animations]*
*[Example: Intersection Observer API for visibility-based optimization]*
*[Example: Touch Events API for gesture support]*

### Dependencies

> **INSTRUCTION:** List all required imports and dependencies.

```javascript
// Required imports
import { [function1] } from '../../scripts/[file1].js';
import { [function2] } from '../../scripts/[file2].js';
import { [function3] } from '../../scripts/[file3].js';
```

### State Management

> **INSTRUCTION:** Document how the component manages state. If no state management, remove this section.

The component maintains state through:

```javascript
let [stateVariable1] = [initialValue];  // [Description]
let [stateVariable2] = [initialValue];  // [Description]
let [stateVariable3] = [initialValue];  // [Description]
```

---

## File Structure

> **INSTRUCTION:** Document the file structure for this component.

```
blocks/[component-name]/
├── _[component-name].json     # Block definition and content model
├── [component-name].js        # Core JavaScript functionality
├── [component-name].css       # Styling and visual presentation
└── README.md                  # This documentation
```

### Block Definition (_[component-name].json)

> **INSTRUCTION:** Provide the JSON structure for the block definition.

```json
{
  "definitions": [
    {
      "title": "[Component Name]",
      "id": "[component-id]",
      "plugins": {
        "xwalk": {
          "page": {
            "resourceType": "core/franklin/components/block/v1/block",
            "template": {
              "name": "[Component Name]",
              "model": "[component-model]"
            }
          }
        }
      }
    }
  ],
  "models": [
    {
      "id": "[component-model]",
      "fields": [
        {
          "component": "[field-type]",
          "name": "[field-name]",
          "label": "[Field Label]"
        }
      ]
    }
  ]
}
```

---

## Configuration

> **INSTRUCTION:** Document all configuration options for the component.

### Configuration Object

> **INSTRUCTION:** If your component uses a configuration object, document it here. Otherwise, remove this section.

All timing and threshold values are centralized in `[COMPONENT_CONFIG]`:

```javascript
const [COMPONENT_CONFIG] = {
  // [Configuration Category 1]
  [CONFIG_KEY_1]: [value],  // [Description and unit]
  [CONFIG_KEY_2]: [value],  // [Description and unit]
  
  // [Configuration Category 2]
  [CONFIG_KEY_3]: [value],  // [Description and unit]
  
  // [Nested Configuration]
  [CONFIG_OBJECT]: {
    [NESTED_KEY_1]: [value],  // [Description]
    [NESTED_KEY_2]: [value],  // [Description]
  },
};
```

*[Example: SLIDE_TRANSITION_DURATION: 500, // Slide transition animation (ms)]*

### Customizing Configuration

> **INSTRUCTION:** Explain how developers can modify configuration values.

To modify default values, update `[COMPONENT_CONFIG]` before initialization:

```javascript
// Example: [Describe what this example does]
[COMPONENT_CONFIG].[KEY_1] = [new_value];
[COMPONENT_CONFIG].[KEY_2] = [new_value];
```

### CSS Custom Properties

> **INSTRUCTION:** Document CSS variables used by the component.

```css
:root {
  --[property-name-1]: [value];  /* [Description] */
  --[property-name-2]: [value];  /* [Description] */
  --[property-name-3]: [value];  /* [Description] */
  --[property-name-4]: [value];  /* [Description] */
}
```

Override in your project's CSS:

```css
.[component-class] {
  --[property-name-1]: [new-value];
  --[property-name-2]: [new-value];
}
```

---

## Core Functions

> **INSTRUCTION:** Document all major functions in the component.

### Main Export Function

```javascript
/**
 * Decorates the [component name] block
 * @param {Element} block - The [component name] block element
 */
export default async function decorate(block) {
  // [Describe what this function does]
  
  // [Step 1 description]
  const [variable1] = [operation];
  
  // [Step 2 description]
  const [variable2] = [operation];
  
  // [Step 3 description]
  [functionCall](block, [parameters]);
}
```

### [Primary Function Name]

> **INSTRUCTION:** Document the main initialization or primary function.

Main initialization function that sets up all functionality:

```javascript
/**
 * [Function description]
 * @param {Element} [param1] - [Description]
 * @param {[Type]} [param2] - [Description]
 * @param {[Type]} [param3] - [Description]
 */
function [functionName]([param1], [param2], [param3]) {
  // Cache DOM queries
  const [element1] = block.querySelector('[selector1]');
  const [element2] = block.querySelector('[selector2]');

  // State management
  let [stateVar1] = [initialValue];
  let [stateVar2] = [initialValue];

  // Core functions defined here...
  
  // Event listeners
  [setupFunction1]();
  [setupFunction2]();
  [setupFunction3]();
}
```

### [Secondary Function Name]

> **INSTRUCTION:** Document other important functions. Add more subsections as needed.

```javascript
/**
 * [Function description]
 * @param {[Type]} [param1] - [Description]
 * @param {[Type]} [param2] - [Description]
 */
function [functionName]([param1], [param2]) {
  // [Implementation description]
  
  // [Step 1]
  [code];
  
  // [Step 2]
  [code];
  
  // [Step 3 - if applicable]
  [code];
}
```

### [Additional Function Names]

> **INSTRUCTION:** Continue documenting all core functions following the pattern above.

```javascript
/**
 * [Function description]
 */
function [functionName]() {
  // [Implementation]
}
```

---

## Universal Editor Integration

> **INSTRUCTION:** Document how the component integrates with Universal Editor.

### Editor Mode Detection

> **INSTRUCTION:** Document editor mode detection if applicable.

The component uses utility functions to detect Universal Editor:

```javascript
import { isEditorMode, observeEditorMode } from '../../scripts/utils.js';

/**
 * Check if currently in Universal Editor
 * @returns {boolean} True if in editor mode
 */
function checkEditorMode() {
  try {
    // [Describe detection method]
    if ([condition1]) {
      return true;
    }
    
    // [Describe fallback detection]
    if ([condition2]) {
      return true;
    }
  } catch (e) {
    // [Describe error handling]
    console.debug('[Error message]:', e);
  }
  
  return false;
}
```

### [Component-Specific Editor Behavior]

> **INSTRUCTION:** Document any component-specific behavior in the editor (e.g., disabled features, modified functionality).

```javascript
/**
 * [Describe setup function for editor]
 */
function [setupFunction]() {
  // [Describe what happens in editor mode]
  if (checkEditorMode()) {
    [editorSpecificCode];
    return;
  }

  // [Describe normal mode behavior]
  [normalModeCode];
}
```

### Testing Editor Integration

> **INSTRUCTION:** Provide testing methods for editor integration.

```javascript
// Manual testing in console
window.[testFunctionName] = () => {
  console.log('[Test output 1]:', [value1]);
  console.log('[Test output 2]:', [value2]);
};
```

---

## Performance Optimization

> **INSTRUCTION:** Document all performance optimization techniques used.

### Hardware Acceleration

> **INSTRUCTION:** If using CSS transforms or animations, document GPU acceleration techniques.

```css
.[component-class] {
  /* Enable GPU acceleration */
  transform: [initial-transform];
  will-change: [properties];
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Debounced Event Handlers

> **INSTRUCTION:** Document any debounced handlers for performance.

```javascript
/**
 * Debounced [event] handler for performance
 */
function [setupHandlerFunction]() {
  let [timeoutVariable];
  
  const [handlerFunction] = () => {
    clearTimeout([timeoutVariable]);
    
    [timeoutVariable] = setTimeout(() => {
      // [Describe what happens after debounce]
      [code];
    }, [DEBOUNCE_DELAY]);
  };
  
  window.addEventListener('[event]', [handlerFunction], { passive: true });
  
  // Cleanup on component unmount
  block.addEventListener('disconnect', () => {
    window.removeEventListener('[event]', [handlerFunction]);
  });
}
```

### Passive Event Listeners

> **INSTRUCTION:** Document use of passive event listeners if applicable.

```javascript
/**
 * Setup [event type] listeners with passive flag
 */
function [setupListenersFunction]() {
  element.addEventListener('[event1]', (e) => {
    [handler code];
  }, { passive: true });

  element.addEventListener('[event2]', (e) => {
    [handler code];
  }, { passive: true });
}
```

### Intersection Observer

> **INSTRUCTION:** If using Intersection Observer, document its usage.

```javascript
/**
 * [Describe what Intersection Observer is used for]
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // [Describe visible behavior]
      [code];
    } else {
      // [Describe hidden behavior]
      [code];
    }
  });
}, {
  threshold: [value],  // [Description]
  rootMargin: '[value]'
});

observer.observe(block);
```

### Image Optimization

> **INSTRUCTION:** Document image optimization if component uses images.

```javascript
// Leverage AEM's decorateImages utility
await decorateImages(block);

// Images are automatically:
// - Lazy loaded
// - Responsive (srcset generated)
// - Optimized for device pixel ratio
// - WebP format when supported
```

### Cached DOM Queries

> **INSTRUCTION:** Document DOM query caching strategy.

```javascript
// Cache frequently accessed elements
const cachedElements = {
  [element1]: block.querySelector('[selector1]'),
  [element2]: block.querySelector('[selector2]'),
  [element3]: block.querySelector('[selector3]'),
};

// Reuse cached elements instead of querying repeatedly
function [updateFunction]() {
  cachedElements.[element1].forEach(([item], index) => {
    [operation];
  });
}
```

---

## Browser Support

> **INSTRUCTION:** Document browser compatibility and support matrix.

### Supported Browsers

| Browser | Version | Desktop | Mobile | Notes |
|---------|---------|---------|--------|-------|
| Chrome | Latest 2 | ✅ | ✅ | [Notes if any] |
| Firefox | Latest 2 | ✅ | ✅ | [Notes if any] |
| Safari | Latest 2 | ✅ | ✅ | [Notes if any] |
| Edge | Latest 2 | ✅ | ✅ | [Notes if any] |
| Mobile Safari | iOS [version]+ | N/A | ✅ | [Notes if any] |
| Chrome Mobile | Android [version]+ | N/A | ✅ | [Notes if any] |

### Feature Detection

> **INSTRUCTION:** Document feature detection for any progressive enhancement.

```javascript
// Check for [Feature] support
if ('[Feature]' in window) {
  // Use [Feature]
  [modernCode];
} else {
  // Fallback: [Describe fallback]
  [fallbackCode];
}

// Check for [Another Feature] support
let [featureSupported] = false;
try {
  const options = {
    get [property]() {
      [featureSupported] = true;
      return false;
    }
  };
  window.addEventListener('test', null, options);
  window.removeEventListener('test', null, options);
} catch (err) {
  [featureSupported] = false;
}
```

### Polyfills

> **INSTRUCTION:** Document any polyfills required or explicitly state none are needed.

**[Required/None required]**

*[If required, list them]:*
- [Polyfill 1]: [Reason and browser versions]
- [Polyfill 2]: [Reason and browser versions]

*[If none required]:*
No polyfills required. The component uses only well-supported modern APIs:
- [API 1] ([Minimum browser version])
- [API 2] ([Minimum browser version])

---

## Accessibility Implementation

> **INSTRUCTION:** Document all accessibility features and WCAG compliance.

### ARIA Attributes

> **INSTRUCTION:** Document all ARIA attributes used.

```javascript
/**
 * Setup ARIA attributes for [component name]
 */
function setupAccessibility() {
  // [Element 1] attributes
  [element1].setAttribute('role', '[role]');
  [element1].setAttribute('aria-label', '[label]');
  [element1].setAttribute('aria-describedby', '[id]');

  // [Element 2] attributes
  [element2].forEach(([item], index) => {
    [item].setAttribute('role', '[role]');
    [item].setAttribute('aria-label', `[label] ${index + 1}`);
  });

  // [Additional ARIA setup]
  [code];
}
```

### Keyboard Navigation

> **INSTRUCTION:** Document keyboard interaction patterns.

```javascript
/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
  block.addEventListener('keydown', (e) => {
    switch (e.key) {
      case '[Key1]':
        e.preventDefault();
        [action1]();
        [instrumentationCode];
        break;
        
      case '[Key2]':
        e.preventDefault();
        [action2]();
        [instrumentationCode];
        break;
        
      case '[Key3]':
        e.preventDefault();
        [action3]();
        break;
    }
  });

  // Ensure [component] is focusable
  if (!block.hasAttribute('tabindex')) {
    block.setAttribute('tabindex', '[value]');
  }
}
```

### Focus Management

> **INSTRUCTION:** Document focus management and visible indicators.

```css
/* Visible focus indicators */
.[element1]:focus,
.[element2]:focus,
.[element3]:focus {
  outline: [width] solid var(--focus-color, [default-color]);
  outline-offset: [offset];
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .[element]:focus {
    outline-width: [width];
    outline-offset: [offset];
  }
}
```

### Reduced Motion Support

> **INSTRUCTION:** Document how component respects motion preferences.

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .[animated-element] {
    transition: none !important;
  }
  
  .[component-class] * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Screen Reader Announcements

> **INSTRUCTION:** Document screen reader support if applicable.

```javascript
/**
 * Announce [changes/updates] to screen readers
 */
function announce[Update]() {
  // Create live region if not exists
  let liveRegion = block.querySelector('.sr-only-live');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only-live';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    block.appendChild(liveRegion);
  }
  
  // Update announcement
  liveRegion.textContent = `[Announcement text]`;
}
```

```css
/* Screen reader only class */
.sr-only-live {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## API Reference

> **INSTRUCTION:** Document the component's API, options, and public methods.

### Block Options

> **INSTRUCTION:** Document options derived from CSS classes or data attributes.

Options are derived from [CSS classes/data attributes] on the block element:

| [Class/Attribute] | Effect |
|-------------------|--------|
| `[option-1]` | [Description of effect] |
| `[option-2]` | [Description of effect] |
| `[option-3]` | [Description of effect] |

### Configuration Constants

> **INSTRUCTION:** List all configuration constants available.

```javascript
[COMPONENT_CONFIG] = {
  [CONSTANT_1]: [value],  // [unit] - [description]
  [CONSTANT_2]: [value],  // [unit] - [description]
  [CONSTANT_3]: [value],  // [unit] - [description]
  [NESTED_CONFIG]: {
    [KEY_1]: [value],     // [unit] - [description]
    [KEY_2]: [value],     // [unit] - [description]
  }
}
```

### Public Methods

> **INSTRUCTION:** Document any public methods or APIs exposed by the component.

While the component doesn't expose a formal API, you can access internals via DOM:

```javascript
// Get [component] instance
const [component] = document.querySelector('.[component-class]');

// [Action 1 description]
[component].querySelector('[selector1]').click();

// [Action 2 description]
const [value] = [component].querySelector('[selector2]');

// [Action 3 description]
[component].querySelector('[selector3]').[method]();
```

### Custom Events

> **INSTRUCTION:** Document any custom events dispatched by the component.

```javascript
// Dispatch custom event on [trigger]
block.dispatchEvent(new CustomEvent('[component]:[action]', {
  detail: {
    [property1]: [value1],
    [property2]: [value2],
    [property3]: [value3],
  }
}));

// Listen for custom events
[component].addEventListener('[component]:[action]', (e) => {
  console.log('[Action occurred]:', e.detail.[property]);
});
```

---

## Testing

> **INSTRUCTION:** Provide testing guidelines and examples for the component.

### Unit Testing

> **INSTRUCTION:** Provide unit test examples.

```javascript
// Example: Test [functionality]
describe('[Component Name] [Feature]', () => {
  let [component];
  
  beforeEach(() => {
    [component] = [createFunction]([parameters]);
  });
  
  test('should [expected behavior]', () => {
    // [Setup]
    const [element] = [component].querySelector('[selector]');
    
    // [Action]
    [element].[action]();
    
    // [Assertion]
    expect([actual]).toBe([expected]);
  });
  
  test('should [another expected behavior]', () => {
    // [Test implementation]
  });
});
```

### Integration Testing

> **INSTRUCTION:** Provide integration test examples.

```javascript
// Example: Test [interaction/workflow]
describe('[Component Name] [Integration Feature]', () => {
  test('should [expected workflow]', async () => {
    const [component] = [createFunction]([parameters]);
    
    // [Initial state check]
    expect([initialState]).toBe([expectedValue]);
    
    // [Perform action]
    await [action]();
    
    // [Verify result]
    expect([resultState]).toBe([expectedValue]);
  });
});
```

### Accessibility Testing

> **INSTRUCTION:** Provide accessibility test examples.

```javascript
// Example: Test keyboard navigation
describe('[Component Name] Accessibility', () => {
  test('should navigate with [keys]', () => {
    const [component] = [createFunction]([parameters]);
    [component].focus();
    
    // [Keyboard action]
    [component].dispatchEvent(new KeyboardEvent('keydown', { key: '[Key]' }));
    
    // [Verify result]
    expect([currentState]).toBe([expectedState]);
  });
  
  test('should have proper ARIA attributes', () => {
    const [component] = [createFunction]([parameters]);
    
    expect([component].getAttribute('role')).toBe('[role]');
    expect([component].getAttribute('aria-label')).toBeTruthy();
  });
});
```

### Performance Testing

> **INSTRUCTION:** Provide performance test examples.

```javascript
// Example: Test performance metrics
describe('[Component Name] Performance', () => {
  test('should [perform action] in under [time]ms', () => {
    const [component] = [createFunction]([parameters]);
    
    const start = performance.now();
    [performAction]();
    const end = performance.now();
    
    expect(end - start).toBeLessThan([threshold]);
  });
});
```

### Cross-Browser Testing

> **INSTRUCTION:** Provide guidance on cross-browser testing.

Use BrowserStack or similar for testing:

```javascript
// Playwright example
const { test, expect, devices } = require('@playwright/test');

test.describe('[Component Name] Cross-Browser', () => {
  test('should work on [device]', async ({ page }) => {
    await page.emulate(devices['[Device Name]']);
    await page.goto('/[test-page]');
    
    // [Test specific interaction]
    await [action];
    
    // [Verify result]
    const [element] = await page.locator('[selector]');
    expect([element]).toBeVisible();
  });
});
```

---

## Deployment

> **INSTRUCTION:** Document the deployment process and requirements.

### Build Process

```bash
# Standard EDS build (no special steps required)
npm run build

# Lint before deploy
npm run lint

# Run tests
npm test
```

### Pre-Deployment Checklist

> **INSTRUCTION:** Customize this checklist for your component.

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed (axe-core)
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed and approved

### Deployment Steps

1. **Merge to main branch**
   ```bash
   git checkout main
   git merge feature/[component-name]
   git push origin main
   ```

2. **Automatic preview build**
   - AEM Code Sync automatically builds preview
   - Preview URL: `https://main--{repo}--{org}.aem.page`

3. **Test on preview**
   - Verify all functionality works
   - Test with Universal Editor
   - Check mobile responsiveness

4. **Publish to production**
   - Use Universal Editor or Sidekick
   - Production URL: `https://main--{repo}--{org}.aem.live`

### Monitoring

> **INSTRUCTION:** Document monitoring and instrumentation.

```javascript
// RUM instrumentation
sampleRUM('[component]:[action]', { [property]: [value] });

// Monitor in RUM dashboard
// https://rum.hlx.page/
```

### Rollback Procedure

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

---

## Troubleshooting

> **INSTRUCTION:** Document common issues and their solutions.

### Common Issues

#### [Issue 1 - e.g., Component Not Rendering]

**Symptoms:** [Describe the symptoms]

**Diagnosis:**
```javascript
// Check [diagnostic 1]
console.log([check1]);

// Check [diagnostic 2]
console.log([check2]);
```

**Solutions:**
1. [Solution step 1]
2. [Solution step 2]
3. [Solution step 3]
4. [Solution step 4]

#### [Issue 2 - e.g., Feature Not Working]

**Symptoms:** [Describe the symptoms]

**Diagnosis:**
```javascript
// Test [diagnostic]
console.log('[Label]:', [value]);
```

**Solutions:**
1. [Solution step 1]
2. [Solution step 2]
3. [Solution step 3]

#### [Issue 3 - e.g., Performance Issues]

**Symptoms:** [Describe symptoms]

**Diagnosis:**
```javascript
// Monitor performance
const observer = new PerformanceObserver((list) => {
  console.log(list.getEntries());
});
observer.observe({ entryTypes: ['measure', 'paint'] });
```

**Solutions:**
1. [Optimization 1]
2. [Optimization 2]
3. [Optimization 3]

#### [Issue 4 - e.g., Editor Mode Not Detected]

**Symptoms:** [Describe symptoms]

**Diagnosis:**
```javascript
// Test editor detection
console.log('[Check 1]:', [condition1]);
console.log('[Check 2]:', [condition2]);
```

**Solutions:**
1. [Solution step 1]
2. [Solution step 2]
3. [Solution step 3]

### Debug Mode

> **INSTRUCTION:** Provide debug mode or logging instructions.

```javascript
// Enable debug logging
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log('[[Component Name]]', ...args);
  }
}

// Use throughout code
log('[Action]:', [value]);
```

### Performance Profiling

> **INSTRUCTION:** Provide performance profiling examples.

```javascript
// Measure [operation] performance
function [operation]([parameters]) {
  performance.mark('[operation]-start');
  
  // ... operation logic ...
  
  performance.mark('[operation]-end');
  performance.measure(
    '[operation]',
    '[operation]-start',
    '[operation]-end'
  );
  
  const measure = performance.getEntriesByName('[operation]')[0];
  if (measure.duration > [threshold]) {
    console.warn('Slow [operation]:', measure.duration, 'ms');
  }
}
```

---

## Advanced Customization

> **INSTRUCTION:** Document extension points and customization options.

### [Customization Type 1]

> **INSTRUCTION:** Provide examples of common customizations.

```javascript
/**
 * [Describe customization]
 */
function [customFunction]([parameters]) {
  // [Implementation]
}
```

### [Customization Type 2]

```javascript
/**
 * [Describe customization]
 */
```

### Analytics Integration

> **INSTRUCTION:** Provide analytics integration examples.

```javascript
/**
 * Send analytics events
 */
function track[Component]Interaction(action, data = {}) {
  // Adobe Analytics
  if (window._satellite) {
    _satellite.track('[component]-interaction', {
      action,
      [property]: [value],
      ...data
    });
  }
  
  // Google Analytics
  if (window.gtag) {
    gtag('event', '[component]_interaction', {
      event_category: '[Component Name]',
      event_action: action,
      event_label: `[Label]`,
      ...data
    });
  }
  
  // RUM (built-in)
  sampleRUM(`[component]:${action}`, data);
}
```

---

## Security Considerations

> **INSTRUCTION:** Document security best practices and considerations.

### Content Sanitization

> **INSTRUCTION:** Document XSS prevention if component handles user content.

```javascript
/**
 * Sanitize user content to prevent XSS
 */
function sanitizeContent(html) {
  const temp = document.createElement('div');
  temp.textContent = html; // Escapes HTML entities
  return temp.innerHTML;
}
```

### CSP Compliance

> **INSTRUCTION:** Document Content Security Policy requirements.

```html
<!-- Required Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data: https:; 
               style-src 'self' 'unsafe-inline';">
```

The component is CSP-compliant:
- No inline event handlers
- No `eval()` or `Function()` constructors
- All styles in external CSS or style attributes
- [Additional compliance notes]

---

## Contributing

> **INSTRUCTION:** Provide contribution guidelines.

### Code Style

```javascript
// Follow EDS conventions
// - 2 space indentation
// - Single quotes for strings
// - Semicolons required
// - Descriptive variable names

// Good
const [descriptiveName] = [value];
const [element] = [selector];

// Bad
var i = 0;
let el = [selector]
```

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Run linter and tests
5. Submit PR with clear description
6. Address review comments
7. Squash commits before merge

### Testing Requirements

All PRs must include:
- Unit tests for new functions
- Integration tests for user flows
- Accessibility tests (keyboard, screen reader)
- Performance benchmarks
- Cross-browser verification

---

## Resources

> **INSTRUCTION:** Provide links to relevant documentation and resources.

### Documentation
- [AEM Edge Delivery Services](https://www.aem.live/docs/)
- [Universal Editor Guide](https://www.aem.live/developer/universal-editor)
- [Block Development](https://www.aem.live/developer/block-collection)

### Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Web Performance](https://web.dev/vitals/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [BrowserStack](https://www.browserstack.com/)

---

*Last Updated: [Month Year]*  
*Version: [Version Number]*  
*For author documentation, see the Author Guide*
