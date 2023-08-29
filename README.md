# Responsive* Bootstrap Tabs
**Or just "`RBT`"**

This vanilla script turns bootstrap tabs into a select element if the viewport is too small.
Works with BS 4.x and 5.x.

<small>*) Catchy, but not entirely accurate: Responsive in the sense of "I adapt to the width of the screen".</small>

## How does it work?
This script takes all bootstrap tab navigations and turns the click trigger (e.g. a button element) into a `<select>` element with options related to the click trigger. The new select element appears where the tab navigation previously appeared (which has now been hidden).  

## Installation

Reference `rbt.js` from this repository and use the `rbt` object:
```html
<!-- your website / bootstrap markup -->
<!-- ... -->
<script src="rbt.js"></script>
<script>
    rbt.subscribeResizeEvent().start(992);
</script>
```

## Usage
The script automatically converts all tabs into `<select>` elements if the following requirements are met:

- The `<ul>` wrapper for tab navigation has the `.tab` class
- The `<ul>` wrapper for tab navigation has the data-attribute `data-responsive`
- The click targets (buttons) for each tab has, as described in the Bootstrap documentation, the `data-target` (BS 4.x) / `data-bs-target` (BS 5.x) attribute.

## Methods
### `rbt.start(<Number>)`
Take all tab navigations and turn them into select elements if the viewport width is lower than `<Number>`.

### `rbt.subscribeResizeEvent()`
Start an event listener for the `resize` event. Must be used together with the `start()` method.

### `rbt.destroy()`
Remove all dynamic created select elements and use the tab markup as initially created.

## Examples
See [example-4.6.html](example-4.6.html) for Bootstrap 4.6.x or  [example-5.3.html](example-5.3.html) for Bootstrap 5.x. 


