const wpGetQr = async (client) => {
  const qr = new Promise((resolve, reject) => {
    client.on('qr', (qr) => {
      resolve(qr);
    });
    client.on('auth_failure', (e) => {
      reject('Error Al Obtener el Cliente');
      console.log(e);
      throw new Error('Error Al Obtener el Cliente');
    });
    client.initialize();
  });
  return qr;
};

export { wpGetQr };
