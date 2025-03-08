const { createTransport } = require("nodemailer");

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: 'riteshpatdia0723@gmail.com',
        pass: 'ucrn gzdr yttm tpll'
    }
})

async function sendEmail(to, subject,html) {
    const option = {
        from: 'riteshpatdia0723@gmail.com',
        to: to,
        subject:subject,
        text:"hiiiiiiiiiii",
        html:html
    }

    await transport.sendMail(option,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("sendMail");
        }
    })
}

module.exports = sendEmail