/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {setGlobalOptions} from "firebase-functions";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

import * as admin from "firebase-admin";
admin.initializeApp();  // No need to assign to `app` unless using multiple projects
const firestore = admin.firestore();
import { v4 as uuidv4 } from "uuid";

import { onDocumentCreated } from "firebase-functions/v2/firestore";

export const createquery = onDocumentCreated("queries/{queryId}", (event) => {    // Get the document snapshot
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return null;  // Early return if no snapshot
    } 
    if (!snapshot.exists) {
        console.log("Document does not exist");
        return null;
    }
    const data: any = snapshot.data();
    console.log("Snapshot data:", data);

    // Validate required fields to prevent errors
    if (!data.orgId || !data.firstName || !data.lastName || !data.email || !data.phoneNumber) {
        console.error("Missing required fields in query data:", data);
        return null;
    }

    const date = new Date();

    const itemData: any = {
        id: uuidv4().toString(),
        orgId: data.orgId,
        background: 'images/backgrounds/jobjab_contacts.jpg',
        source: null,
        firstName: data.firstName,
        lastName: data.lastName,
        company: '',
        displayName: data.firstName + ' ' + data.lastName,
        address: data.address || '',  // Fallback to empty string if undefined
        lead: true,
        leadAt: date,
        customer: false,
        customerAt: '',
        cancel: false,
        cancelAt: '',
        touches: [],
        actions: [],
        emails: [
             { email: data.email, label: 'Work' }
        ],
        phoneNumbers: [
            { country: 'us', phoneNumber: data.phoneNumber, label: 'Mobile' }
        ],
        sms: false,
        smsAt: '',
        createdAt: date,
        updatedAt: date,
        deletedAt: '',
    };

    // Return the promise chain to ensure the function waits for completion
    return admin
      .firestore()
      .collection("contacts")
      .add(itemData)
      .then((res: any) => {
        console.log("Added to Contacts!", res.id);
        
        // Update only the contactId field on the specific query document
        return firestore
          .collection("queries")
          .doc(event.params.queryId)
          .update({ contactId: res.id })
          .then(() => {
            console.log("Updated contactId on query!");
            return res.id;  // Optional: return the contact ID for logging/monitoring
          });
      })
      .catch((error: Error) => {
        console.error("Error in createuser function:", error);
        throw error;  // Re-throw to mark function as failed
      });
    // perform more operations ...
});

//////////////TEST CODE FOR FCM NOTIFICATIONS ON BUTTON CLICK//////////////
// import { onCall, HttpsError } from "firebase-functions/v2/https";
// import { logger } from "firebase-functions";
// import { setGlobalOptions } from "firebase-functions/v2/options";
// import { initializeApp } from "firebase-admin/app";
// import { getMessaging } from "firebase-admin/messaging";  // For FCM
// import { getFirestore } from "firebase-admin/firestore";  // Optional: For token storage
// import {onRequest} from "firebase-functions/https";
// import { PhoneNumber } from '../../src/app/modules/axiomaim/administration/users/users.model';

// // Set global options for the function.
// setGlobalOptions({ region: "us-central1", timeoutSeconds: 60 });

// // Initialize Firebase Admin SDK.
// initializeApp();

// // Callable function: Sends FCM notification when called (e.g., on client button click).
// export const sendClickNotification = onCall(
//   { cors: true },  // Enable CORS for client calls
//   async (request) => {
//     // Validate input: Expect 'token' (device token) and 'message' (text).
//     const { token, message } = request.data;
//     if (typeof token !== "string" || !token || typeof message !== "string" || !message) {
//       throw new HttpsError("invalid-argument", "Missing or invalid 'token' or 'message'.");
//     }

//     // Optional: Check auth (e.g., only authenticated users can send).
//     if (!request.auth) {
//       throw new HttpsError("unauthenticated", "Must be signed in to send notifications.");
//     }

//     const senderUid = request.auth.uid;

//     try {
//       // Define the notification payload (with click_action for handling taps).
//       const messagePayload = {
//         token,  // Single device token
//         notification: {
//           title: `Click from ${senderUid}!`,
//           body: message,
//           icon: "/images/notification-icon.png",  // Optional: App icon
//         },
//         data: {  // Custom data payload (e.g., for deep linking on click).
//           senderUid,
//           clickType: "share",  // Custom key for handling the "click" action.
//         },
//         apns: {  // iOS-specific: Handle click action.
//           payload: {
//             aps: {
//               "content-available": 1,
//             },
//           },
//         },
//         webpush: {  // Web-specific: Click action URL.
//           notification: {
//             click_action: `https://your-app.web.app/click-handler?type=share&sender=${senderUid}`,
//           },
//         },
//       };

//       // Send the message via FCM.
//       const response = await getMessaging().send(messagePayload);

//       // Log success.
//       logger.info("Notification sent successfully:", { response, senderUid });

//       // Optional: Cleanup invalid tokens (if error indicates invalid token).
//       if (response === "Invalid registration token" || response.startsWith("messaging/")) {
//         // Delete invalid token from Firestore (if stored).
//         await getFirestore().collection("fcmTokens").doc(token).delete().catch(() => {});  // Ignore if not found
//         logger.warn("Invalid token cleaned up:", token);
//       }

//       // Return success (JSON-serializable).
//       return { success: true, messageId: response };
//     } catch (error: any) {
//       logger.error("Failed to send notification:", { error, senderUid });
//       throw new HttpsError("internal", `Failed to send: ${error.message}`);
//     }
//   }
// );

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });