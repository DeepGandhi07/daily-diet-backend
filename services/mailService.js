import nodemailer from "nodemailer";
import { google } from "googleapis";

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

export const mailTemplate = (link, name, email) => `
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
        font-size: 0.8rem;
        padding: 0.6rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 0.5rem 0;
        cursor: pointer;
            }
</style>
  </head>
  <body>
    <header>
      <h1>Daily Diet</h1> 
      <br />
      <h2>Password reset</h2>
    </header>
    <main>
    <article>
      <br />
      <p>Hello ${name},
      <br /><br />
      Somebody requested a new password for the Daily Diet account associated with ${email}.
      <br /><br />
      No changes have been made to your account yet.
      <br /><br />
      You can reset your password by clicking the link below:*
      <br /><br />
      <a href=${link} class="button">Reset password</a>
      <br /><br />
      or copy the link to the browser:*
      <br /><br />
      <a href=${link} >${link}</a>
      <br /><br /><br />
      If you did not request a new password, please let us know immediately by replying to this email.
      <br /><br />
      *The password reset link is only valid for the next 15 minutes.
      <br /><br />
      Yours,<br />
      The Daily Diet team
      <br />
      <hr />
      <br />
      </p>
    </article>
    </main>
    <footer><a href="https://daily-diet.pages.dev">Daily Diet Homepage</a></footer>
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
