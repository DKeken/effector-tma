/**
 * Interface representing the Telegram WebApp API.
 */
export interface TelegramWebApp {
  /** Raw initialization data received from Telegram. */
  initData: string;

  /**
   * Unsafe initialization data.
   * This data should not be trusted and must be validated on the server side.
   */
  initDataUnsafe: {
    /** Unique query identifier for the current WebApp session. */
    query_id: string;
    /** Information about the user. */
    user: WebAppUser;
    /** Unix timestamp when the data was generated. */
    auth_date: string;
    /** Hash for data validation purposes. */
    hash: string;
  };

  /** Version of the Bot API available in the user's Telegram app. */
  version: string;

  /** Platform name of the user's Telegram app. */
  platform: string;

  /** Current color scheme used in the Telegram app. */
  colorScheme: ColorScheme;

  /** Current theme parameters used in the Telegram app. */
  themeParams: ThemeParams;

  /** Indicates if the WebApp is expanded to its maximum available height. */
  isExpanded: boolean;

  /** Current height of the visible area of the WebApp. */
  viewportHeight: number;

  /** Height of the visible area in its last stable state. */
  viewportStableHeight: number;

  /** Indicates if closing confirmation is enabled. */
  isClosingConfirmationEnabled: boolean;

  /** Indicates if vertical swipes to close or minimize the WebApp are enabled. */
  isVerticalSwipesEnabled: boolean;

  /** Current header color in hexadecimal format. */
  headerColor: string;

  /** Current background color in hexadecimal format. */
  backgroundColor: string;

  /** Current bottom bar color in hexadecimal format. */
  bottomBarColor: string;

  /** Controls the back button in the WebApp header. */
  BackButton: BackButton;

  /** Controls the main button displayed at the bottom of the WebApp. */
  MainButton: BottomButton;

  /** Controls the secondary button displayed at the bottom of the WebApp. */
  SecondaryButton: BottomButton;

  /** Controls the settings button in the WebApp context menu. */
  SettingsButton: SettingsButton;

  /** Controls haptic feedback within the WebApp. */
  HapticFeedback: HapticFeedback;

  /** Controls cloud storage operations within the WebApp. */
  CloudStorage: CloudStorage;

  /**
   * Marks the WebApp as ready to be displayed.
   * It is recommended to call this method as early as possible.
   */
  ready: () => void;

  /**
   * Registers an event handler for a specific event type.
   * @param eventType - Type of the event to listen for.
   * @param callback - Callback function to handle the event.
   */
  onEvent: (eventType: WebAppEventType, callback: (args?: any) => void) => void;

  /**
   * Removes a previously registered event handler.
   * @param eventType - Type of the event.
   * @param callback - Callback function to remove.
   */
  offEvent: (
    eventType: WebAppEventType,
    callback: (args?: any) => void
  ) => void;

  /**
   * Displays an alert message with an optional callback.
   * @param message - The message to display.
   * @param callback - Optional callback after the alert is closed.
   */
  showAlert: (message: string, callback?: () => void) => void;

  /**
   * Displays a confirmation dialog with an optional callback.
   * @param message - The confirmation message.
   * @param callback - Callback with the user's response.
   */
  showConfirm: (message: string, callback: (result: boolean) => void) => void;

  /**
   * Displays a popup with parameters and a callback for button interactions.
   * @param params - Configuration for the popup.
   * @param callback - Callback with the ID of the pressed button.
   */
  showPopup: (
    params: PopupParams,
    callback: (buttonId: string) => void
  ) => void;

  /**
   * Displays a QR code scanning popup with an optional callback.
   * @param params - Configuration for the QR popup.
   * @param callback - Callback with the scanned text.
   */
  showScanQrPopup: (
    params: ScanQrPopupParams,
    callback: (text: string) => void
  ) => void;

  /** Closes the QR code scanning popup. */
  closeScanQrPopup: () => void;

  /**
   * Opens an external link in the user's browser.
   * @param url - The URL to open.
   * @param options - Optional parameters for opening the link.
   */
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void;

  /**
   * Opens a Telegram-specific link within the Telegram app.
   * @param url - The Telegram link to open.
   */
  openTelegramLink: (url: string) => void;

  /**
   * Opens an invoice and handles the callback based on payment status.
   * @param url - The invoice URL.
   * @param callback - Callback with the payment status.
   */
  openInvoice: (url: string, callback: (status: InvoiceStatus) => void) => void;

  /** Expands the WebApp to its maximum available height. */
  expand: () => void;

