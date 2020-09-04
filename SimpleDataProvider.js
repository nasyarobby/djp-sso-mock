function SimpleDataProvider(config) {
  let jsonFile = config && config.jsonFile;
  if (!require("fs").existsSync(jsonFile)) jsonFile = "";
  this.data = jsonFile ? require(jsonFile) : [{ npwp: "123", password: "abc" }];
}

SimpleDataProvider.prototype.getUser = function (npwp) {
  const user = this.data.filter((u) => u.npwp === String(npwp));
  if (user.length > 0) return user[0];
  else return undefined;
};

module.exports = SimpleDataProvider;
