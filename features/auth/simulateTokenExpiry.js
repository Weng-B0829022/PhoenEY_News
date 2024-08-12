import { updateTokens } from '../../api/tokenManagement';

export default function simulateTokenExpiry() {
    const expiredToken = 'expired_token';
    updateTokens(expiredToken, null);
    return expiredToken;
}