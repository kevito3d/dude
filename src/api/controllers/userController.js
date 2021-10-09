const user = require('../models/users');
const institution = require('../models/institution');
class userController {
    async saveuser(_user) {
      try {
        var user = new user(_user);
        await user.save();
        nodemailer.sendConfirmationEmail(
          _user.name,
          _user.lastname,
          _user.mail,
          _user.confirmationCode
        );
        return "OK";
      } catch (error) {
        console.log(error)
        return error;
      }
    }
  
    async finduser(_id, _mail, _token) {
      var user;
      try {
        if (_id != null) {
          //objectIduser = ObjectId(_id);
          user = await user.findById(_id);
        } else if (_token != null) {
          user = await user.findOne({ confirmationCode: _token });
          
        } else {
          user = await user.findOne({ mail: _mail });
        }
        return user;
      } catch (error) {
        //return 0
        return { error: error };
      }
    }
  
    async deleteuser(_id) {
      try {
        await user.findOneAndDelete({ _id: _id });
        return { res: "ok" };
      } catch (error) {
        return { error: error };
      }
    }
    async changeuser(_id, _update) {
      try{
        await user.findByIdAndUpdate({_id}, _update);
        return 'OK'
      }catch(error){
        console.log(error)
        return error
      }
    }
  }
  
  module.exports = userController;
