import sendGridMail from '@sendgrid/mail'


const sendGridKey=process.env.SENDGRID_KEY
sendGridMail.setApiKey(sendGridKey);

const mailer = async (mailOptions, action) => {
  try {
    await sgMail.send(mailOptions);
    console.log('Sent mail');
  } catch (err) {
    console.error(err, 'error sending email');
  }
}
try{
const mailoptions = {
    from: 'yvannyizerimana@gmail.com', // sender address
    to: req.body.email, // receiver address
    subject: 'Hello ✔', // Subject line
    html: `http://localhost:9000/autho/reset-password/${resetToken}`
  };

  await mailer(mailoptions, "account credentials");
  res.status(200).send("your username and email sent successfully");
} catch (error) {
  console.error('error creating admin account:', error.message);
  res.status(500).send('Internal server error');
}

