import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import auth from "../middleware/auth";

const router = express.Router();

// @route   GET api/users/
// @desc    Get all users
// @access  Public -> Private
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   Get api/email
// @desc    check if email exist
// @access  Public -> Private
router.get('/email/:email', async (req: Request, res: Response) => {
  try {
    const email = await User.findOne({ email: req.params.email });
    console.log(email);
    res.status(200).json(email);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   Get api/users/:id
// @desc    Get user by ID
// @access  Public -> Private
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/', 
  [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ], 
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, email, password, avatar, userType, description, promotional, acceptedTerms} = req.body;
    
    try {
      // Check to see if user exists
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
        avatar,
        userType,
        description,
        promotional,
        acceptedTerms
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      const savedUser = await newUser.save();
      
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
});

// @route   PUT api/users
// @desc    Update user
// @access  Private
// router.put('/:id', auth, async (req: Request, res: Response) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, {
//       $set: req.body,
//     });
//     const userUpdated = await User.findById(req.params.id);
//     res.status(201).json(userUpdated);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// @route   PUT api/users
// @desc    Update self user
// @access  Private
router.put('/', auth, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
    await User.findByIdAndUpdate(req.body.user.id, {
      $set: req.body,
    });

    const userUpdated = await User.findById(req.body.user.id);

    res.status(201).json(userUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// @route   DELETE api/users
// @desc    Delete user from database.
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.user.id });

    res.status(200).json('Account has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;