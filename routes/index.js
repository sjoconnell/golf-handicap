const express = require('express');
const router = express.Router();
const roundController = require('../controllers/roundController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')
const groupController = require('../controllers/groupController')
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.render('home', { title: 'Golf-Handicap' })
});
router.get('/login', userController.loginForm)
router.post('/login', authController.login)
router.get('/register', userController.registerForm)
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
)
router.get('/logout', authController.logout)
router.get('/account', authController.isLoggedIn, userController.account)
router.post('/account', catchErrors(userController.updateAccount))
router.post('/account/forgot', catchErrors(authController.forgot))
router.get('/account/reset/:token', catchErrors(authController.reset))
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
)

module.exports = router;
