/**
 **
 **
 **/

var mongooose = require('mongoose');

//Require custom modules
var User = require('../models/User');

module.exports = function(swagger) {

  var user = {};

  user.index = {
    'spec': {
      "description": "Operations about users",
      "path": "/users",
      "notes": "Returns list of all users present in system",
      "summary": "List users",
      "method": "GET",
      "parameters": [],
      "type": "User",
      "errorResponses": [],
      "nickname": "getUsers"
    },
    'action': function(req, res) {

      User.find({}, function(err, users) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });
        }

        return res.json(users);

      });

    }
  }
  user.create = {
      'spec': {
        "description": "Operations about users",
        "path": "/users",
        "notes": "Creates new user",
        "summary": "Adds user to the database",
        "method": "POST",
        "parameters": [swagger.bodyParam("name", "Name of User", "string"),
          swagger.bodyParam("address", "Address of User", "string"),
          swagger.bodyParam("contactNumber", "Contact Number of User", "number")
        ],
        "type": "User",
        "errorResponses": [],
        "nickname": "addUser"
      },
      'action': function(req, res) {

        var user = new User(req.body);

        user.save(function(err, user) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error"
            });
          }

          return res.json(user);
        });

      }
    },
    user.read = {
      'spec': {
        "description": "Operations about users",
        "path": "/users/{id}",
        "notes": "Returns user whose id is passed as URL param",
        "summary": "Returns user by ID",
        "method": "GET",
        "parameters": [swagger.pathParam("id", "ID of User", "string")],
        "type": "User",
        "errorResponses": [],
        "nickname": "getUser"
      },
      'action': function(req, res) {

        User.findById(req.params.id, function(err, user) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error"
            });
          }

          if (user) {
            return res.json(user);
          } else {
            return res.status(404).json({
              success: true,
              message: "User Not Found"
            });
          }

        });

      }
    },
    user.update = {
      'spec': {
        "description": "Operations about users",
        "path": "/users/{id}",
        "notes": "Updates user whose id is passed as URL param",
        "summary": "Updates user",
        "method": "PUT",
        "parameters": [swagger.pathParam("id", "ID of User", "string"),
          swagger.bodyParam("name", "Name of User", "string"),
          swagger.bodyParam("address", "Address of User", "string"),
          swagger.bodyParam("contactNumber", "Contact Number of User", "number")
        ],
        "type": "User",
        "errorResponses": [],
        "nickname": "updateUser"
      },
      'action': function(req, res) {

        User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error"
            });
          }

          if (user) {
            return res.json({
              success: true,
              message: "User updated successfully"
            });
          } else {
            return res.status(404).json({
              success: true,
              message: "User Not Found"
            });
          }

        });

      }
    },
    user.delete = {
      'spec': {
        "description": "Operations about users",
        "path": "/users/{id}",
        "notes": "Deletes user whose id is passed as URL param",
        "summary": "Deletes user",
        "method": "DELETE",
        "parameters": [swagger.pathParam("id", "ID of User", "string")],
        "type": "User",
        "errorResponses": [],
        "nickname": "deleteUser"
      },
      'action': function(req, res) {

        User.findByIdAndRemove(req.params.id, function(err, user) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal Server Error"
            });
          }

          if (user) {
            return res.json({
              success: true,
              message: "User deleted successfully"
            });
          } else {
            return res.status(404).json({
              success: true,
              message: "User Not Found"
            });
          }

        });

      }
    }

  return user;
}