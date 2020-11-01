var db = require("../models/student");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
exports.getStudents = (req, res) => {
  db.Student.find()
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// exports.createStudent = (req, res) => {
//   const newStudent = new db.Student(req.body);
//   newStudent
//     .save()
//     .then((student) => {
//       res.status(200).send(student);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// };

exports.createStudent = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields
    const { name, course, price, phone } = fields;

    if (!name || !course || !price || !phone) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new db.Student(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 4000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getOneStudent = (req, res) => {
  var id = req.params.id;
  db.Student.find({ _id: id })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.updateStudent = (req, res) => {
  var id = req.params.id;
  db.Student.findByIdAndUpdate(id, req.body, { new: true })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.removeStudent = (req, res) => {
  var id = req.params.id;
  db.Student.findByIdAndRemove({ _id: id })
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
