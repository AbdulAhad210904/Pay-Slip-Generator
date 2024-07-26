import fs from 'fs';
import nodemailer from 'nodemailer';
import { join } from 'path';
import { renderToStream } from '@react-pdf/renderer';
import PayslipPDF from '../../components/component/pay-slip-pdf';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  const { pdfData, toEmail } = req.body;

  try {
    const pdfStream = await renderToStream(<PayslipPDF data={pdfData} />);
    
    // Temporary path for storing PDF
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.-]/g, '');
    const fileName = `temp_${timestamp}.pdf`;
    const pdfFilePath = join(process.cwd(), 'public', 'downloads', fileName);
    
    // Write the PDF to a file
    const pdfWriteStream = fs.createWriteStream(pdfFilePath);
    pdfStream.pipe(pdfWriteStream);

    await new Promise((resolve, reject) => {
      pdfWriteStream.on('finish', resolve);
      pdfWriteStream.on('error', reject);
    });

    // Send email with PDF attachment
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject: 'Payslip PDF',
      text: 'Here is your payslip PDF.',
      attachments: [{ path: pdfFilePath }],
    };

    await transporter.sendMail(mailOptions);

    // Clean up: delete temporary PDF file
    fs.unlinkSync(pdfFilePath);

    res.status(200).json({ message: 'PDF sent successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send PDF.' });
  }
}
