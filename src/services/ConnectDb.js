import { MongoClient, ServerApiVersion } from "mongodb";
/** 
 * @type {import('mongodb').Db}
*/

let db;

const ConnectDb = async () => {
    if(db) return db

        try {
            const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcblope.mongodb.net/?retryWrites=true&w=majority`;
            const client = new MongoClient(uri, {
                serverApi: {
                  version: ServerApiVersion.v1,
                  strict: true,
                  deprecationErrors: true,
                }
              });
          db = client.db('easy-shop');
          // Send a ping to confirm a successful connection
          await client.db("easy-shop").command({ ping: 1 });
          console.log('successfully connected db');
         return db;
        } catch (error) {
          console.log(error.message);
        }

}
export default ConnectDb;