  /** Closes the WebApp. */
  close: () => void;

  /** Disables the closing confirmation dialog. */
  disableClosingConfirmation: () => void;

  /** Enables the closing confirmation dialog. */
  enableClosingConfirmation: () => void;

  /** Disables vertical swipe gestures to close or minimize the WebApp. */
  disableVerticalSwipes: () => void;

  /** Enables vertical swipe gestures to close or minimize the WebApp. */
  enableVerticalSwipes: () => void;

  /**
   * Sets the background color of the WebApp.
   * @param color - The color in hexadecimal format.
   */
  setBackgroundColor: (color: string) => void;

  /**
   * Sets the header color of the WebApp.
   * @param color - The color in hexadecimal format.
   */
  setHeaderColor: (color: string) => void;

  /**
   * Sets the bottom bar color of the WebApp.
   * @param color - The color in hexadecimal format.
   */
  setBottomBarColor: (color: string) => void;

  /**
   * Switches the current inline query with an optional chat type filter.
   * @param query - The inline query text.
   * @param choose_chat_types - Optional array of chat types to filter.
   */
  switchInlineQuery: (query: string, choose_chat_types?: ChatType[]) => void;

  /**
   * Sends data back to the bot.
   * @param data - The data string to send.
   */
  sendData: (data: string) => void;

  /**
   * Requests contact information from the user.
   * @param callback - Callback with the result status.
   */
  requestContact: (callback: (result: boolean) => void) => void;

  /**
   * Requests write access permissions from the user.
   * @param callback - Callback with the result status.
   */
  requestWriteAccess: (callback: (result: boolean) => void) => void;

  /**
   * Reads text from the user's clipboard.
   * @param callback - Callback with the clipboard text.
   */
  readTextFromClipboard: (callback: (text: string) => void) => void;

  /**
   * Shares media to the user's story with optional parameters.
   * @param media_url - The URL of the media to share.
   * @param params - Optional sharing parameters.
   */
  shareToStory: (media_url: string, params?: StoryShareParams) => void;

  /**
   * Checks if the WebApp's version meets or exceeds the specified version.
   * @param version - The version to compare against.
   * @returns Boolean indicating if the condition is met.
   */
  isVersionAtLeast: (version: string) => boolean;

  /**
   * Invokes a custom method with optional parameters and a callback.
   * @param method - The method name to invoke.
   * @param params - Optional parameters for the method.
   * @param callback - Optional callback with the result.
   */
  invokeCustomMethod: <T>(
    method: string,
    params?: Record<string, any>,
    callback?: (result: T) => void
  ) => void;
}

/**
 * Interface representing the WebView component.
 */
export interface WebView {
  /** Initialization parameters for the WebView. */
  initParams: WebViewInitParams;

  /** Indicates if the current view is an iframe. */
  isIframe: boolean;

  /**
   * Registers a callback for a specific event type.
   * @param eventType - The type of event.
   * @param func - The callback function.
   */
  callEventCallbacks: (eventType: string, func: (args?: any) => void) => void;

  /**
   * Registers an event handler.
   * @param eventType - The type of event.
   * @param callback - The callback function.
   */
  onEvent: (eventType: string, callback: (args?: any) => void) => void;

  /**
   * Removes an event handler.
   * @param eventType - The type of event.
   * @param callback - The callback function to remove.
   */
  offEvent: (eventType: string, callback: (args?: any) => void) => void;

  /**
   * Posts an event to the WebView.
   * @param eventType - The type of event.
   * @param callback - The callback function.
   * @param eventData - Optional data associated with the event.
   */
  postEvent: (
    eventType: string,
    callback: (args?: any) => void,
    eventData?: any
  ) => void;

  /**
   * Receives an event from the WebView.
   * @param eventType - The type of event.
   * @param eventData - Optional data associated with the event.
   */
  receiveEvent: (eventType: string, eventData?: any) => void;
}

/**
 * Interface for utility functions.
 */
export interface Utils {
  /** Retrieves a value from session storage by key. */
  sessionStorageGet: (key: string) => string | null;

  /** Sets a value in session storage by key. */
  sessionStorageSet: (key: string, value: string) => void;

  /** Appends hash parameters to a URL. */
  urlAppendHashParams: (url: string, addHash: string) => string;

  /** Parses hash parameters from a location hash. */
  urlParseHashParams: (locationHash: string) => Record<string, string>;

  /** Parses query strings into key-value pairs. */
  urlParseQueryString: (queryString: string) => Record<string, string>;

