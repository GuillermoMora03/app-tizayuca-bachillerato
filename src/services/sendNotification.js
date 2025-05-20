
// 2. src/services/sendNotification.js
export async function sendPushNotification(tokens, title, body) {
    const messages = tokens.map(token => ({
      to: token,
      sound: 'default',
      title,
      body,
      priority: 'high',
      data: { screen: 'NotificacionesList' },
    }));
    const chunks = [];
    while (messages.length) chunks.push(messages.splice(0, 100));
    for (const chunk of chunks) {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk),
      });
    }
  }