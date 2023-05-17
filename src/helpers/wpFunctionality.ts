const wpGetQr = async (client): Promise<string> => {
  try {
    const qr: Promise<string> = new Promise((resolve, reject) => {
      client.on('qr', (qr) => {
        resolve(qr);
      });

      client.on('remote_session_saved', () => {
        console.log('La session ha sido guardada Exitosamente!');
        resolve('remote session saved!');
      });

      client.on('auth_failure', (e) => {
        console.error(e);
        reject('Error al enlazar la sesion');
        throw new Error('Error al enlazar la sesion');
      });
      client.initialize();
    });
    return qr;
  } catch (err) {
    console.error(err);
  }
};

const wpStatus = (client) => {
  try {
    const status = new Promise((resolve, reject) => {
      client.on('authenticated', (session) => {
        console.log('authenticated!');
        resolve(true);
      });
      resolve(false);
      client.initialize();
    });
    return status;
  } catch (err) {
    console.error(err);
  }
};

const wpUserInfo = (client) => {
  try {
    const status = wpStatus(client);
    if (status) throw Error('No hay una sesion enlazada');

    const userInfo = new Promise((resolve, reject) => {
      resolve(client.getState());
    });
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};

export { wpGetQr, wpStatus, wpUserInfo };
