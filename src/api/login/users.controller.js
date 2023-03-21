const { login, register } = require('./users.service')
const to = require('await-to-js').default;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const [err, result] = await to(login(email, password));
  if (err) {
    return res.status(500).json({
      success: err.message,
    });
  }

  if (!result) {
    return res.status(401).json({
      success: result
    });
  }
  return res.status(200).json({
    success: result,
  });
}

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const [err, result] = await to(register(email, password));

  if (err) {
    return res.status(400).json({
      success: err.message,
    });
  }

  return res.status(201).json({
    success: result,
  });
}

module.exports = {
  loginUser,
  registerUser,
};