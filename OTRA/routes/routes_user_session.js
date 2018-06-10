const express = require('express')
const useRouter = express.Router()
const userService = require('../services/userService')
const passport = require('passport')

module.exports = useRouter
const signInRoutes = {
  login: '/OTRA/Login',
  logout: '/OTRA/Logout'
}


useRouter.get('/Login', (req, res) => {
  const loginUrl = `${req.protocol}://${req.headers.host}${req.url}`
  res.render('login.hbs', {
    menuState: { login: "active", signInRoutes, user: req.user },
    action: '/OTRA/Login',
    failedAttempt: loginUrl === req.headers.referer
  })
})


/*
useRouter.get('/Login', (req, res) => {
  const ctx = {}
  const msg = req.flash('loginError')
  if(msg)  ctx.loginError = {message: msg}
  res.render('Login.hbs',ctx)
  //res.render('signInUp',ctx)
})
*/



/*
useRouter.post('/Login',
  passport.authenticate('local', { failureRedirect: signInRoutes.login }),
  (req, res) => res.redirect('/aegle/home')
)
*/


/*
useRouter.post('/login', (req, res, next) => {
  userService.authenticate(req.body.username, req.body.password, (err, user, info) => {
    if(err) return next(err)
    if(info){
      req.flash('loginError', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if(err) return next(err)
      res.redirect('/OTRA/')
    })
  })
})
*/


useRouter.post('/Login', (req, res, next) => {

  let v_criacao_new_user = 'ERROR'
  const loginUrl = `${req.protocol}://${req.headers.host}${req.url}`

  // Validação dos dados de entrada, se vem preenchidos...
  if ( typeof req.body.username == 'undefined' && req.body.username
    && typeof req.body.password == 'undefined' && req.body.password )
  {
    info = "Criação de User faltam dados !!!"
  }

  let user = { 'username': req.body.username,'password': req.body.password }

  // Modo criação de Utilizador...
  if ( req.body.btn_login == 'register_user')
  {
    userService.signin(user, (err, cb, info) => {

      if(err) return next(err)
      if ( typeof info !== 'undefined'  || cb.statusCode !== 201 )
      {
        res.render('login.hbs', {
          menuState: { login: "active" },
          action: '/OTRA/Login',
          failedAttempt: info})

      }
      else{

        res.render('login.hbs', {
          menuState: { login: "active" },
          action: '/OTRA/Login',
          failedAttempt: "User " + user.username + " " + cb.statusMessage})

      }

    })
  }


  // Login de Utilizador
  if ( req.body.btn_login == 'login_user' ||  v_criacao_new_user == 'SUCCESS' ) {
    userService.authenticate(user.username, user.password, (err, user, info) => {
      if(err) return next(err)

      if ( info ) {
        res.render('login.hbs', {
          menuState: { login: "active" },
          action: '/OTRA/Login',
          failedAttempt: info })
      }
      else
        req.logIn(user, (err) => {
          if(err) return next(err)
          res.redirect('/OTRA/')
        })
    })
  }

})



useRouter.get('/logout', (req, res) => {
  req.logout(); res.redirect('/OTRA/')
})

useRouter.post('/register', (req, res, next) => {
  let user = {
    'username': req.body.username,
    'password': req.body.password,


  }
  if(user.password == '' || user.username == '')
    next(new Error('Invalid Credentials'))
  else
    userService.signin(user, (err, user, info) => {
      if (err) return next(err)
      if (info) return next(new Error(info))
      userService.authenticate( req.body.username, req.body.password, (err, user, info) => {
        if(err) return next(err)
        if(info){
          req.flash('loginError', info)
          return res.redirect('/login')
        }
        req.logIn(user, (err) => {
          if(err) return next(err)
          res.redirect('/OTRA/')
        })
      })
    })
})

passport.serializeUser(function(user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function(username, cb) {
  userService.find(username, cb)
})