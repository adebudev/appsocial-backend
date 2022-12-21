import wpClient from 'whatsapp-web.js';
const { Client, LocalAuth } = wpClient;
export const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
});
//# sourceMappingURL=wpClient.adapter.js.map