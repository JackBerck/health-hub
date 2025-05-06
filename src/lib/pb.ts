import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

if (typeof document !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie);
    
    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({
            secure: false,
            sameSite: 'Lax',
            path: '/',
            httpOnly: false
        });
    });
}