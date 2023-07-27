const db = require('../models/index');
const User = db.User;
// const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { email, password, address, picture } = req.body;

    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Créer un nouvel utilisateur dans la base de données
    const newUser = await User.create({ email, password, address, picture });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.loginUser = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
        console.log('user not found');
        return res.status(404).send({
            message: 'user not found'
        });
    }

    if (req.body.password !== user.password) {
        console.log('user');
        return res.status(400).send({
            message: 'invalid credentials'
        });
    }

    const jwtKey = "my_secret_key";
    const jwtExpirySeconds = 300;
    let payload = { id: user.email };
    let token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: Number.MAX_SAFE_INTEGER,
    });
    console.log("c'est le login qui a été push", payload);
    console.log(token);
    res.json({ "token": token, "maxAge": jwtExpirySeconds * 1000 });
}

// Fonction pour obtenir la liste de tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour obtenir un utilisateur par son identifiant
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour mettre à jour un utilisateur par son identifiant
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { email, password, address, picture } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mettre à jour les attributs de l'utilisateur
    userToUpdate.email = email;
    userToUpdate.password = password;
    userToUpdate.address = address;
    userToUpdate.picture = picture;

    // Sauvegarder les modifications dans la base de données
    await userToUpdate.save();

    res.status(200).json({ message: 'User updated successfully!', user: userToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour supprimer un utilisateur par son identifiant
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Supprimer l'utilisateur de la base de données
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
