/**
 * Basic JSON response for controllers 
 */

export type BasicResponse = { // Devuelve un JSON
  message: string;
}

/**
 * Basic JSON response for controller for the error message
 */

export type ErrorResponse = {
  message: string;
  error: string;
}

export type GoodbyeResponse = {
  message: string;
  date: string;
}

/**
 * Basic JSON response for controller
 */

export type AuthResponse = {
  message: string;
  token: string;
}