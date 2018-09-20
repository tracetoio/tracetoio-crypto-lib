# Utility_crypto



to run mocha test: npm test


## ChangeLog

Version 1.1.1

Moving to github and add license.

Version 1.1.0

Change IPFS url to point to a traceto.io hosted AWS ALB.

Version 1.0.0

*Breaking Changes

Updated uploadToIPFS(data,_passPhrase, callback)
It now includes the _passPhrase as a parameter that is passed in rather than using a localized passphrase.

Added a function called setPassphraseForWeb where we pass in the seed from an external application and the seed is used for passPhrase Generation.

Added a function called uploadToIPFSNoEncrypt where the raw/already encrypted data is uploaded.