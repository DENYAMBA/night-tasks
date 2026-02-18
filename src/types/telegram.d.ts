interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

interface TelegramWebAppInitData {
    query_id?: string;
    user?: TelegramWebAppUser;
    receiver?: any;
    start_param?: string;
    auth_date: number;
    hash: string;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitData;
    ready: () => void;
    expand: () => void;
    close: () => void;
    MainButton: any;
    BackButton: any;
    HapticFeedback: any;
    themeParams: any;
    colorScheme: string;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    sendData: (data: any) => void;
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}