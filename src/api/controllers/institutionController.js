const institution = require('../models/institution');

class IntitutionController {
    /* async saveIntitution(_Intitution) {
      try {
        var Intitution = new Intitution(_Intitution);
        await Intitution.save();
        nodemailer.sendConfirmationEmail(
          _Intitution.name,
          _Intitution.lastname,
          _Intitution.mail,
          _Intitution.confirmationCode
        );
        return "OK";
      } catch (error) {
        console.log(error)
        return error;
      }
    } */

     findIntitution(_id) {
        var Intitution;
        try {
            if (_id != null) {
                //objectIdIntitution = ObjectId(_id);
                Intitution =  institution.findById(_id)
            }
            return Intitution;
        } catch (error) {
            //return 0
            return {
                error: error
            };
        }
    }

    /* async deleteIntitution(_id) {
      try {
        await Intitution.findOneAndDelete({ _id: _id });
        return { res: "ok" };
      } catch (error) {
        return { error: error };
      }
    }
    async changeIntitution(_id, _update) {
      try{
        await Intitution.findByIdAndUpdate({_id}, _update);
        return 'OK'
      }catch(error){
        console.log(error)
        return error
      }
    } */
}

module.exports = {
    IntitutionController
}