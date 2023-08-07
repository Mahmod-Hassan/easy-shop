import 'server-only';
import ConnectDb from "./ConnectDb";

export const getCategoriesFromDb = async () => {
    const db = await ConnectDb();
    const categoriesCollection = db.collection('categories');
    return categoriesCollection.find({}).toArray();
}
