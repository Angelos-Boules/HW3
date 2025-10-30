/*  Name: Angelos Boules
    File: script.css
    Date: 10/29/2025
    
    Purpose: GUI Assignment: Functionality of the Dynamic Multiplication webpage - 
    This file is responsible for implementing the table generation as well as validating
    the user inputs form the html form. Injects html for the table based on the desired user data,
    and uses helper functions for modularity.
    
    Angelos Boules, UMass Lowell Computer Science, angelos_boules@student.uml.edu
    Copyright (c) 2025 by Angelos. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author.
    updated by AB on October 11, 2025 at 10:49 PM
*/
const form = document.getElementById('settings');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let parameters = validateInput();
    if (parameters.length === 4) {
        const minCol = parameters[0];
        const maxCol = parameters[1];
        const minRow = parameters[2];
        const maxRow = parameters[3];
        generateTable(minCol, maxCol, minRow, maxRow);
    }

});

function generateTable(minCol, maxCol, minRow, maxRow) {
    const multTable = document.getElementById('mult-table');
    multTable.innerHTML = '';
    // Create header row + append it to table
    const tableHead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (let i = minCol - 1; i <= maxCol; i++) {
        const cell = document.createElement('td');
        const cellText = document.createTextNode(i);

        cell.appendChild(cellText);
        headerRow.appendChild(cell);
    }
    tableHead.appendChild(headerRow);
    multTable.appendChild(tableHead);

    // Create rest of the body + append to table
    const tableBody = document.createElement('tbody');
    for (let r = minRow; r <= maxRow; r++) {
        const row = document.createElement('tr');

        for (let c = minCol - 1; c <= maxCol; c++) {
            const cell = document.createElement('td');
            let text;
            if (c === minCol - 1) {
                text = r;
            } else {
                text = r * c;
            }
            const cellText = document.createTextNode(text);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    multTable.appendChild(tableBody);
}

function validateInput() {
    const minColElement = document.getElementById('minCol');
    const minColVal = Number(minColElement.value);

    const maxColElement = document.getElementById('maxCol');
    const maxColVal = Number(maxColElement.value);

    const minRowElement = document.getElementById('minRow');
    const minRowVal = Number(minRowElement.value);

    const maxRowElement = document.getElementById('maxRow');
    const maxRowVal = Number(maxRowElement.value);

    clearAllAlerts();

    // Ensure all inputs are numbers
    if (isNaN(minColVal)) {
        showErrorMsg('Invalid characters. Must be an integer between -50 and 50 (inclusive).', 'Minimum Column Value');
        return [];
    }
    if (isNaN(maxColVal)) {
        showErrorMsg('Invalid characters. Must be an integer between -50 and 50 (inclusive).', 'Maximum Column Value');
        return [];
    }
    if (isNaN(minRowVal)) {
        showErrorMsg('Invalid characters. Must be an integer between -50 and 50 (inclusive).', 'Minimum Row Value');
        return [];
    }
    if (isNaN(maxRowVal)) {
        showErrorMsg('Invalid characters. Must be an integer between -50 and 50 (inclusive).', 'Maximum Row Value');
        return [];
    }

    let integerMinCol = minColVal;
    let integerMaxCol = maxColVal;
    let integerMinRow = minRowVal;
    let integerMaxRow = maxRowVal;

    // Handling decimal inputs by parsing them as Integers
    if (!Number.isInteger(minColVal)) {
        integerMinCol = parseInt(minColVal);
        showAlert(minColElement, integerMinCol);
    }
    if (!Number.isInteger(maxColVal)) {
        integerMaxCol = parseInt(maxColVal)
        showAlert(maxColElement, integerMaxCol);
    }
    if (!Number.isInteger(minRowVal)) {
        integerMinRow = parseInt(minRowVal);
        showAlert(minRowElement, integerMinRow);
    }
    if (!Number.isInteger(maxRowVal)) {
        integerMaxRow = parseInt(maxRowVal);
        showAlert(maxRowElement, integerMaxRow);
    }

    // Ensure range is in [-50, 50]
    if (integerMinCol < -50) {
        showErrorMsg('Input must be an integer between -50 and 50 (inclusive).', 'Minimum Column Value');
        return [];
    }
    if (integerMaxCol > 50) {
        showErrorMsg('Input must be an integer between -50 and 50 (inclusive).', 'Maximum Column Value');
        return[];
    }
    if (integerMinRow < -50) {
        showErrorMsg('Input must be an integer between -50 and 50 (inclusive).', 'Minimum Row Value');
        return [];
    }
    if (integerMaxRow > 50) {
        showErrorMsg('Input must be an integer between -50 and 50 (inclusive).', 'Maximum Row Value');
        return[];
    }

    // Ensure minimum < maximum
    if (integerMinCol > integerMaxCol) {
        showErrorMsg('Minimum value cannot be greater than maximum.', 'Min & Max Columns');
        return [];
    }
    if (integerMinRow > integerMaxRow) {
        showErrorMsg('Minimum value cannot be greater than maximum.', 'Min & Max Rows');
        return [];
    }

    removeErrorMsg();
    return [integerMinCol, integerMaxCol, integerMinRow, integerMaxRow];
}

// Helper functions for error messages and alerts
const showErrorMsg = (msg, fieldName = '') => {
    const alertMsg = document.getElementById('alert-placeholder');

    alertMsg.innerText = '';
    alertMsg.classList.add('d-none')

    alertMsg.innerText = `Error${fieldName ? ' - ' + fieldName + ':' : ':'} ${msg} Please check your inputs and try again.`;
    alertMsg.classList.remove('d-none')
};

const removeErrorMsg = () => {
    const alertMsg = document.getElementById('alert-placeholder');
    alertMsg.innerText = '';
    alertMsg.classList.add('d-none')
};

const showAlert = (currElement, int) => {
    const alert = currElement.parentElement.nextElementSibling;
    currElement.value = int;
    alert.innerText = `Warning: Decimals are unsupported. Your input has been changed to ${int}.`;
    alert.classList.remove('d-none');
}

const clearAllAlerts = () => {
    document.querySelectorAll('.text-warning').forEach(alert => {
        alert.innerText = '';
        alert.classList.add('d-none');
    });
};