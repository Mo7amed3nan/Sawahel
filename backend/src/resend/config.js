import { Resend } from 'resend';
import donenv from 'dotenv';
donenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
