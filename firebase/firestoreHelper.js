import { addDoc, collection, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';

export async function writeToDB(data, collectionName) {
    try {
        await addDoc(collection(database, collectionName), data);
    } catch (err) {   
        console.error(err);
    }
}

export async function deleteFromDB(docId, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, docId));
    } catch (err) {
        console.error(err);
    }
}

export async function updateDetails(docId, collectionName, data) {
    try {
        await updateDoc(doc(database, collectionName, docId), data);
    } catch (err) {
        console.error(err);
    }
}

export async function readAllDocs(collectionName){
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        let newArray = [];
        querySnapshot.forEach((doc) => {
            newArray.push(doc.data());
        });}
        catch(err){
            console.error(err);
        }
}
