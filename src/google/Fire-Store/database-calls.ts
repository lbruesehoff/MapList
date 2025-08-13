import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { FolderType, LocationType } from "../../store/store-interfaces";
import { app } from "../config";
import { getAuth } from "firebase/auth";

const db = getFirestore(app); // Initialize Firestore with the app instance

// Ensure the user document exists
async function ensureUserDocument() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      name: user.displayName || "",
      email: user.email || "",
      createdAt: new Date().toISOString(),
      theme: "default", // Default theme
    });
  }
}
async function updateUserTheme(theme: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user?.uid) {
    throw new Error("User is not authenticated.");
  }
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, { theme });
}

// Add a folder for a user
async function createFolder(userId: string, folder: FolderType) {
  const folderRef = doc(collection(db, `users/${userId}/folders`), folder.id);
  await setDoc(folderRef, folder);
}

// Add a location to a folder
async function addLocation(
  userId: string,
  folderId: string,
  location: LocationType
) {
  const locationRef = doc(
    collection(db, `users/${userId}/folders/${folderId}/locations`),
    location.id
  );
  await setDoc(locationRef, location);
}

async function getFolders(userId: string) {
  const foldersRef = collection(db, `users/${userId}/folders`);
  const snapshot = await getDocs(foldersRef);
  return snapshot.docs.map((doc) => doc.data() as FolderType);
}

async function getLocations(userId: string, folderId: string) {
  const snapshot = await getDocs(
    collection(db, `users/${userId}/folders/${folderId}/locations`)
  );
  return snapshot.docs.map((doc) => doc.data() as LocationType);
}

export {
  ensureUserDocument,
  updateUserTheme,
  createFolder,
  addLocation,
  getFolders,
  getLocations,
};
