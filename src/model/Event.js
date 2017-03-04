import _ from 'lodash';

export class Event {

    /**
     * constructor - description
     *
     * @param  {type} user_id    description
     * @param  {string} status     description
     * @param  {date} createDate description
     * @return {type}            description
     */
    constructor( user_id, email, status, body, createDate) {
            this.user_id= user_id;
            this.email= email;
            this.status = status;
            this.body = body;
            this.createDate = createDate;
    }

    toLog() {
        return 'user_id: ' + this.user_id + ' email: ' + this.email + ' status: ' + this.status + ' createDate ' + this.createDate ;
    }
}
