const { firebase } = require("../../fbConfig");

let user = null;

exports.login = (req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(() => {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          user = { idToken, email: req.body.email };
          res.send(user);
          console.log(req);
          res.end();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
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
    .catch((error) => {});
};

exports.isAuth = (req, res) => {
  var user = firebase.auth().currentUser;
  if (user) {
    user
      .getIdToken(true)
      .then((idToken) => {
        res.send(idToken);
        res.end();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(403).json({ message: `No hay usuario en sesión` });
  }
};
