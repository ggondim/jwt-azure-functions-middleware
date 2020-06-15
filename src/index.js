const jwt = require('jsonwebtoken');

module.exports = {
  isValid,
};

async function isValid(context, stop) {
  try {
    if (context.req.query.access_token) {
      const token = context.req.query.access_token;
      await jwt.verify(token, process.env.jwt_key, (err, decoded) => {
        if (err) { 
          context.res = {status: 500, body: { status:500, message: "access_token inválido"}};
          return stop;
        }
      })
    } else {
      context.res = {status: 401, body: { status:401, message: "access_token não informado"}};
      return stop;
    }
  } catch (error) {
    return stop;
  }
};