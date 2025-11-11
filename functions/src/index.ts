import admin from "firebase-admin";
admin.initializeApp();
const firestore = admin.firestore();

import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { v4 as uuidv4 } from "uuid";

export const createquery = onDocumentCreated("queries/{queryId}", (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    console.log("No data associated with the event");
    return null;
  }

  const data: any = snapshot.data();
  console.log("Snapshot data:", data);

  // Validate required fields
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
    address: data.address || '',
    lead: true,
    leadAt: date,
    customer: false,
    customerAt: '',
    cancel: false,
    cancelAt: '',
    touches: [],
    actions: [],
    emails: [{ email: data.email, label: 'Work' }],
    phoneNumbers: [{ country: 'us', phoneNumber: data.phoneNumber, label: 'Mobile' }],
    sms: false,
    smsAt: '',
    createdAt: date,
    updatedAt: date,
    deletedAt: '',
  };

  // Use firestore consistently
  return firestore
    .collection("contacts")
    .add(itemData)
    .then((res: any) => {
      console.log("Added to Contacts!", res.id);
      return firestore
        .collection("queries")
        .doc(event.params.queryId)
        .update({ contactId: res.id })
        .then(() => {
          console.log("Updated contactId on query!");
          return res.id;
        });
    })
    .catch((error: Error) => {
      console.error("Error in createquery function:", error);
      throw error;
    });
});

//////////////TEST CODE SEND CLICK API //////////////
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";  // For FCM
import { getFirestore } from "firebase-admin/firestore";  // Optional: For token storage
import {onRequest} from "firebase-functions/https";
import { PhoneNumber } from '../../src/app/modules/axiomaim/administration/users/users.model';

// Set global options for the function.
setGlobalOptions({ region: "us-central1", timeoutSeconds: 60 });

// Initialize Firebase Admin SDK.
initializeApp();

// Callable function: Sends FCM notification when called (e.g., on client button click).
export const sendClickNotification = onCall(
  { cors: true },  // Enable CORS for client calls
  async (request) => {
    // Validate input: Expect 'token' (device token) and 'message' (text).
    const { token, message } = request.data;
    if (typeof token !== "string" || !token || typeof message !== "string" || !message) {
      throw new HttpsError("invalid-argument", "Missing or invalid 'token' or 'message'.");
    }

    // Optional: Check auth (e.g., only authenticated users can send).
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Must be signed in to send notifications.");
    }

    const senderUid = request.auth.uid;

    try {
      // Define the notification payload (with click_action for handling taps).
      const messagePayload = {
        token,  // Single device token
        notification: {
          title: `Click from ${senderUid}!`,
          body: message,
          icon: "/images/notification-icon.png",  // Optional: App icon
        },
        data: {  // Custom data payload (e.g., for deep linking on click).
          senderUid,
          clickType: "share",  // Custom key for handling the "click" action.
        },
        apns: {  // iOS-specific: Handle click action.
          payload: {
            aps: {
              "content-available": 1,
            },
          },
        },
        webpush: {  // Web-specific: Click action URL.
          notification: {
            click_action: `https://your-app.web.app/click-handler?type=share&sender=${senderUid}`,
          },
        },
      };

      // Send the message via FCM.
      const response = await getMessaging().send(messagePayload);

      // Log success.
      logger.info("Notification sent successfully:", { response, senderUid });

      // Optional: Cleanup invalid tokens (if error indicates invalid token).
      if (response === "Invalid registration token" || response.startsWith("messaging/")) {
        // Delete invalid token from Firestore (if stored).
        await getFirestore().collection("fcmTokens").doc(token).delete().catch(() => {});  // Ignore if not found
        logger.warn("Invalid token cleaned up:", token);
      }

      // Return success (JSON-serializable).
      return { success: true, messageId: response };
    } catch (error: any) {
      logger.error("Failed to send notification:", { error, senderUid });
      throw new HttpsError("internal", `Failed to send: ${error.message}`);
    }
  }
);
