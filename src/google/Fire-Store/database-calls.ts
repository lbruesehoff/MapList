import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { FolderType, LocationType } from "../../store/store-interfaces";
import { app } from "../config";
import { getAuth } from "firebase/auth";

const db = getFirestore(app); // Initialize Firestore with the app instance
const auth = getAuth();
const user = auth.currentUser;

// Ensure the user document exists
async function ensureUserDocument() {
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
  if (!user?.uid) {
    throw new Error("User is not authenticated.");
  }
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, { theme });
}

// Add a folder for a user
async function createFolder(folder: FolderType) {
  const folderRef = doc(
    collection(db, `users/${user?.uid}/folders`),
    folder.id
  );
  await setDoc(folderRef, folder);
}

// Add a location to a folder
async function addLocation(folderId: string, location: LocationType) {
  const locationRef = doc(
    collection(db, `users/${user?.uid}/folders/${folderId}/locations`),
    location.id
  );
  await setDoc(locationRef, location);
}
export { ensureUserDocument, updateUserTheme, createFolder, addLocation };
