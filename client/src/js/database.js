import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// exports function that will be used to POST to the db
export const putDb = async (content) => {

try {

// create connection to db and the version to use
  const db = await openDB('jate', 1);

// create new transaction , specifying the db and data privileges
  const tx = db.transaction('jate', 'readwrite');

// open object store
  const store = tx.objectStore('jate');

// using the add method to store and pass in the content
  const request = store.add({ content });

// confirming request 
  const result = await request;
  console.log('🚀 - data saved to the database', result);

} catch (error) {
  console.error('putDb not implemented', error);

}
}


// TODO: Add logic for a method that gets all the content from the database

// exports function that will be used to GET ALL content from the db
export const getDb = async () => {

  try {

  //create connection to db and the version to use
    const db = await openDB('jate', 1);

  // new transaction , specify the db and data privileges
    const tx = db.transaction('jate', 'readonly');

  // open object store
    const store = tx.objectStore('jate');

  // using getAll method to get all content from db
    const request = store.getAll();

  // confirming request
    const result = await request;
    console.log('🚀 - data retrieved from the database', result);
    return result;

  } catch (error) {
  console.error('getDb not implemented');

  }
}

initdb();
