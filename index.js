const crypto = require('crypto');
const ecies = require("eth-ecies");
const secrets = require('secret-sharing.js');
const ipfsAPI = require('ipfs-api');
const eutil = require('ethereumjs-util');
const aes256 = require('aes256');

class traceto_crypto{

  constructor(ipfs_url = {host: 'ipfs.alpha.traceto.io', port: '443', protocol: 'https'}){
    this.ipfs = ipfsAPI(ipfs_url);
  }

  GeneratePassphrase(len){
    this.passPhrase = secrets.random(len);
  }

  setPassphraseForWeb(seed, callback){
    try{
      secrets.init(8, "browserSJCLRandom");
      secrets.seedRNG(seed, 1024, "randomorg");
      const passPhrase = secrets.random(512);
      return callback(null, passPhrase);
    }
    catch(err){
      return callback(err, null);
    }
  }

  getPassphrase(){
    return this.passPhrase;
  }

  uploadToIPFS(data, _passPhrase, callback){
    let dataE = this.AES256(_passPhrase, data);
    let files = [
    {
      path: '/'+this.SHA512(dataE),
      content: new Buffer(this.Str2Hex(dataE),'hex')
    }
    ]
    if(callback)
      this.ipfs.files.add(files, callback);
    else
      return this.ipfs.files.add(files)
  }

  uploadToIPFSNoEncrypt(data, callback){
    let files = [
    {
      path: '/'+this.SHA512(data),
      content: new Buffer(data,'utf8')
    }
    ]
    if(callback)
      this.ipfs.files.add(files, callback);
    else
      return this.ipfs.files.add(files)
  }

  getFromIPFS(url, callback){
    if(callback)
      this.ipfs.files.cat(url,callback);
    else
      return this.ipfs.files.cat(url);
  }
 
  AES256(pp, dataE){
   return aes256.encrypt(pp, dataE);
  }

  DeAES256(pp, dataE){
    return aes256.decrypt(pp, dataE);
  }

  Random(len) {
    return secrets.random(len);
  }

  Str2Hex(str){
    return secrets.str2hex(str,1);
  }

  Hex2Str(hex){
    return secrets.hex2str(hex,1);
  }

  SHA1(str){
    let shasum = crypto.createHash('sha1');
    shasum.update(str);
    return shasum.digest('hex');
  }

  SHA256(str){
    let shasum = crypto.createHash('sha256');
    shasum.update(str);
    return shasum.digest('hex');
  }

  SHA512(str){
    let shasum = crypto.createHash('sha512');
    shasum.update(str);
    return shasum.digest('hex');
  }

  Encrypt(str, pubKey){
    const key = new Buffer(pubKey.includes('0x')?pubKey.slice(2):pubKey, 'hex');
    const msg = new Buffer(str);

    return ecies.encrypt(key, msg).toString('hex');
  }

  Decrypt(str, priKey){
    const key = new Buffer(priKey.includes('0x')?priKey.slice(2):priKey, 'hex');
    const msg = new Buffer(str, 'hex');
    return ecies.decrypt(key, msg).toString('utf8');
  }

  Split(hex, m, n){
    return secrets.share(hex, m, n);
  }

  Combine(pieces){
    return secrets.combine(pieces);
  }
}

module.exports = traceto_crypto;
