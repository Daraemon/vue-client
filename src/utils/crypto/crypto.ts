import CryptoJS from 'crypto-js'

const key = process.env.VUE_APP_CRYPTO_KEY
const iv = process.env.VUE_APP_CRYPTO_IV

// 加密
export function encrypto(message: string): string {
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(iv)
  const messageHex = CryptoJS.enc.Utf8.parse(message)
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

// 解密
export function decrypto(message: string): string {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(message)
  const messageBase64 = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const keyHex = CryptoJS.enc.Utf8.parse(key)
  const ivHex = CryptoJS.enc.Utf8.parse(iv)
  const decrypt = CryptoJS.AES.decrypt(messageBase64, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
