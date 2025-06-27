# **App Name**: ManipalRun

## Core Features:

- Student Authentication: Onboarding: Allow login/signup via college email or campus ID for verification using Firebase Authentication. This will be the login screen to start any transaction.
- Delivery Request Form: User friendly form with input fields to describe the parameters of delivery
- Courier List Display: Delivery request: display delivery options for the requestor to choose a courier
- Verification System: Secure Delivery Confirmation: The system will generate OTP/QR code on sender side, that can be shared to receiver of items
- Push Notification: Push Notification: The system notify nearby students about the task request.
- Google Maps Integration: Use Maps API to show pickup & drop points.
- Chat Feature: Enable real-time chat between sender and courier (using Firebase Realtime DB or Firestore).
- Reviews & Ratings: After delivery, sender and courier can rate each other (1
–5 stars) and leave a short review. Save to reviews collection in Firestore.

## Style Guidelines:

- Primary color: Blue (#2E9AFE) to symbolize trust and reliability, suitable for an app that connects users for deliveries.
- Background color: Light gray (#F5F5F5), a light scheme with a neutral tone that ensures readability and accessibility, helping to bring focus to the other elements.
- Accent color: Teal (#008080) to complement the blue, providing a sense of calm and efficiency for secondary CTAs.
- Font pairing: 'Poppins' (sans-serif) for headlines and 'PT Sans' (sans-serif) for body text. The combination of Poppins, with its modern geometric look, and PT Sans, a more humanist sans-serif, will maintain legibility in longer text blocks and other details.
- Consistent use of line icons to represent different delivery types, locations, and urgency levels.
- A clean and intuitive layout, focusing on a task-oriented dashboard for both senders and couriers.
- Subtle transition animations and loading states to improve user experience, offering gentle feedback during interactions.