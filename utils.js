import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
export const generateToken = (olduser)=>{
 return jwt.sign({
     _id:olduser._id,
     name:olduser.name,
     email:olduser.email,
 },process.env.JWT_SECRET || 'somesecret',{expiresIn:'30d'}
 )
}

const key = crypto
  .createHash("sha512")
  .update(process.env.ENCRYPTION_KEY)
  .digest("hex")
  .slice(0, 32);
const encryptionIV = crypto
  .createHash("sha512")
  .update(process.env.SECRET_KEY)
  .digest("hex")
  .slice(0, 16);
export const encrypt=(data) =>{
    const cipher = crypto.createCipheriv(process.env.ENCRYPTION_METHOD, key, encryptionIV);
    return Buffer.from(
      cipher.update(data, "utf8", "hex") + cipher.final("hex")
    ).toString("base64"); // Encrypts data and converts to hex and base64
  }
  
  // Decrypt data
  export const decrypt = (encryptedData) => {
    const buff = Buffer.from(encryptedData, "base64");
    const decipher = crypto.createDecipheriv(process.env.ENCRYPTION_METHOD, key, encryptionIV);
    return (
      decipher.update(buff.toString("utf8"), "hex", "utf8") +
      decipher.final("utf8")
    ); // Decrypts data and converts to utf8
  }