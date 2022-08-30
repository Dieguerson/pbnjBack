const routes = (req) => {
  let routesArray = [
    {
      name: 'Inicio',
      route: '/'
    }
  ]

  if (!!req.session.passport) {
    routesArray.push({
      name: 'Usuario',
      route: `/user/${req.session.passport.user._id}`
    })
  } else {
    routesArray.push(
      {
        name: 'Registro',
        route: '/register'
      },
      {
        name: 'Login',
        route: `/login`
      }
    )
  }

  return routesArray
}

module.exports = routes