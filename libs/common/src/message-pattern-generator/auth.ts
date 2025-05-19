import { generateMessagePattern } from "./generator";

export const testMessagePatternAuth = generateMessagePattern({ action: 'test_auth', domain: 'auth' });

export const loginMessagePattern = generateMessagePattern({ action: 'login', domain: 'auth' });

export const getUserByAccessTokenMessagePattern = generateMessagePattern({ action: 'get_user_by_access_token', domain: 'auth' });

export const signTokensMessagePattern = generateMessagePattern({ action: 'sign_tokens', domain: 'auth' });