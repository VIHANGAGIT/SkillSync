# SkillSync

SkillSync is a comprehensive platform designed for practising coding by solving challenges and conducting live coding sessions.

## 🚀 Features

- **Authentication & User Management**: Secure login and signup flows powered by **Clerk**.
- **Real-time Collaboration**:
  - **Video & Audio Calls**: High-quality, low-latency calls using **Stream Video SDK**.
  - **Live Chat**: Integrated chat functionality for seamless communication using **Stream Chat SDK**.
- **Collaborative Code Editor**:
  - Full-featured code editor based on **Monaco Editor**.
  - Syntax highlighting for multiple languages.
- **Code Execution**: Run code directly within the browser using the **Piston API**.
- **Session Management**: Create, join, and manage live sessions.
- **Background Processing**: Reliable event-driven workflows and background jobs handled by **Inngest**.
- **Modern UI/UX**: Built with **React 19**, **Tailwind CSS v4**, and **DaisyUI v5** for a responsive and accessible interface.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4, DaisyUI v5
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Auth**: @clerk/clerk-react
- **Real-time**: @stream-io/video-react-sdk, stream-chat-react
- **Editor**: @monaco-editor/react
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Background Jobs**: Inngest
- **Auth**: @clerk/express
- **Real-time Sessions**: @stream-io/video-react-sdk

## 📋 Prerequisites

Before running the project, ensure you have the following installed.
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillSync
   ```

2. **Install Dependencies**
   
   Install dependencies for both frontend and backend:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `backend` directory and a `.env.local` file in the `frontend` directory.

   **Backend (`backend/.env`):**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   
   # Clerk Auth
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Stream (Video & Chat)
   STREAM_ACCESS_KEY=your_stream_api_key
   STREAM_SECRET_KEY=your_stream_secret_key

   # Inngest
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key

   # Client URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend (`frontend/.env.local`):**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Running the Application**

   **Start the Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## 📚 API & Documentation Links

- **Authentication**: [Clerk Documentation](https://clerk.com/docs)
- **Video & Chat**: [Stream Documentation](https://getstream.io/chat/docs/)
- **Background Jobs**: [Inngest Documentation](https://www.inngest.com/docs)
- **Code Execution**: [Piston API](https://piston.readthedocs.io/en/latest/api-v2/)
- **Database**: [MongoDB Documentation](https://www.mongodb.com/docs/)
- **Frontend Tooling**: [Vite Documentation](https://vitejs.dev/guide/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/docs) | [DaisyUI](https://daisyui.com/docs/use/)

