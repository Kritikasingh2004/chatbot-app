// Base URL for Flask API
const FLASK_API_BASE_URL = "http://flask-api-url.com/api/v1";

// Next.js API Routes
export const API_ROUTES = {
  // Authentication
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",

  // User Management
  GET_USER_PROFILE: "/api/user/profile",
  UPDATE_USER_PROFILE: "/api/user/profile",

  // Chat Management
  GET_CHAT_HISTORY: "/api/chat/history",
  SAVE_CHAT: "/api/chat/save",

  // Image Processing
  UPLOAD_IMAGE: "/api/image/upload",
  ANALYZE_IMAGE: "/api/image/analyze",

  // Chat Interaction
  SEND_MESSAGE: "/api/chat/send",

  // Vector Search
  SEARCH_SIMILAR_QUERIES: "/api/vector/search",
};

// Flask API Endpoints
export const FLASK_API_ENDPOINTS = {
  IMAGE_RECOGNITION: `${FLASK_API_BASE_URL}/recognize`,
  NATURAL_LANGUAGE_PROCESSING: `${FLASK_API_BASE_URL}/process-text`,
};

// API Functions

// Authentication
export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(API_ROUTES.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// Image Upload and Analysis
export async function uploadAndAnalyzeImage(imageFile: File) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const uploadResponse = await fetch(API_ROUTES.UPLOAD_IMAGE, {
    method: "POST",
    body: formData,
  });
  const { imageUrl } = await uploadResponse.json();

  const analysisResponse = await fetch(API_ROUTES.ANALYZE_IMAGE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl }),
  });
  return analysisResponse.json();
}

// Send Chat Message
export async function sendChatMessage(message: string, imageAnalysis?: string) {
  const response = await fetch(API_ROUTES.SEND_MESSAGE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, imageAnalysis }),
  });
  return response.json();
}

// Get Chat History
export async function getChatHistory() {
  const response = await fetch(API_ROUTES.GET_CHAT_HISTORY);
  return response.json();
}
