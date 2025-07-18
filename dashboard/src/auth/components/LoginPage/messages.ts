import { UserContextError } from "@dashboard/auth/types";
import { defineMessages, IntlShape } from "react-intl";

export const errorMessages = defineMessages({
  loginError: {
    id: "FopBSj",
    defaultMessage: "Your username and/or password are incorrect. Please try again.",
    description: "error message",
  },
  unknownLoginError: {
    id: "Wr5UOV",
    defaultMessage: "Login went wrong. Please try again.",
    description: "error message",
  },
  serverError: {
    id: "ChGI4V",
    defaultMessage: "Ad is unavailable, please check your network connection and try again.",
    description: "error message",
  },
  noPermissionsError: {
    id: "7Jg9ec",
    defaultMessage: "You don't have permission to login.",
    description: "error message",
  },
  loginAttemptDelay: {
    defaultMessage: "Please wait a moment before trying again.",
    description: "error message",
    id: "RyZd9J",
  },
});

export function getErrorMessage(err: UserContextError, intl: IntlShape): string {
  switch (err) {
    case "loginError":
      return intl.formatMessage(errorMessages.loginError);
    case "externalLoginError":
      return intl.formatMessage(errorMessages.unknownLoginError);
    case "unknownLoginError":
      return intl.formatMessage(errorMessages.unknownLoginError);
    case "serverError":
      return intl.formatMessage(errorMessages.serverError);
    case "noPermissionsError":
      return intl.formatMessage(errorMessages.noPermissionsError);
    case "loginAttemptDelay":
      return intl.formatMessage(errorMessages.loginAttemptDelay);
    case "invalidCredentials":
      return intl.formatMessage(errorMessages.loginError);
    default:
      return intl.formatMessage(errorMessages.unknownLoginError);
  }
}
