import nodemailer from 'nodemailer'

const sendEmail=async({from='"Maddison Foo Koch 👻" <fs4191884@gmail.com>',to,subject="Hello ✔",html}={})=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        secure:false,
        auth: {
            user: "fs4191884@gmail.com",
            pass: "nfpzycsgfetbkiti"
        }
    })
    const info= await transporter.sendMail({
        from,
        to, 
        subject, 
        html,
    })  
    //return mailOptions.rejected.length?false:true
    
}
export default sendEmail