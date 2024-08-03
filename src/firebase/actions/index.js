import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../config";

export const registerPassword = async (document) => {
  try {
    const docRef = await addDoc(collection(db, "passwords"), document);
    return {
      status: "success",
      data: docRef,
    };
  } catch (e) {
    console.error("Error adding password: ", e);
    return {
      status: "error",
      data: null,
    };
  }
};

export const GetPasswordsByUser = async (userId = null) => {
  const q = query(
    collection(db, "passwords"),
    orderBy("dateCreated"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  let data = [];

  querySnapshot.forEach((doc) => {
    let getData = {
      id: doc.id,
      ...doc.data(),
    };
    data.push(getData);
  });

  return data;
};

export const GetPasswordById = async (passwordId) => {
  const docRef = doc(db, "passwords", passwordId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data Single:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};
