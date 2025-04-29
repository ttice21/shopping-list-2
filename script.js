window.onload = function () {
    initShoppingList();
};

function initShoppingList() {
    const form = document.getElementById("item-form");

    // Attach event listener to form submission
    form.addEventListener("submit", (event) => {
        handleItemForm(event);
    });
}

function handleItemForm(event) {
    // Prevent form from submitting and reloading the page
    event.preventDefault();

    // Add the item to the shopping list
    addItemToShoppingList();
}

// Handles adding items to the shopping list
function addItemToShoppingList() {
    // Get user input from the form fields
    const itemNameInput = document.getElementById("item-name");
    const itemAmountInput = document.getElementById("item-amount");

    const itemName = itemNameInput.value.trim();
    const itemAmount = itemAmountInput.value.trim();

    // Validate the input values
    if (!itemName || !itemAmount) {
        alert("Please enter both an item name and an amount.");
        return;
    }

    // Generate a unique ID for the list item
    const itemId = getRandomInt(1, 1000000);

    // Create HTML for the new list item
    const itemHtml = createListItemHtml(itemName, itemAmount, itemId);

// Add the list item to the shopping list
    const shoppingList = document.getElementById("shopping-list");
    shoppingList.insertAdjacentHTML("beforeend", itemHtml);

    // Attach the delete event listener to the new item's delete button
    setDeleteButtonEvent(itemId);

    // Clear the form inputs for new entries
    itemNameInput.value = "";
    itemAmountInput.value = "";
}

// Creates the HTML for a shopping list item
function createListItemHtml(itemName, itemAmount, id) {
    return `
        <li id="item${id}">
            <span>${itemName} - ${itemAmount}</span>
            <button type="button" id="button${id}">Delete</button>
        </li>
    `;
}

// Sets up the delete button to remove its corresponding list item
function setDeleteButtonEvent(id) {
    const deleteButton = document.getElementById(`button${id}`);
    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            const listItem = document.getElementById(`item${id}`);
            if (listItem) {
                listItem.remove(); // Remove the item from the DOM
            }
        });
    }
}

// Generates a random integer between a given range (inclusive)
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;}
