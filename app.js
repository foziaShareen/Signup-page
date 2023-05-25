const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
 res.sendFile(__dirname+'/signup.html')   
});

app.post("/", function (req, res) {
    const firstname = req.body.fname
    const lastname = req.body.lname
    const email = req.body.email;
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }}]
    }

    const jsondata = JSON.stringify(data);    

    const url = "https://us21.api.mailchimp.com/3.0/lists/cc79ee9848" 

    const options = {
      method: "Post",
      auth: "iqra:fabcdc174d831f74e606b49e45fe7454-us21",
    };
    
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsondata);
    request.end()

})

app.post("/failure", function (req,res) {
    res.redirect("/");    
})

app.listen( process.env.PORT || 3000, function () {
    console.log("Ready apple wanda go")
});

//my api key
// fabcdc174d831f74e606b49e45fe7454-us21;

//list key
// cc79ee9848;
