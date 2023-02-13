const wpGetQr = async (client) => {
  const qr = new Promise((resolve, _) => {
    client.on('qr', (qr) => {
      resolve(qr);
    });
    client.initialize();
  });
  return qr;
};

export { wpGetQr };
