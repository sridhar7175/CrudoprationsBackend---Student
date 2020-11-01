const User = require("../models/user");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //encrypt password before save
  //   var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  //   req.body.password = hashedPassword;
  var newsignup = new User(req.body);
  newsignup
    .save()
    .then((signup) => {
      res.status(200).send(signup);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// exports.signup = (req, res) => {
//   var user = new User(req.body);
//   user.save((err, user) => {
//     if (err) {
//       return res.status(400).json({
//         err: "NOT able to save user in DB",
//       });
//     }
//     res.json({
//       name: user.name,
//       email: user.email,
//       _id: user._id,
//       message: "Successfully Register",
//     });
//   });
// };

// exports.signin = (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   User.findOne({ email }, (err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "USER email does not exists",
//       });
//     }

//     if (!user.autheticate(password)) {
//       return res.status(401).json({
//         error: "Email and password do not match",
//       });
//     }

//     //create token
//     const token = jwt.sign({ _id: user._id }, process.env.SECRET);
//     //put token in cookie
//     res.cookie("token", token, { expire: new Date() + 9999 });

//     //send response to front end
//     const { _id, name, email } = user;
//     return res.json({ token, user: { _id, name, email } });
//   });
// };

// exports.signout = (req, res) => {
//   res.clearCookie("token");
//   res.json({
//     message: "User signout successfully",
//   });
// };
