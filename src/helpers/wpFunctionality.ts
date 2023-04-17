const wpGetQr = async (client) => {
  console.log('Client is ready!');
  const qr = new Promise((resolve, reject) => {
    client.on('message', (message) => {
      console.log(message.body);
    });

    client.on('authenticated', (session) => {
      console.log('authenticated!');
      resolve('authenticated!');
      return;
    });
    client.on('qr', (qr) => {
      resolve(qr);
    });
    client.on('remote_session_saved', () => {
      console.log('La session ha sido guardada Exitosamente!');
      resolve('remote session saved!');
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
