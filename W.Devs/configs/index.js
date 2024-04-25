import dotenv from 'dotenv'
dotenv.config()

const configs={
     CONNECTION:process.env.CONNECTION_STRING,
     PORT:process.env.PORT,
     TOOKEN_SECRETE:process.env.TOKEN_SECRETE,
     COOKIE_SECRETE:process.env.COOKIE_SECRETE,
     TOKEN_EXPIRES:process.env.TOKEN_EXPIRES,
     COOKIE_EXPIRESIN:process.env.COOKIE_EXPIRESIN,
     SENDGRID_KEY:process.env.SENDGRID_KEY
}

export default configs