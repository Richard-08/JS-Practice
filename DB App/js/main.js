const btnCreateDB = document.querySelector('.btnCreateDB');
const btnInsert = document.querySelector('.btnInsert');
const btnRemoveAll = document.querySelector('.btnRemoveAll');
const dataTable = document.querySelector('.data-table__body');

let db;

window.onload = function () {

    const DBrequest = window.indexedDB.open('Customers', 1);

    DBrequest.onerror = (e) => {
        console.log(`Error loading database ${e.target.error}`);
    }

    DBrequest.onsuccess = (e) => {
        console.log(`Database initialised`);

        db = DBrequest.result;

        displayData();
    };

    DBrequest.onupgradeneeded = e => {
        let db = e.target.result;

        db.onerror = e => {
            console.log('Error loading database');
        }

        let objectStore = db.createObjectStore('customers', { keyPath: 'userId', autoIncrement: true });

        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }



    function insertData() {
        // Grab input values
        const userId = document.querySelector('.userId').value;
        const userName = document.querySelector('.userName').value;
        const email = document.querySelector('.email').value;

        const customerData = [
            { userid: userId, name: userName, email: email }
        ];

        const tx = db.transaction(["customers"], "readwrite");

        tx.oncomplete = function () {
            displayData();
        }

        tx.onerror = e => console.log(` Error! ${e.target.error}  `);
        const customers = tx.objectStore("customers");
        customers.add(customerData[0]);

        // Clear inputs
        document.querySelector('.userId').value = '';
        document.querySelector('.userName').value = '';
        document.querySelector('.email').value = ''
    }


    function displayData() {

        dataTable.innerHTML = '';

        const tx = db.transaction("customers", "readonly")
        const objectStore = tx.objectStore("customers")
        const request = objectStore.openCursor()
        request.onsuccess = e => {

            let cursor = e.target.result

            if (cursor) {
                const dataTableRow = document.createElement('tr');
                dataTableRow.classList.add('data-table__row');

                // Data cells
                const tableCell1 = document.createElement('td');
                const tableCell2 = document.createElement('td');
                const tableCell3 = document.createElement('td');

                // Delete button
                const tableCell4 = document.createElement('td');
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('deleteBtn');
                deleteBtn.setAttribute('data-remove', cursor.value.userid);
                deleteBtn.onclick = function (event) {
                    deleteItem(event);
                }

                tableCell4.appendChild(deleteBtn);

                //
                tableCell1.innerText = `${cursor.value.userid}`;
                tableCell2.innerText = `${cursor.value.name}`;
                tableCell3.innerText = `${cursor.value.email}`;
                deleteBtn.innerHTML = `<i class='fas fa-times'></i>`;
                //
                dataTableRow.appendChild(tableCell1);
                dataTableRow.appendChild(tableCell2);
                dataTableRow.appendChild(tableCell3);
                dataTableRow.appendChild(tableCell4);

                dataTable.appendChild(dataTableRow);
                //do something with the cursor
                cursor.continue()
            }
        }

    }

    function deleteItem(event) {
        // retrieve the name of the task we want to delete
        let key = event.target.parentNode.dataset.remove;
        console.log(key);

        // open a database transaction and delete the item
        let transaction = db.transaction(['customers'], 'readwrite');
        let request = transaction.objectStore('customers').delete(key);

        transaction.oncomplete = function () {
            event.target.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode);
        }
    }

    function removeAll() {
        const request = window.indexedDB.open('Customers', 1);

        request.onsuccess = (event) => {
            console.log('Deleting all customers...');
            const db = event.target.result;
            const txn = db.transaction('customers', 'readwrite');
            txn.onerror = (event) => {
                console.log('removeAllRows - Txn error: ', event.target.error.code,
                    " - ", event.target.error.message);
            };

            txn.oncomplete = (event) => {
                console.log('All rows removed!');
            };
            const objectStore = txn.objectStore('customers');
            const getAllKeysRequest = objectStore.getAllKeys();

            getAllKeysRequest.onsuccess = (event) => {
                getAllKeysRequest.result.forEach(key => {
                    objectStore.delete(key);
                });
            }

            displayData();
        }
    }

    // Listeners

    btnInsert.addEventListener('click', insertData);
    btnRemoveAll.addEventListener('click', removeAll);
}   