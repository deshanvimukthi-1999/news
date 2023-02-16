import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT * FROM posts";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};


export const addPost = (req, res) => {
 
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
};

export const deletePost = (req, res) => {

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? ";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
 
};


export const updatePost = (req, res) => {
 

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? ";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img, 
      req.body.cat
    ];

    db.query(q, [...values, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
 
};