import PocketBase from 'pocketbase';

// const pb = new PocketBase('http://10.0.2.2:8090'); //Emulador

const pb = new PocketBase('https://tomas.pockethost.io/'); //Produccion

export default pb;