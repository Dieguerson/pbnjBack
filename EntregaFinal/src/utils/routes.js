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
    routesArray.push({
      name: 'Productos',
      route: `/productos`
    })
    routesArray.push({
      name: 'Carrito',
      route: `/carrito`
    })
    routesArray.push({
      name: 'Chat',
      route: `/chat`
    })
    routesArray.push({
      name: 'Compras',
      route: `/orden`
    })
  }

  return routesArray
}

module.exports = routes