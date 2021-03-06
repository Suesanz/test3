const express = require('express')
const app = express()
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

///database started////
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("mysql connected")
});


let sql1 = 'create table patient_master(patient_id int auto_increment primary key, prescription_date date,survey int(2),mail varchar(30))'
let sql2 = 'create table response_master(response_id int auto_increment primary key, patient_id int (10),created_on date)'
let sql3 = 'create table response_details(response_id int auto_increment primary key, response_text varchar(30))'


db.query(sql1, (err, result) => {
    if (err)
        throw err
    console.log(result)

})
db.query(sql2, (err, result) => {
    if (err)
        throw err
    console.log(result)

})
db.query(sql3, (err, result) => {
    if (err)
        throw err
    console.log(result)

})

let q1 = 'insert into patient_master values(1,\'1998-08-12\',0,"yadavsourav24071998@gmail.com")'
let q2 = 'insert into patient_master values(2,\'1998-09-12\',0,"samriddha@thelattice.in")'
let q3 = 'insert into patient_master values(3,\'1998-10-12\',1,"sadasdsa@gmail.com")'
let q4 = 'insert into patient_master values(4,\'1999-10-12\',1,"sadasdsa@gmail.com")'
let q5 = 'insert into patient_master values(7,\'2017-10-12\',0,"sadasdsa@gmail.com")'
let q6 = 'insert into patient_master values(8,\'2019-10-12\',1,"sadasdsa@gmail.com")'
let q7 = 'insert into patient_master values(9,\'2020-10-12\',0,"sadasdsa@gmail.com")'
let q8 = 'insert into patient_master values(0,\'2016-10-12\',1,"thesuesanz00@gmail.com")'
db.query(q1, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q2, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q3, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q4, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q5, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q6, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q7, (err, result) => {
    if (err)
        throw err
    console.log(result)
})
db.query(q8, (err, result) => {
    if (err)
        throw err
    console.log(result)
})

//////case1
cron.schedule('* * 23 * *', function () {

    const e = 35;
    let p = []
    let presc = `select mail from patient_master where prescription_date + ${e} <curdate() and survey=0`
    db.query(presc, (err, result_mail) => {
        if (err)
            throw err
        p = result_mail
    })

//database ended///
/////case 1
    const output = `<p>Complete your survey!!</p>
                    <h4>Thanks!</h4>
 `
    setTimeout(function () {
        for (let propp in p) {

            let transporter = nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: true, // true for 465, false for other ports
                service: 'gmail',
                auth: {
                    user: 'anthe2067@gmail.com', // generated ethereal user
                    pass: '******' // generated ethereal password
                }
            });

// setup email data with unicode symbols
            let mailOptions = {
                from: '"Loreum ipsum" <anthe2067@gmail.com>', // sender address
                to: p[propp].mail, // list of receivers
                subject: 'For_testing_purpose', // Subject line
                text: 'Hello world?', // plain text body
                html: output // html body
            };

// send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            });

        }
    }, 200)

});
// });
//case2//
cron.schedule('* * * * 5', function () {
    let p = []
    let presc = `select mail from patient_master where survey=0`
    db.query(presc, (err, result_mail) => {
        if (err)
            throw err
        p = result_mail

    })

    const output = `<p>Complete your survey!!</p>
<p> Your every friday survey mail</p>

 <h4>Thanks!</h4>
 `

    setTimeout(function () {
        for (let propp in p) {

            let transporter = nodemailer.createTransport({
                // host: 'smtp.gmail.com',
                // port: 587,
                // secure: true, // true for 465, false for other ports
                service: 'gmail',
                auth: {
                    user: 'anthe2067@gmail.com', // generated ethereal user
                    pass: '*******' // generated ethereal password
                }
            });

// setup email data with unicode symbols
            let mailOptions = {
                from: '"Loreum ipsum" <anthe2067@gmail.com>', // sender address
                to: p[propp].mail, // list of receivers
                subject: 'For_testing_purpose', // Subject line
                text: 'Hello world?', // plain text body
                html: output // html body
            };

// send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            });

        }
    }, 200)

});
////
app.listen(3232, () => {
    console.log("server started on 3232")
})
