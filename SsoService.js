function SsoService({ authenticator, dataProvider }) {
  this.authenticator = authenticator;
  this.dataProvider = dataProvider;
}

SsoService.prototype.login = function (npwp, password) {
  const user = this.dataProvider.getUser(npwp);
  const authenticated = this.authenticator(npwp, password, user);
  if (authenticated) {
    const returnedUser = { ...user };
    delete returnedUser.password;
    return returnedUser;
  } else {
    return false;
  }
};

module.exports = SsoService;
