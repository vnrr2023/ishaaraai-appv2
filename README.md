# 🧠 IshaaraAI — Indian Sign Language Translator

IshaaraAI is a work-in-progress mobile application built with **React Native** and **Expo**, designed to translate **Indian Sign Language (ISL)** into text using AI/ML models. It aims to bridge communication gaps between the hearing and speech-impaired communities and the rest of the world.

---

## 📱 Tech Stack

- **React Native**
- **Expo + Expo Router** for routing and native APIs
- **TensorFlow.js** model integration
- **TypeScript**
- **Custom ML model** for ISL gesture recognition

---

## 🧭 Directory Overview

```
.
├── app/                        # Pages using Expo Router (_layout.tsx, index.tsx, etc.)
├── assets/                    # Fonts, images, ML models, and team photos
│   ├── best_web_model/        # TensorFlow.js sign language model
│   ├── fonts/                 # Custom fonts
│   ├── images/                # Icons and illustrations
│   ├── models/                # Reference gesture images
│   ├── team/                  # Team member photos
│   └── usecases/              # Use case images (education, workplace, etc.)
├── components/                # Reusable UI components
├── constants/                 # App-wide constants (e.g., theme colors)
├── hooks/                     # Custom React hooks
├── scripts/                   # Dev scripts (e.g., reset project)
├── android/                   # Native Android folder
├── app.json                   # Expo app configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # You're here!
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ishaaraai.git
cd ishaaraai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npx expo start
```

Scan the QR code using **Expo Go** on your mobile to run the app.

---

## 📦 Building APK for Android

To build a production-ready APK:

```bash
npx expo run:android --variant release
```

⏳ *Note: First build may take 15–30 minutes depending on system specs.*

### 📍 Output

Find the APK here:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🤖 Machine Learning Model

- Located at: `assets/best_web_model/`
- Includes `model.json` and 25 binary shard files.
- Trained on Indian Sign Language gestures.

---

## 🧑‍💻 Team

- **Rehan Sayyed**
- **Fatima**
- **Nishi**
- **Rohit**
- **Vivek**

> Team photos in `assets/team/`

---

## 🧠 Use Cases

- **Education**
- **Healthcare**
- **Government**
- **Workplace Communication**

See images in: `assets/usecases/`

---

## 📌 Notes

- App is currently in active development 🚧
- Some features/models may be incomplete or undergoing testing.
- Pull requests and contributions are welcome once the MVP is stable!

---

## 📜 License

MIT — feel free to fork and contribute (with credit appreciated!).
