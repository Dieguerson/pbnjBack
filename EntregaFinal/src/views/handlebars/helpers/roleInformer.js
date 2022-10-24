const roleInformer = (role) => {
  const  rolDefinition = role ? 'Administrador' : 'Usuario'
  return rolDefinition
};

module.exports = roleInformer