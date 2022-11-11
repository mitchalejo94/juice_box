// grab our client with destructuring from the export in index.js
const { client, getAllUsers, createUser, updateUser } = require("./index");


// new function, should attempt to create a few users
async function createInitialUsers() {
   
    try {
      console.log("Starting to create users...");
  
      await createUser({ username: 'albert', password: 'bertie99', name: 'Mitch', location:"Nowhere, kansas" });
      await createUser({ username: 'sandra', password: '2sandy4me',name: "Bob", location:"Chicago" });
      await createUser({ username: 'glamgal', password: 'soglam' ,name: "John", location:"Mexico"});
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    }
  }


// this function should call a query which drops all tables from our database
async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS users;
      `);
    console.log("Finished dropping tables!");
  } catch (error) {
    throw error; // we pass the error up to the function that calls dropTables
  }
}

// this function should call a query which creates all tables for our database
async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE
      );
  
      `);
    console.log("Finished building tables!");
  } catch (error) {
    throw error; // we pass the error up to the function that calls createTables
  }
}

// async function rebuildDB() {
//   try {
//     client.connect();

//     await dropTables();
//     await createTables();
//   } catch (error) {
//     console.error(error);
//   } 
// }

async function testDB() {
    try {
      console.log("Starting to test database...");
      console.log("Calling getAllUsers");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
      console.log("Calling updateUser on users[0]")
      const updateUserResult = await updateUser(users[0].id, {
        name: "Newname Sogood",
        location: "Lesterville, KY"
      });
      console.log("Result:", updateUserResult);
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }
  
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());



  