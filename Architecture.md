# Select This Architecture

## Structure

### SelectSingle
```jsx
<SelectSingle>
    <HiddenInputs />
    <ButtonDisplay>
    <div className={ 'menu' }>
        <Items>
            <Item />
        </Items>
    </div>
</SelectSingle>
```

### SelectMulti
```jsx
<SelectMulti>
    <HiddenInputs />
    <ButtonDisplay />
    <div className={ 'menu' }>
        <Header>
            <Close />
            <Title />
            <Details >
        </Header>
        <Items>
            <Item />
        </Items>
        <Footer>
            <Continue />
        </Footer>
    </div>
</SelectMulti>
```

## Definitions

### `<SelectSingle />` and `<SelectMulti />`
Wraps everything in a container

### `<HiddenInputs />`
Optional hidden inputs that reflect selected items

### `<ButtonDisplay />`
This is the clickable button that toggles the menu and displays 
default text or chosen item(s)

toggle (click, enter, space, typeahead selection)

### `<Menu />`
Wraps the menu components (header, list, and footer)

handles Keyboard listeners for menu (e.g.tabbing, arrows, enter, 
 space)

### `<Items />`
Contains all items

### `<Item />`
A single item

handles select item (click, space, enter)
handles focus of list items (arrow keys)

### `<Header />` MultiSelect only
Contains title, state of choices, and close button in a Multi Select menu

### `<Footer />` MultiSelect only
Contains continue button






