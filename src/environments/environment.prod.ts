const hostname =
  window.location.hostname === 'app.emersio.fr'
    ? 'emersio-serveur.cleverapps.io'
    : 'test-backend.cleverapps.io';

export const environment = {
  production: true,
  rootUri: `https://${hostname}/api/`,
  version: 'prod',
  secretKey: 'HlnkE=)pIwBJ4H&c0cbJI`4Ehn7lhG?cq]2oQ|IK+y.*g`U`==3Bv#i}*;j*$=6',
};
