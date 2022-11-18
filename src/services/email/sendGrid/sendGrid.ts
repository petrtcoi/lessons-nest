import apiKey from "../../../config/sendGrid.conf";
const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(apiKey)

export default sgMail