//db
const db = require("./mysql");

//express
const app = require("./express");

//routes

//gets
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/getbookmarks/:cat", (req, res) => {
  db.query(
    `select cat.category,b.ID,u.firstname,u.lastname,b.title,b.created_at,b.url from bookmarks as b
      inner join categories as cat on cat.ID=b.category
      inner join users as u on u.ID=b.creator
      where cat.category="${req.params.cat}"`,
    (err, result, fields) => {
      res.json(result);
    }
  );
});
app.get("/userbookmarks/:userid", (req, res) => {
  db.query(
    `SELECT u.firstname,u.lastname,b.title,b.ID,cat.category,b.created_at FROM bookmarks as b
    inner join categories as cat on cat.ID=b.category 
    inner join users as u on u.ID=1 
    where b.creator=${req.params.userid}`,
    (err, result, fields) => {
      res.send(result);
    }
  );
});
app.get("/getfavbookmarks/:userid", (req, res) => {
  db.query(`select b.ID,title,u.firstname,u.lastname,b.description,b.url,b.created_at,cat.category from faved_bookmarks as fb 
  inner join bookmarks as b on b.ID=fb.bookmark_id
  inner join users as u on u.ID=b.creator
  inner join categories as cat on cat.ID=b.category
  where fb.user_id=${req.params.userid}`,(err,result)=>{
    if (err) return res.send({error:err.errno})
    return res.send(result)
  });
});
app.get("/login", (req, res) => {
  let loginInfo = {};
  db.query(
    `Select firstname,lastname,ID,email from users 
    where email="${req.query.email}" and password="${req.query.password}"`,
    (err, result, fields) => {
      if (err) return res.send({ error: err.errno });
      if (result.length > 0) {
        loginInfo.user = result[0];
        db.query("select id,bookmark_id from faved_bookmarks where user_id=?", [loginInfo.user.ID], (err, result) => {
          if (err) return res.send({ error: err.errno });
          loginInfo.likedBookmarks = result;
          db.query("select ID from bookmarks where creator=?", [loginInfo.user.ID], (err, result) => {
            if (err) return res.send({ error: err.errno });
            loginInfo.userBookmarks = result;
            return res.send(loginInfo);
          });
        });
      }
    }
  );
});
app.get("/getcategories", (req, res) => {
  db.query("select * from categories", (err, result) => {
    if (err) return res.send({ error: err.errno });
    return res.send(result);
  });
});
app.get("/getbookmark/:bookmarkid",(req,res)=>{
  db.query(`select ID,title,url,description,category from bookmarks as b
  where b.ID=?`,[req.params.bookmarkid],(err,result)=>{
    if(err) return res.send({error:err.errno})
    return res.send(result[0])
  })
})

//deletes
app.delete("/removelike", (req, res) => {
  let del = db.query("delete from faved_bookmarks where user_id=? and bookmark_id=?", [req.body.user_id, req.body.bookmark_id], (err, result) => {
    if (err) return res.send({ error: err.errno });
    return res.sendStatus(200);
  });
  console.log(del.sql);
});
app.delete("/deletebookmark/:bookmarkid", (req, res) => {
  db.query(`delete from bookmarks where ID=${req.params.bookmarkid}`, (err, result, fields) => {
    res.send(result);
  });
});

//posts
app.post("/like", (req, res) => {
  let qParams = [
    ["user_id", "bookmark_id"],
    [req.body.user_id, req.body.bookmark_id],
  ];
  db.query("insert into faved_bookmarks(??) values (?)", qParams, (err, result) => {
    if (err) return res.send({ error: err });
    return res.status(201).send({ insertId: result.insertId });
  });
});
app.post("/register", (req, res) => {
  let user = [[req.body.firstname, req.body.lastname, req.body.email, req.body.hashedPassword]];
  db.query(`insert into users(firstname,lastname,email,password) values ?`, [user], (err, result) => {
    if (err) return res.send({ error: err.errno });
    return res.status(201).send({ ID: result.insertId });
  });
});
app.post("/addbookmark", (req, res) => {
  let values = ["title", "description", "url", "category", "creator"];
  let bookmark = [req.body.title, req.body.description, req.body.url, req.body.category, req.body.creator];
  db.query("insert into bookmarks(??) values(?)", [values, bookmark], (err, result, fields) => {
    if (err) return res.send({ error: err, result: result, fields: fields });
    return res.sendStatus("201");
  });
});

//patch
app.patch("/editbookmark/:id",(req,res)=>{
  let update={
    title:req.body.title,
    url:req.body.url,
    description:req.body.description,
    category:req.body.category,
}
  let q=db.query(`update bookmarks set ? where ID=${req.body.ID}`,update,(err,result)=>{
    if(err) return res.send({err:err.errno})
    return res.sendStatus(200)
  })
})
app.patch("/updateuser",(req,res)=>{
  let userData={
    firstname:req.body.userData.firstname,
    lastname:req.body.userData.lastname,
    email:req.body.userData.email,
  }
  if(req.body.userData.password!=undefined){
    userData.password=req.body.userData.password
  }
  let q=db.query(`update users set ? where ID=${req.body.ID}`,userData,(err,result)=>{
    if(err) return res.send({error:err.errno})
    return res.sendStatus(200)
  })
  console.log(q.sql);
})
