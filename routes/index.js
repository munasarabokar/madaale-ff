var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var counts_active = `SELECT COUNT(id) as active FROM macaamiil WHERE status = "active"`;
  var counts_expire = `SELECT COUNT(id) as cancled FROM macaamiil WHERE status = "cancled"`;
  db.query(counts_active , function (error , act) {
    if (act.length > 0) {
      for(tiro = 0 ; tiro < act.length ; tiro ++) {
        active = act[tiro].active;
      }
    }
    db.query(counts_expire , function (error , canc) {
      if (canc.length > 0) {
        for(tiro = 0 ; tiro < canc.length ; tiro ++) {
          cancled = canc[tiro].cancled;
        }
      }
      res.render('index', { title: 'Madaale' , caaqil: 'home' , active:active , cancled:cancled });
     })

   })
});
/* GET active page. */
router.get('/active', function(req, res, next) {
  var search_active = `SELECT * FROM macaamiil WHERE status = "active" ORDER BY id DESC`;
  db.query(search_active , function(error , data) {
    res.render('index', { title: 'List Active users' , caaqil:'active' , data:data });
  })
});
/* GET expired page. */
router.get('/expired', function(req, res, next) {
    var search_active = `SELECT * FROM macaamiil WHERE status = "cancled" ORDER BY id DESC`;
  db.query(search_active , function(error , data) {
    res.render('index', { title: 'List Paid users' , caaqil:'expired' , data:data });
  })
});
/* GET View page. */
router.get('/view/:link' , function(req , res , next) {
  var link = req.params.link
   var select1 = `SELECT * FROM macaamiil WHERE link = "${link}"`
  db.query( select1, function (error , macaamiil) {
   if(error) res.redirect('404')
   if(macaamiil.length > 0)  {
     users = macaamiil[0]
   users_id = users.id
  
   var select2 = `SELECT * FROM lacagbixin WHERE user_id = "${users_id}"`
   var select3 = `SELECT * FROM faaiido WHERE user_id = "${users_id}"`
   var select4 = `SELECT * FROM kudarid WHERE user_id = "${users_id}"`
   db.query( select3, function (error , faaiidos) {
     if(error) res.send('/404')
       if (faaiidos.length > 0) {
        faaiido = faaiidos
       } else {
        faaiido = 'not found'
       }

       db.query( select2, function (error , lacag) {
        if(error) res.send('/404')
         if (lacag.length > 0) {
          lacagta = lacag 
         } else {
          lacagta = 'not found'
         }
         db.query(select4 , function (error , kudar) {
          if(error) res.send('/404')
          if (kudar.length > 0) {
            kudarid = kudar
          } else {
            kudarid = 'not found'
          }
          res.render('index' , {caaqil: 'view' , message:req.flash('success') ,  title : users.magaca , view:users , faaiido:faaiido , lacagta:lacagta , kudarid:kudarid })
         })
       })
    })
   } else {
    res.redirect('/404')
   }
  
     

  })   
})

router.post('/paid' , function(req ,res , next) {
  user_id = req.body.user_id
  lacagta = req.body.lacagta
  link = req.body.link
  data = req.body.date
  var inst = `INSERT INTO lacagbixin (user_id, lacagta, cancle, shaqo ) VALUES ("${user_id}", "${lacagta}", "haa", "0")`
  var updt = `UPDATE macaamiil SET status = 'cancled' WHERE id = ${user_id}`
  db.query(inst , function (err , ins ) {
    if(err) res.redirect('/404')
    db.query(updt , function(err , update) {
      if(err) res.redirect('/404')
      req.flash('success' , 'succ')
      res.redirect('/view/'+link)
    })
  })
})

module.exports = router;
