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

export const mailTemplate = (link, image, name, email) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      .button {
        background-color: rgb(125, 215, 120);
        border: none;
        border-radius: 10px 0;
        color: white;
        font-size: 1.2rem;
        padding: 0.8rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        margin: 0.5rem;
        cursor: pointer;
            }
</style>
  </head>
  <body>
    <header>
      <img src=${image} alt="two leaves - daily diet website logo" width="40px" height="40px" />
      <h1>Daily Diet</h1>
    </header>
    <main>
    <article>
      <h2>Password reset</h2>
      <br />
      <p>Hello ${name},

      Somebody requested a new password for the Daily Diet account associated with ${email}.
      
      No changes have been made to your account yet.
      
      You can reset your password by clicking the link below:

      <a href=${link} class="button">Reset password</a>
      
      If you did not request a new password, please let us know immediately by replying to this email.
      
      Yours,
      The Daily Diet team
      
      </p>
    </article>
    </main>
    <footer><a href="https://daily-diet.pages.dev" class="button">Daily Diet Homepage</a></footer>
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
