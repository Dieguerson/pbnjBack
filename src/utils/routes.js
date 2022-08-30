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
      route: `/usuario/${req.session.passport.user._id}`
    })
  } else {
    routesArray.push(
      {
        name: 'Registro',
        route: '/registro'
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