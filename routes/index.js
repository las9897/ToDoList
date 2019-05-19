// routes/index.js

var moment = require("moment");
var ObjectId = require("mongodb").ObjectID;

module.exports = function(app, Todo) {
  app.get("/todo", function(req, res) {
    Todo.find(function(err, todos) {
      if (err) return res.status(500).send({ error: "database failure" });
      res.render("index", { todos: todos, moment });
    });
  });

  app.post("/todo/add", function(req, res) {
    var todo = new Todo();
    todo.title = req.body.title;
    if (todo.title == "" || todo.title == null) {
      res.json({ result: 0, error: "Title Valiation Error", message: "Please input title" });
      return;
    }
    todo.content = req.body.content;

    if (req.body.deadline != "") {
      var split_deadline = req.body.deadline.split("-");
      if (split_deadline.length != 2) {
        return res.json({result: 0, error: "Deadline Validation Error", message: "Please according to the format MM(1~12)-DD(1~31)"   });
        
      }
      if (
        split_deadline[0] < 1 ||
        split_deadline[0] > 12 ||
        split_deadline[1] < 1 ||
        split_deadline[1] > 31
      ) {
        return res.json({ result: 0, error: "Deadline Validation Error", message: "Please according to the format MM(1~12)-DD(1~31)" });
      }
      req.body.deadline = (new Date().getFullYear())+"-"+ req.body.deadline;
    }

    todo.deadline = req.body.deadline
    todo.priority = req.body.priority;
    todo.complete = req.body.complete;

    todo.save(function(err) {
      if (err) {
          console.log(err);
          
        return res.json({ result: 0, error: "Todo add fail" ,message: "Please Retry"  });
        
      }
      res.json({ result: 1 });
    });
  });

  app.put("/todo/complete", function(req, res) {
    Todo.updateOne(
      { _id: ObjectId(req.body._id) },
      { $set: { complete: req.body.complete } },
      function(err, result) {
        if (err) return res.json({ result: 0, error: "Todo complete fail" ,message: "Please Retry"  });
        res.json({ result: 1 });
      }
    );
  });

  app.delete("/todo/delete", function(req, res) {
    Todo.deleteOne({ _id: ObjectId(req.body._id) }, function(err, result) {
      if (err) return res.json({ result: 0, error: "Todo delete fail" ,message: "Please Retry" });
      res.json({ result: 1 });
    });
  });

  app.patch("/todo/patch", function(req, res) {
    if (req.body.title == "" || req.body.title == null) {
        return res.json({ result: 0, error: "Title Valiation Error", message: "Please input title" });
      }
      if (req.body.deadline != "") {
        var split_deadline = req.body.deadline.split("-");
        if (split_deadline.length != 2) {
          return res.json({result: 0, error: "Deadline Validation Error", message: "Please according to the format MM(1~12)-DD(1~31)"   });
          
        }
        if (
          split_deadline[0] < 1 ||
          split_deadline[0] > 12 ||
          split_deadline[1] < 1 ||
          split_deadline[1] > 31
        ) {
          return res.json({ result: 0, error: "Deadline Validation Error", message: "Please according to the format MM(1~12)-DD(1~31)" });
          
        }
        req.body.deadline = (new Date().getFullYear())+"-"+ req.body.deadline;
      }

    Todo.updateOne(
      { _id: ObjectId(req.body._id) },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          deadline: req.body.deadline,
          priority: req.body.priority,
          complete: req.body.complete
        }
      },
      function(err, result) {
        if (err) {
          return res.json({ result: 0, error: "Todo update fail" , message: "Please Retry" });
        }
        res.json({ result: 1 });
      }
    );
  });
};
