import { stepsInitial } from '../flow/initial.js';
import { stepsResponse } from '../flow/response.js';
export const get = (message) => new Promise((resolve) => {
    const { key } = stepsInitial.find((k) => k.keywords.includes(message)) || {
        key: null,
    };
    const response = key || null;
    resolve(response);
});
export const reply = (step) => new Promise((resolve) => {
    const { replyMessage } = stepsResponse.find(({ key }) => key === step);
    resolve(replyMessage.join(''));
});
//# sourceMappingURL=message.adapter.js.map