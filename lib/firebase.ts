import { cert, getApps, initializeApp } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const app = !getApps().length
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: `firebase-adminsdk-fbsvc@${process.env.FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ).trim(),
      }),
    })
  : getApps()[0];

export const db = getFirestore(app);

// export const bucket = admin.storage().bucket();
