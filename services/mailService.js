import nodemailer from "nodemailer";
import { google } from "googleapis";
import website_logo from "../assets/website_logo.png";

const OAuth2 = google.auth.OAuth2;
const OAuth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const accessToken = new Promise((resolve, reject) => {
  OAuth2Client.getAccessToken((error, token) => {
    if (error) reject(error);
    resolve(token);
  });
});

export const mailTemplate = (link) => `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>
    <body>
      <header>
        <img src={${website_logo}} width="40px" height="40px" />
        <h1>Daily Diet</h1>
      </header>
      <main>
      <article>
        <h2>Password reset</h2>
        <br />
        <a href={${link}}>Reset password</a>
      </article>
      </main>
      <footer>Daily Diet</footer>
    </body>
  </html>`;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: "daily.diet.notifications@gmail.com",
    clientId: process.env.GMAIL_CLIENT_ID,
    accessToken,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});
