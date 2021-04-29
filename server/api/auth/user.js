const { firebase } = require("../../fbConfig");

exports.login = (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(function () {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          res.send({ idToken, email: req.body.email });
          res.end();
        })
        .catch(function (error) {
          //Handle error
          console.log(error);
        });
    })
    .catch(function (error) {
      //Handle error
      res
        .status(401)
        .json({ message: `Usuario o contraseña erronea. Intente nuevamente` });
      console.log(error.code);
    });
};

exports.logout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      res.send(null);
      res.end();
    })
    .catch(function (error) {
      //Handle error
    });
};

exports.isAuth = (req, res) => {
  var user = firebase.auth().currentUser;
  if (user) {
    user
      .getIdToken(true)
      .then(function (idToken) {
        res.send(idToken);
        res.end();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    //Handle error
    res.status(200).json({ message: `No hay usuario en sesión` });
  }
};
