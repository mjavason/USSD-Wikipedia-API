import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
// export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
export const APP_NAME = process.env.APP_NAME || 'USSD-Wikipedia-API';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const MAIL_ADDRESS = process.env.MAIL_ADDRESS || 'michaelorji@mail.com';
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || 'xxxx';
export const SITE_LINK = process.env.SITE_LINK || 'http://localhost:5000';

export const STATUS_CODES = {
  SUCCESS: '10000',
  FAILURE: '10001',
  RETRY: '10002',
  INVALID_ACCESS_TOKEN: '10003',
};

export const MESSAGES = {
  FETCHED: 'Resource retrieved successfully',
  UPDATED: 'Resource updated successfully',
  ERROR: 'Oops! An error occurred while processing the resource',
  CREATED: 'Resource created successfully',
  DELETED: 'Resource deleted successfully',
  SUCCESSFUL: 'Successful',
  ASSIGNED: 'Resource assignment completed successfully',
  NOT_FOUND: 'Sorry, the requested resource was not found',
  DEFAULT: "We've received your request and you've received ours",
  ALREADY_EXISTS: 'This resource already exists',
  USER_ALREADY_EXISTS: 'The user already exists',
  AUTH_DEFAULT: 'Authentication is required for this action',
  LOGOUT: "You've been successfully logged out. Have a wonderful day!",
  LOGIN_FIRST: 'Oops! Please log in first to proceed',
  LOGGED_IN: "You've been successfully logged in",
  LOGIN_FAILURE: 'Login failed. Please check your email and password',
  USER_UNAUTHORIZED: 'Sorry, you are not authorized to perform this operation',
  USER_NOT_FOUND: 'User not found',
  MAIL_SENT: 'Email sent successfully. Please check your inbox!',
  INVALID_UNIQUE_ID: 'Invalid unique identifier provided',
  UNKNOWN_ERROR: 'Oops! An unknown error occurred',
  AUTH_FAILURE: 'Authentication failed. Please check your credentials',
  FORBIDDEN: "Sorry, you don't have permission to access this resource",
  AUTHENTICATION_FAILURE: 'Authentication failed. Please log in again',
  NOT_AUTHENTICATED: 'Oops! You need to be authenticated for this action',
  BAD_PARAMETERS: 'Oops! Invalid parameters were provided',
  INTERNAL_ERROR: 'An internal error occurred. Our team is addressing it!',
  SUCCESS_MSG_RESPONSE: 'Success! The operation was completed successfully',
  FAILURE_MSG_RESPONSE: 'Oops! The operation failed to complete',
  ACCESS_TOKEN_ERROR_RESPONSE: 'Access token is invalid. Please log in again',
  TOKEN_REFRESH_RESPONSE: 'Success! The access token was refreshed successfully',
  ROUTE_NOT_FOUND: "Sorry, the page you're looking for doesn't exist.",
  WELCOME_V1: 'Welcome to Version 1',
};

export const LINKS = {
  API_DOCUMENTATION:
    process.env.API_DOCUMENTATION_URL ||
    'https://documenter.getpostman.com/view/29278179/2s9YJgVMFA',
  EMAIL: 'mailto:app@mail.online',
  GOOGLE_MEET: 'https://meet.google.com',
  PHONE_CALL: 'tel:+2349999999999',
  SMS: 'sms:+2349999999999',
  WHATSAPP_CALL: 'https://wa.me/2349999999999',
  WHATSAPP_CHAT: 'https://wa.me/2349999999999',
  ZOOM: 'https://zoom.us/j/9999999999',
};
