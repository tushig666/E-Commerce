# Maison Éclat - Modern Luxury E-Commerce

---

## 🇲🇳 Монгол (Mongolian)

### Товч танилцуулга

**Maison Éclat** нь орчин үеийн, тансаг зэрэглэлийн загварын бараа бүтээгдэхүүнийг санал болгох, Next.js болон Firebase дээр суурилсан цахим дэлгүүрийн платформ юм. Энэхүү төсөл нь хэрэглэгчийн тав тухтай хэрэглээ, админы удирдлагын хялбар систем, хиймэл оюун ухаанд суурилсан ухаалаг зөвлөх зэрэг дэвшилтэт функцүүдийг агуулсан.

### ✨ Онцлог функцүүд

- **Бүтээгдэхүүний каталог:** Бүх бүтээгдэхүүнийг ангиллаар харах, дэлгэрэнгүй мэдээлэл авах.
- **Хэрэглэгчийн бүртгэл:** Firebase Authentication ашиглан имэйл, нууц үгээр бүртгүүлэх, нэвтрэх.
- **Худалдааны сагс:** Сонгосон барааг сагсанд нэмэх, тоо ширхгийг өөрчлөх, устгах (Firestore болон LocalStorage-д хадгална).
- **Хүслийн жагсаалт:** Таалагдсан бүтээгдэхүүнээ хадгалах.
- **Админы удирдлагын самбар:** Админ хэрэглэгч бүтээгдэхүүн нэмэх, засах, устгах (CRUD) бүрэн боломжтой.
- **AI Стилист:** Genkit ашиглан хэрэглэгчийн үзсэн бараан дээр тулгуурлан хувцаслалтын зөвлөгөө өгөх ухаалаг туслах.
- **Responsive Design:** Бүх төрлийн дэлгэцэнд (desktop, tablet, mobile) төгс зохицно.

