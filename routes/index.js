var express = require("express");
var router = express.Router();

var conn = require("../config/db");
var userModel = require("../models/user");

/* GET home page. */
router.get("/", async function(req, res, next) {
    let options = {
        serverSuccess: req.flash('server-success')
    }
    try {
        options.userList = await userModel.list(conn);
        // console.log(options.userList);
    } catch (error) {
        options.serverError = error.message
        console.log(options.serverError);
    }
    // console.log(options);
    res.render("index", options);
});

router.get("/create", function(req, res, next) {
    res.render("create", {
        serverError: req.flash('server-error')
    });
});

router.get("/delete/:user_id", async function(req, res, next) {
    let user_id = req.params.user_id;
    try {
        let resp = await userModel.delete(conn, user_id);
        req.flash("server-success", "User Deleted Successfully");
        return res.redirect("/");
    } catch (error) {
        req.flash("server-error", "Error while deleting user");
        return res.redirect("/");
    }
})
router.get("/edit/:user_id", async function(req, res, next) {
    let user_id = req.params.user_id;
    let options = {}
    try {
        let userResp = await userModel.list(conn, user_id)
        options.user = userResp[0];
    } catch (error) {
        console.log(error)
        options.serverError = error
    }

    res.render("edit", options);
});

router.post("/edit/:user_id", async function(req, res, next) {
    let user_id = req.params.user_id;

    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    try {
        let resp = await userModel.update(conn, data, user_id);
        req.flash("server-success", "User Update successfully");
        return res.redirect("/");
    } catch (error) {

        req.flash("server-error", "error while creating user");
        return res.redirect("/edit/" + user_id);
    }
});

router.post("/create", async function(req, res, next) {
    // conn.query(query,[data],function)
    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email
    };
    try {
        let resp = await userModel.insert(conn, data);
        req.flash("server-success", "User added successfully");
        return res.redirect("/");
    } catch (error) {

        req.flash("server-error", "error while creating user");
        return res.redirect("/create");
    }
});

module.exports = router;