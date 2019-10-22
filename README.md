# SelectThis

A NPM package for ADA Compliant Select Menus.

> :warning: **Please Note:** Almost there, not currently ready for public consumption.

## API Docs
https://meatch.github.io/select-this/


## Goals
Create a Aria Compliant set of React Components that will play nicey with VoiceOver. VoiceOver currently has its own set of issues/bugs that are next to impossible to overcome; this library, therefore, aims to degrade gracefully, and wherever possible correct these issues.

Create a Select Menu Facade that can be customized to fit host application aesthetics while preserving functionality and accessibility.

### Feature List
* list of items to select from
  * Should allow for uID's, Selected State, Value, and Display Text
  * Items can be swappped out with a new list
    * identical list with updated selected state for example
    * or new list, which starts us over.
* `Single-Select` Menu
* `Multi-Select` Menu with controls (close button, continue button, feedack of state, max and min selections)
* Button facade should display defaul text when nothing is selected, single item text when selected, or how many items are selected when multi-select
* Semantic Labeling and aria attributes
* Optional Hidden Inputs for posting form data (modern apps use AJAX and does not necessarily need the extra HTML)
* Error Messaging for form validation
* callback when user commits to a selection or set of selections which returns current list and selected state.
* Minimal Visual opinions to allow host app to manage the styles as they see fit.
* Focus management
* Keyboard Accessible
  * enter & space to access, tab to navigate landmarks, and arrow keys to navigate list 
  * Type ahead selection, capturing a set of successive keystrokes to select the closest match that begins with {...}

## Shout Outs.

### Inspired by the following libraries
This library was inspired by the following libraries. We were running into VoiceOver issues in IE with each Library that required us to do more custom work (mostly in accessibilty). I stood on their shoulders with this and learned alot along the way.

* [react-aria-menubutton](https://github.com/davidtheclark/react-aria-menubutton)
* [DownShift](https://www.npmjs.com/package/downshift)

### My Teammates
This was battle tested in our web applications by several ba's, devs, and qa. Without my team, I would not be where I am today, and neither would this package.

### github icons
https://gist.github.com/rxaviers/7360908