### 💻 Ашигласан технологи

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
- **AI:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Deployment:** [Vercel](https://vercel.com/)

### 🚀 Суулгах заавар

1.  **Repository-г хуулж авах:**
    ```bash
    git clone https://github.com/tushig666/E-Commerce.git
    cd E-Commerce
    ```

2.  **Шаардлагатай сангуудыг суулгах:**
    ```bash
    npm install
    ```

3.  **Firebase-ийн тохиргоог хийх:**
    - Firebase дээр шинэ төсөл үүсгэнэ.
    - `Authentication`, `Firestore Database`, `Storage` үйлчилгээнүүдийг идэвхжүүлнэ.
    - Төслийн тохиргоо (Project Settings) хэсгээс Web App үүсгэж, тохиргооны түлхүүрүүдийг авна.

4.  **Environment Variables тохируулах:**
    - Төслийн үндсэн хавтаст `.env.local` нэртэй файл үүсгэнэ.
    - `.env.example` файлд байгаа хувьсагчуудыг хуулж, өөрийн Firebase төслийн мэдээллээр солино.
    ```env
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    ```

### 🏃 Ажиллуулах

- **Development орчинд ажиллуулах:**
  ```bash
  npm run dev
  ```
  Хөтөч дээр `http://localhost:9002` хаягаар орж харна уу.

- **Production build хийх:**
  ```bash
  npm run build
  ```

### ☁️ Deploy хийх (Vercel)

1.  Өөрийн Github account-д энэхүү repository-г push хийнэ.
2.  Vercel дээр нэвтэрч ороод, "Add New... -> Project" товчийг дарна.
3.  Github repository-оо сонгож "Import" хийнэ.
4.  `Settings` -> `Environment Variables` хэсэгт `.env.local` файлд тохируулсан бүх хувьсагчаа нэг бүрчлэн оруулна.
5.  "Deploy" товчийг дарна.

---

## 🇬🇧 English (English)

### About The Project

**Maison Éclat** is a modern, luxury fashion e-commerce platform built with Next.js and Firebase. This project features an elegant user experience, a simple and powerful admin system, and an intelligent AI-powered stylist.

### ✨ Features

- **Product Catalog:** Browse all products by category and view detailed information.
- **User Authentication:** Sign up and sign in with email and password using Firebase Authentication.
- **Shopping Cart:** Add items to the cart, update quantities, and remove items (persists in Firestore for logged-in users and LocalStorage for guests).
- **Wishlist:** Save your favorite products.
- **Admin Dashboard:** Full CRUD (Create, Read, Update, Delete) functionality for products, accessible to admin users.
- **AI Stylist:** An intelligent assistant powered by Genkit that provides style recommendations based on the user's browsing history.
- **Responsive Design:** Fully responsive and optimized for all screen sizes (desktop, tablet, mobile).

### 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
- **AI:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Deployment:** [Vercel](https://vercel.com/)

### 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tushig666/E-Commerce.git
    cd E-Commerce
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - Enable `Authentication`, `Firestore Database`, and `Storage` services.
    - From Project Settings, create a new Web App and get your Firebase config credentials.

4.  **Configure Environment Variables:**
    - Create a file named `.env.local` in the root of the project.
    - Copy the variables from `.env.example` and replace the values with your own Firebase project credentials.
    ```env
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    ```

### 🏃 Running the Application

- **Run the development server:**
  ```bash
  npm run dev
  ```
  Open `http://localhost:9002` in your browser.

- **Create a production build:**
  ```bash
  npm run build
  ```

### ☁️ Deployment (Vercel)

1.  Push the repository to your own Github account.
2.  Log in to Vercel and click "Add New... -> Project".
3.  Select your Github repository and click "Import".
4.  Navigate to `Settings` -> `Environment Variables` and add all the variables from your `.env.local` file one by one.
5.  Click the "Deploy" button.

---

## 🇯🇵 日本語 (Japanese)

### プロジェクト概要

**Maison Éclat**（メゾン・エクラ）は、Next.jsとFirebaseを基盤に構築された、モダンでラグジュアリーなファッションECプラットフォームです。このプロジェクトは、洗練されたユーザー体験、シンプルで強力な管理者システム、そしてAIを活用したインテリジェントなスタイリスト機能などを特徴としています。

### ✨ 主な機能

- **商品カタログ:** カテゴリ別に商品を閲覧し、詳細情報を確認できます。
- **ユーザー認証:** Firebase Authenticationを使用し、メールアドレスとパスワードで新規登録・ログインが可能です。
- **ショッピングカート:** 商品をカートに追加、数量変更、削除ができます（ログインユーザーはFirestore、ゲストはLocalStorageに保存）。
- **ウィッシュリスト:** 気に入った商品を保存できます。
- **管理者ダッシュボード:** 管理者ユーザーは商品のCRUD（作成、読み取り、更新、削除）が可能です。
- **AIスタイリスト:** Genkitを活用し、ユーザーの閲覧履歴に基づいてスタイリングの提案を行うインテリジェントなアシスタント機能。
- **レスポンシブデザイン:** すべてのデバイス（デスクトップ、タブレット、モバイル）に最適化されています。

### 💻 使用技術

- **フレームワーク:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
- **バックエンド & データベース:** [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage)
- **AI:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **デプロイメント:** [Vercel](https://vercel.com/)

### 🚀 セットアップ手順

1.  **リポジトリをクローン:**
    ```bash
    git clone https://github.com/tushig666/E-Commerce.git
    cd E-Commerce
    ```

2.  **依存関係をインストール:**
    ```bash
    npm install
    ```

3.  **Firebaseのセットアップ:**
    - Firebaseコンソールで新規プロジェクトを作成します。
    - `Authentication`、`Firestore Database`、`Storage`サービスを有効化します。
    - プロジェクト設定からWebアプリを作成し、Firebase設定オブジェクトを取得します。

4.  **環境変数の設定:**
    - プロジェクトのルートディレクトリに`.env.local`という名前のファイルを作成します。
    - `.env.example`ファイルの内容をコピーし、ご自身のFirebaseプロジェクトの情報に書き換えます。
    ```env
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREbase_APP_ID="YOUR_APP_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
    ```

### 🏃 アプリケーションの実行

- **開発環境で実行:**
  ```bash
  npm run dev
  ```
  ブラウザで `http://localhost:9002` を開いてください。

- **プロダクションビルドの作成:**
  ```bash
  npm run build
  ```

### ☁️ デプロイ (Vercel)

1.  ご自身のGithubアカウントにこのリポジトリをプッシュします。
2.  Vercelにログインし、「Add New... -> Project」をクリックします。
3.  Githubリポジトリを選択し、「Import」します。
4.  `Settings` -> `Environment Variables` に移動し、`.env.local`ファイルに設定したすべての環境変数を一つずつ追加します。
5.  「Deploy」ボタンをクリックします。