  /** Decodes a URL-encoded string safely. */
  urlSafeDecode: (urlencoded: string) => string;
}

/**
 * Root interface combining WebView, Utils, and WebApp.
 */
export interface TelegramWebAppRoot {
  /** WebView component. */
  WebView: WebView;

  /** Utility functions. */
  Utils: Utils;

  /** Telegram WebApp API. */
  WebApp: TelegramWebApp;
}

/**
 * Type representing the color scheme.
 * Can be either 'light' or 'dark'.
 */
type ColorScheme = "light" | "dark";

/**
 * Interface representing theme parameters.
 */
interface ThemeParams {
  bg_color: string;
  button_color: string;
  button_text_color: string;
  hint_color: string;
  link_color: string;
  secondary_bg_color: string;
  text_color: string;
  header_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
}

/**
 * Interface for controlling the back button in the WebApp header.
 */
interface BackButton {
  /** Indicates if the back button is visible. */
  isVisible: boolean;

  /** Registers a click event handler for the back button. */
  onClick: (callback: () => void) => void;

  /** Removes a click event handler from the back button. */
  offClick: (callback: () => void) => void;

  /** Shows the back button. */
  show: () => void;

  /** Hides the back button. */
  hide: () => void;
}

/**
 * Interface for controlling buttons displayed at the bottom of the WebApp.
 */
interface BottomButton {
  /** Type of the button, e.g., 'main' or 'secondary'. */
  type: "main" | "secondary";

  /** Text displayed on the button. */
  text: string;

  /** Background color of the button in hexadecimal format. */
  color: string;

  /** Text color of the button in hexadecimal format. */
  textColor: string;

  /** Indicates if the button is visible. */
  isVisible: boolean;

  /** Indicates if a loading indicator is visible on the button. */
  isProgressVisible: boolean;

  /** Indicates if the button is active and clickable. */
  isActive: boolean;

  /** Indicates if the button has a shine effect. */
  hasShineEffect: boolean;

  /** Registers a click event handler for the button. */
  onClick: (callback: () => void) => void;

  /** Removes a click event handler from the button. */
  offClick: (callback: () => void) => void;

  /** Shows the button. */
  show: () => void;

  /** Hides the button. */
  hide: () => void;

  /** Sets parameters for the button. */
  setParams: (params: Partial<BottomButton>) => void;
}

/**
 * Interface for controlling the settings button in the WebApp context menu.
 */
interface SettingsButton {
  /** Indicates if the settings button is visible. */
  isVisible: boolean;

  /** Registers a click event handler for the settings button. */
  onClick: (callback: () => void) => void;

  /** Removes a click event handler from the settings button. */
  offClick: (callback: () => void) => void;

  /** Shows the settings button. */
  show: () => void;

  /** Hides the settings button. */
  hide: () => void;
}

/**
 * Interface for controlling haptic feedback.
 */
export interface HapticFeedback {
  /** Triggers an impact haptic feedback with the specified style. */
  impactOccurred: (style: HapticImpactStyle) => void;

  /** Triggers a notification haptic feedback with the specified type. */
  notificationOccurred: (type: HapticNotificationType) => void;

  /** Triggers a selection changed haptic feedback. */
  selectionChanged: () => void;
}

/**
 * Types for haptic feedback styles.
 */
export type HapticImpactStyle = "light" | "medium" | "heavy" | "rigid" | "soft";
export type HapticNotificationType = "error" | "success" | "warning";

/**
 * Interface for controlling cloud storage operations.
 */
export interface CloudStorage {
  /** Stores a value with the specified key in cloud storage. */
  setItem: (
    key: string,
    value: string,
    callback?: (error: Error | null, success: boolean) => void
  ) => void;

  /** Retrieves a value by key from cloud storage. */
  getItem: (
    key: string,
    callback: (error: Error | null, value: string | null) => void
  ) => void;

  /** Retrieves multiple values by keys from cloud storage. */
  getItems: (
    keys: string[],
    callback: (error: Error | null, values: (string | null)[]) => void
  ) => void;

  /** Removes a value by key from cloud storage. */
  removeItem: (
    key: string,
    callback?: (error: Error | null, success: boolean) => void
  ) => void;

  /** Removes multiple values by keys from cloud storage. */
  removeItems: (
    keys: string[],
    callback?: (error: Error | null, success: boolean) => void
  ) => void;

  /** Retrieves all keys from cloud storage. */
  getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
}

/**
 * Interface for managing biometric authentication.
 */
interface BiometricManager {
  /** Indicates if the biometric manager has been initialized. */
  isInited: boolean;

