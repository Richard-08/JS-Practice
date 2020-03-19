const btnCreateDB = document.querySelector('.btnCreateDB');
const btnInsert = document.querySelector('.btnInsert');
const btnRemoveAll = document.querySelector('.btnRemoveAll');
const dataTable = document.querySelector('.data-table__body');

let db;

/* function createDB() {

    const dbName = 'Customers';
    const dbVersion = 1;

    const request = indexedDB.open(dbName, dbVersion);

    //on upgrade needed
    request.onupgradeneeded = e => {
        const db = e.target.result

        const customers = db.createObjectStore("customers", { keyPath: 'userid' });

        console.log(`upgrade is called database name: ${db.name} version : ${db.version}`)
    }
    //on success 
    request.onsuccess = e => {
        db = e.target.result
        console.log(`success is called database name: ${db.name} version : ${db.version}`)
    }
    //on error
    request.onerror = e => {
        console.log(`error: ${e.target.error} was found `)

    }

}

createDB(); */

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

        let objectStore = db.createObjectStore('customers', { keyPath: 'userId' });

        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }



    function insertData() {

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

                const tableCell1 = document.createElement('td');
                const tableCell2 = document.createElement('td');
                const tableCell3 = document.createElement('td');

                tableCell1.innerText = `${cursor.value.userid}`;
                tableCell2.innerText = `${cursor.value.name}`;
                tableCell3.innerText = `${cursor.value.email}`;

                dataTableRow.appendChild(tableCell1);
                dataTableRow.appendChild(tableCell2);
                dataTableRow.appendChild(tableCell3);

                dataTable.appendChild(dataTableRow);
                //do something with the cursor
                cursor.continue()
            }
        }

    }

    // Listeners

    /* btnCreateDB.addEventListener('click', displayData); */
    btnInsert.addEventListener('click', insertData);
    /* btnRemoveAll.addEventListener('click', removeAll); */

}   