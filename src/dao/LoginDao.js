import _ from 'lodash';
import { error, debug, info, getYear, addYear, getBelgiumDate} from '../common/UtilityLog';
import async from 'async';
import request from 'request';

export class LoginDao {
    constructor() {

    }


    /**
     * getBasicInfo - Get Basic Info by User id
     *
     * @param  {type} res  description
     * @param  {type} user description
     * @return {type}      description
     */
    forgetUser(res, _mongodb, user, token) {
        info('Entering forgetUser() data: ' + JSON.stringify( user ) );

         try {
             const email = user.username;
             const pass = user.passConfirm;

             const clients = _mongodb.collection('clients');

            async.series([
                (callback) => {
                    const url = `https://${process.env.AUTH_AUDIENCE}/api/v2/users/${user.user_id}`
                    // const url = `https://${process.env.AUTH_AUDIENCE}/dbconnections/change_password`
                    debug('url ' + url);
                    request.post(
                    {
                      url: url,
                      body: {password: user.passConfirm},
                      headers: {
                         'Authorization': 'Bearer ' + token
                     },
                      json: true
                    },
                    (err, response, body) => {
                      if(err){
                         callback(err);
                         return;
                      }
                      info('response statusCode' + response.statusCode);
                    }
                  );
                }
            ], (err) => {
                error("Unable to forgetUser. " , err);
                //   When it's done
                if (err) {
                    res.status(500).json(err);
                    return;
                }
            });
        } catch( e ) {
            error('error: ' + e);
            res.status(500).send('Problème pendant la récupération des infos. ' + e.message);
        }
    }
}
