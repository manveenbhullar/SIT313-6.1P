const express = require("express")
const Expert = require("./models/Expert")
const bodyParser = require("body-parser")
const http = require("http")
const mongoose = require("mongoose")
const ejs = require("ejs")
const app = express()
const PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/expertDB", { useNewUrlParser: true })


app.route('/')
    .get((req, res) => {
        res.sendFile(__dirname + "/Page/index.html")
    })

app.post("/", (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const phone_num = req.body.phone_num
    const expert = new Expert({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        address: address,
        phone_num: phone_num,
    })
    expert
        .save()
        .catch((err) => console.log(err))

    if (res.statusCode === 200) {
        res.send("Added successfully!")
    }
    else {
        res.send("Failed!")
    }
})

app.route('/expertID')
    .get((req, res) => {
        Expert.find({}, function (err, expert) {
            res.render('result', {
                expertsList: expert
            })
        })
    })

    .delete((req, res) => {
        Task.deleteMany((err) => {
            if (err) { res.send(err) }
            else { res.send('Deleted!') }
        })
    })

app.route('/expertID/:id')
    .patch((req, res) => {
        Expert.update(
            { _id: req.params.id },
            { $set: req.body },
            (err) => {
                if (!err) { res.send('Updated!') }
                else res.send(err)
            }
        )
    })

    .get((req, res) => {
        Expert.findOne(
            { _id: req.param.id },
            (err, foundExpert) => {
                if (foundExpert) (res.send(foundExpert))
                else res.send("Not found!")
            })
    })

    .delete((req, res) => {
        Expert.deleteOne(
            { _id: req.params.id },
            (err, deleteExpert) => {
                if (deleteExpert) (res.send("Deleted!"))
                else res.send(err)
            })
    })

app.listen(PORT, (req, res) => {
    console.log("Server is running on port 8080")
})
