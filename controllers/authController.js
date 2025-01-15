const { auth } = require("../firebaseConfig");
const { supabase } = require("../supabaseConfig");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

exports.getLogin = async (req, res) => res.render("auth/login");
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    res.cookie("token", token);
    res.redirect("/home");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

exports.getRegister = async (req, res) => res.render("auth/regis");
exports.postRegister = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    fullname,
    phone,
    position,
    address,
    city,
    gender,
  } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .send("Error: Password and Confirm Password do not match");
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const { error: supabaseError } = await supabase.from("users").insert({
      email: email,
      fullname: fullname,
      phone: phone,
      position: position,
      address: address,
      city: city,
      gender: gender,
    });

    if (supabaseError) {
      throw new Error(
        "Error saving data to Supabase: " + supabaseError.message
      );
    }

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