  /** Indicates if biometrics are available on the device. */
  isBiometricAvailable: boolean;

  /** Type of biometric authentication available. */
  biometricType: BiometricType;

  /** Indicates if access to biometrics has been requested. */
  isAccessRequested: boolean;

  /** Indicates if access to biometrics has been granted. */
  isAccessGranted: boolean;

  /** Indicates if a biometric token is saved on the device. */
  isBiometricTokenSaved: boolean;

  /** Unique identifier for the device. */
  deviceId: string;
}

/**
 * Enum representing types of biometric authentication.
 */
type BiometricType = "finger" | "face" | "unknown";

/**
 * Enum representing WebApp event types.
 */
export type WebAppEventType =
  | "themeChanged"
  | "viewportChanged"
  | "mainButtonClicked"
  | "secondaryButtonClicked"
  | "backButtonClicked"
  | "settingsButtonClicked"
  | "invoiceClosed"
  | "popupClosed"
  | "qrTextReceived"
  | "scanQrPopupClosed"
  | "clipboardTextReceived"
  | "writeAccessRequested"
  | "contactRequested"
  | "biometricManagerUpdated"
  | "biometricAuthRequested"
  | "biometricTokenUpdated";

/**
 * Enum representing invoice statuses.
 */
type InvoiceStatus = "paid" | "cancelled" | "failed" | "pending";

/**
 * Enum representing chat types.
 */
type ChatType = "users" | "bots" | "groups" | "channels";

/**
 * Interface for popup parameters.
 */
interface PopupParams {
  /** Title of the popup. */
  title?: string;
  /** Message body of the popup. */
  message: string;
  /** List of buttons to display in the popup. */
  buttons?: PopupButton[];
}

/**
 * Interface representing a popup button.
 */
interface PopupButton {
  /** Identifier of the button. */
  id?: string;
  /** Type/style of the button. */
  type?: PopupButtonType;
  /** Text displayed on the button. */
  text?: string;
}

/**
 * Enum representing popup button types.
 */
type PopupButtonType = "default" | "ok" | "close" | "cancel" | "destructive";

/**
 * Interface for QR popup parameters.
 */
interface ScanQrPopupParams {
  /** Optional text displayed under the 'Scan QR' heading. */
  text?: string;
}

/**
 * Interface for story sharing parameters.
 */
interface StoryShareParams {
  /** Optional caption for the media. */
  text?: string;
  /** Optional widget link to include in the story. */
  widget_link?: StoryWidgetLink;
}

/**
 * Interface representing a widget link in a story.
 */
interface StoryWidgetLink {
  /** URL to include in the story. */
  url: string;
  /** Optional name to display for the widget link. */
  name?: string;
}

/**
 * Interface for WebView initialization parameters.
 */
interface WebViewInitParams {
  tgWebAppData: string;
  tgWebAppVersion: string;
  tgWebAppPlatform: string;
  tgWebAppThemeParams: string;
}

/**
 * Interface representing a user interacting with the WebApp.
 */
export interface WebAppUser {
  /** Unique identifier for the user or bot. */
  id: number;

  /** Indicates if the user is a bot. */
  is_bot?: boolean;

  /** First name of the user or bot. */
  first_name: string;

  /** Last name of the user or bot. */
  last_name?: string;

  /** Username of the user or bot. */
  username?: string;

  /** IETF language tag of the user's language. */
  language_code?: string;

  /** Indicates if the user is a Telegram Premium user. */
  is_premium: boolean;

  /** Indicates if the bot was added to the user's attachment menu. */
  added_to_attachment_menu: boolean;

  /** Indicates if the user allows the bot to write to their private messages. */
  allows_write_to_pm: boolean;

  /** URL of the user’s profile photo. */
  photo_url?: string;
}

/**
 * Interface representing a chat where the WebApp was launched.
 */
interface WebAppChat {
  /** Unique identifier for the chat. */
  id: number;

  /** Type of chat: 'group', 'supergroup', or 'channel'. */
  type: "group" | "supergroup" | "channel";

  /** Title of the chat. */
  title: string;

  /** Username of the chat. */
  username?: string;

  /** URL of the chat’s photo. */
  photo_url?: string;
}

/**
 * Interface representing the root of the Telegram WebApp.
 */
export interface TelegramWebAppRoot {
  /** WebView component. */
  WebView: WebView;

  /** Utility functions. */
  Utils: Utils;

  /** Telegram WebApp API. */
  WebApp: TelegramWebApp;
}
