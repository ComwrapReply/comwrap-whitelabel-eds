# Element Grouping Example - Buttons Container Block

This example demonstrates how to use element grouping with the Buttons Container block.

## How Element Grouping Works

The Buttons Container block uses element grouping to allow multiple configuration options through `classes_` prefixed fields:

### 1. Layout Configuration
- **Field**: `classes_layout`
- **Type**: Select (single choice)
- **Options**: 
  - Default (empty value)
  - Stack (vertical arrangement)
  - Align (horizontal arrangement)

### 2. Effects Configuration
- **Field**: `classes_effects`
- **Type**: Multiselect (multiple choices)
- **Options**:
  - **Animation**: fade-in, slide-up
  - **Style**: shadow, border

## Example Usage

### Basic Buttons Container
```html
<div class="buttons">
  <div>classes_layout: stack</div>
  <div>classes_effects: fade-in,shadow</div>
  <div>
    <div>
      <a href="/primary" class="button primary">Primary Action</a>
    </div>
    <div>
      <a href="/secondary" class="button secondary">Secondary Action</a>
    </div>
  </div>
</div>
```

### Rendered Output
```html
<div class="buttons stack fade-in shadow">
  <div class="buttons-wrapper">
    <div class="buttons">
      <div class="button-item">
        <a href="/primary" class="button primary">Primary Action</a>
      </div>
      <div class="button-item">
        <a href="/secondary" class="button secondary">Secondary Action</a>
      </div>
    </div>
  </div>
</div>
```

## CSS Classes Applied

Based on the element grouping configuration:

### Layout Classes
- `.stack` - Applies vertical flexbox layout
- `.align` - Applies horizontal flexbox layout

### Effect Classes
- `.fade-in` - Adds fade-in animation
- `.slide-up` - Adds slide-up animation
- `.shadow` - Adds shadow effect
- `.border` - Adds enhanced border

## JavaScript Processing

The block's JavaScript automatically:

1. **Extracts** element grouping classes from `classes_` prefixed fields
2. **Applies** the classes to the block element
3. **Processes** individual button items
4. **Adds** semantic CSS classes for styling

## Configuration in Universal Editor

When authors configure the block in Universal Editor:

1. **Layout**: Select from dropdown (Default, Stack, Align)
2. **Effects**: Select multiple options from grouped multiselect
3. **Button Items**: Add individual buttons with primary/secondary styles

## Benefits of Element Grouping

1. **Flexible Configuration**: Multiple options without complex field structures
2. **Clean CSS**: Classes are applied directly to the block element
3. **Maintainable**: Easy to add new options by adding new `classes_` fields
4. **Consistent**: Follows established patterns across the project
5. **User-Friendly**: Intuitive interface for content authors

## Adding New Options

To add new element grouping options:

1. **Add Field**: Add new `classes_` prefixed field to the model
2. **Update CSS**: Add corresponding CSS classes
3. **Update JavaScript**: No changes needed - automatically processed

Example:
```json
{
  "component": "select",
  "name": "classes_spacing",
  "label": "Spacing",
  "valueType": "string",
  "options": [
    {"name": "Default", "value": ""},
    {"name": "Tight", "value": "tight"},
    {"name": "Loose", "value": "loose"}
  ],
  "value": ""
}
```

This pattern makes the block highly configurable while maintaining clean, maintainable code.
