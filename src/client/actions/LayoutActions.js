import { dispatch, dispatchAsync } from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {

    /**
     * get the profile from auth0
     */
    getProfileUser: (token, auth0, callback) => {
        let profile;
        let isAdmin;

        auth0.getProfile(token, (error, userDetail) => {
            if (error) {
                callback(error);
            } else {
                profile = userDetail;

                _.map(userDetail.app_metadata.roles, role => {
                        if (_.isEqual(role, 'admin')) {
                            isAdmin = true;
                        }
                });

                dispatch(ActionTypes.LOGIN_USER, {profile , isAdmin });
                callback();
            }
        });
    },

    logUserOut: () => {
        dispatch(ActionTypes.LOGOUT_USER, {});
    }

}
