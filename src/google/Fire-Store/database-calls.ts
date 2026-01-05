import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
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
      theme: "light", // Default theme
    });
  }
}

async function updateUserMembership(level: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user?.uid) {
    throw new Error("User is not authenticated.");
  }
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, { membership: level });
}

async function getMemershipLevel(userId: string) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists()
    ? (userDoc.data() as { membership: string }).membership
    : "Free";
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

async function editFolderNameFirestore(
  userId: string,
  folderId: string,
  newName: string
) {
  const folderRef = doc(db, `users/${userId}/folders`, folderId);
  await updateDoc(folderRef, { name: newName });
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

async function getAllLocations(userId: string): Promise<LocationType[]> {
  const foldersRef = collection(db, `users/${userId}/folders`);
  const folderSnapshot = await getDocs(foldersRef);

  let allLocations: LocationType[] = [];

  for (const folderDoc of folderSnapshot.docs) {
    const locationsRef = collection(
      db,
      `users/${userId}/folders/${folderDoc.id}/locations`
    );
    const locationSnapshot = await getDocs(locationsRef);
    allLocations.push(
      ...locationSnapshot.docs.map((doc) => doc.data() as LocationType)
    );
  }

  return allLocations;
}

async function getUserTheme(userId: string) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists()
    ? (userDoc.data() as { theme: string }).theme
    : "light";
}

async function deleteFolderFirestore(userId: string, folderId: string) {
  const folderRef = doc(db, `users/${userId}/folders`, folderId);
  await deleteDoc(folderRef);
}

async function deleteLocationFirestore(
  userId: string,
  folderId: string,
  locationId: string
) {
  const locationRef = doc(
    db,
    `users/${userId}/folders/${folderId}/locations`,
    locationId
  );
  await deleteDoc(locationRef);
}

export {
  ensureUserDocument,
  updateUserMembership,
  getMemershipLevel,
  updateUserTheme,
  createFolder,
  editFolderNameFirestore,
  addLocation,
  getFolders,
  getLocations,
  getAllLocations,
  getUserTheme,
  deleteFolderFirestore,
  deleteLocationFirestore,
};
