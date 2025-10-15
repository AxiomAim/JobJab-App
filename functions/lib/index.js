"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = exports.sendClickNotification = void 0;
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
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
const options_1 = require("firebase-functions/v2/options");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging"); // For FCM
const firestore_1 = require("firebase-admin/firestore"); // Optional: For token storage
const https_2 = require("firebase-functions/https");
// Set global options for the function.
(0, options_1.setGlobalOptions)({ region: "us-central1", timeoutSeconds: 60 });
// Initialize Firebase Admin SDK.
(0, app_1.initializeApp)();
// Callable function: Sends FCM notification when called (e.g., on client button click).
exports.sendClickNotification = (0, https_1.onCall)({ cors: true }, // Enable CORS for client calls
async (request) => {
    // Validate input: Expect 'token' (device token) and 'message' (text).
    const { token, message } = request.data;
    if (typeof token !== "string" || !token || typeof message !== "string" || !message) {
        throw new https_1.HttpsError("invalid-argument", "Missing or invalid 'token' or 'message'.");
    }
    // Optional: Check auth (e.g., only authenticated users can send).
    if (!request.auth) {
        throw new https_1.HttpsError("unauthenticated", "Must be signed in to send notifications.");
    }
    const senderUid = request.auth.uid;
    try {
        // Define the notification payload (with click_action for handling taps).
        const messagePayload = {
            token, // Single device token
            notification: {
                title: `Click from ${senderUid}!`,
                body: message,
                icon: "/images/notification-icon.png", // Optional: App icon
            },
            data: {
                senderUid,
                clickType: "share", // Custom key for handling the "click" action.
            },
            apns: {
                payload: {
                    aps: {
                        "content-available": 1,
                    },
                },
            },
            webpush: {
                notification: {
                    click_action: `https://your-app.web.app/click-handler?type=share&sender=${senderUid}`,
                },
            },
        };
        // Send the message via FCM.
        const response = await (0, messaging_1.getMessaging)().send(messagePayload);
        // Log success.
        firebase_functions_1.logger.info("Notification sent successfully:", { response, senderUid });
        // Optional: Cleanup invalid tokens (if error indicates invalid token).
        if (response === "Invalid registration token" || response.startsWith("messaging/")) {
            // Delete invalid token from Firestore (if stored).
            await (0, firestore_1.getFirestore)().collection("fcmTokens").doc(token).delete().catch(() => { }); // Ignore if not found
            firebase_functions_1.logger.warn("Invalid token cleaned up:", token);
        }
        // Return success (JSON-serializable).
        return { success: true, messageId: response };
    }
    catch (error) {
        firebase_functions_1.logger.error("Failed to send notification:", { error, senderUid });
        throw new https_1.HttpsError("internal", `Failed to send: ${error.message}`);
    }
});
exports.helloWorld = (0, https_2.onRequest)((request, response) => {
    firebase_functions_1.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
//# sourceMappingURL=index.js.map