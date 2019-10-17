# Select This Architecture

## Structure

### Single Select
```
<Wrapper>
    <HiddenInputs />
    <ButtonDisplayText>
    <Menu>
        <Items>
            <Item />
        </Items>
    </Menu>
</Wrapper>
```

### Multi Select
```
<Wrapper>
    <HiddenInputs />
    <ButtonDisplayText />
    <Menu>
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
    </Menu>
</Wrapper>
```

## Definitions

### <Wrapper />
Wraps entire component in single container

### <HiddenInputs />
Optional hidden inputs that reflect selected items

### <ButtonDisplayText />
This is the clickable button that toggles the menu and displays 
default text or chosen item(s)

toggle (click, enter, space, typeahead selection)

### <Menu />
Wraps the menu components (header, list, and footer)

handles Keyboard listeners for menu (e.g.tabbing, arrows, enter, 
 space)

### <Items />
Contains all items

### <Item />
A single item

handles select item (click, space, enter)
handles focus of list items (arrow keys)

### <Header /> MultiSelect only
Contains title, state of choices, and close button in a Multi Select menu

### <Footer /> MultiSelect only
Contains continue button






