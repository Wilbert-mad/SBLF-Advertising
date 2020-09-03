const userSchema = require('./user.js');

const getOrCreateUser = async (userKey) => {
  const data = await userSchema.findOne({ userID: userKey });
  if (data) {
    return data;
  } else {
    await userSchema.create({ userID: userKey });
    return null;
  }
};

const insert = async (userKey) => {
  const user = await getOrCreateUser(userKey);
  if (user) {
    const ads = user.get('advertisements');
    console.log(ads);
  } else return false;
};

module.exports = {
  insert,
  getOrCreateUser
};
