import { ObjectId } from 'mongodb';
import 'server-only';
import ConnectDb from "./ConnectDb";

export const getProductsFromDb = async (id) => {
   const db = await ConnectDb();
   const productsCollection = db.collection('products');
   if(id){
     return productsCollection.find({categoryId: id}).toArray();
   }
   return productsCollection.find({}).toArray();
}

export const getProductByIdFromDb = async (id) => {
   const db = await ConnectDb();
   const productsCollection = db.collection('products');
   const query = {
      _id: new ObjectId(id)
   }
   return productsCollection.findOne(query);
}

export const getProductsByIdsFromDb = async (ids = []) => {
   const db = await ConnectDb();
   const productsCollection = db.collection("products");
   const idsWithObjectId = ids.map((id) => new ObjectId(id));
   const query = {
     _id: { $in: idsWithObjectId },
   };
   return productsCollection.find(query).toArray();
 };