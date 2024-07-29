// controllers/cars.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab


router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      res.locals.user = currentUser;
      res.render('cars/index.ejs', {
        user: currentUser,
        pantry: currentUser.pantry,
      })
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })





// controllers/car.js

router.get('/new', (req, res) => {
    res.render('cars/new.ejs', { user: req.session.user });
  });

// controllers/cars.js`

router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
  
      req.body.date = new Date(req.body.date)

      currentUser.pantry.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/cars`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  



  router.get('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      const car = currentUser.pantry.id(req.params.itemId)
      res.render('cars/show.ejs', {
        car,
      })
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })
  
  // controllers/cars.js
//delete
router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
      currentUser.pantry.id(req.params.itemId).deleteOne();
   
       // Save changes to the user
      await currentUser.save();
      // Redirect back to the cars index view
      res.redirect(`/users/${currentUser._id}/cars`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/')
    }
  });



  // controllers/cars.js

// مسار GET لعرض صفحة تحرير العنصر
router.get('/:itemId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const car = currentUser.pantry.id(req.params.itemId);
      res.render('cars/edit.ejs', {
        car: car,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  // مسار PUT لتحديث العنصر
  router.put('/:itemId', async (req, res) => {
    try {
      // ابحث عن المستخدم من req.session
      const currentUser = await User.findById(req.session.user._id);
      // ابحث عن العنصر الحالي من خلال المعرف الذي تم توفيره في req.params
      const car = currentUser.pantry.id(req.params.itemId);
      // استخدم طريقة Mongoose .set()
      // هذه الطريقة تقوم بتحديث العنصر الحالي ليعكس البيانات الجديدة في `req.body`
      car.set(req.body);
      // احفظ المستخدم الحالي
      await currentUser.save();
      // أعد التوجيه مرة أخرى إلى عرض العنصر الحالي
      res.redirect(`/users/${currentUser._id}/cars/${req.params.itemId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  module.exports = router;
  
