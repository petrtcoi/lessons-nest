import * as twilio from 'twilio'
import { twilioConf } from '../../../config/twilio.conf'

const client = twilio(twilioConf.accountSid, twilioConf.authToken)

export default client