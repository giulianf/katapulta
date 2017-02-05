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
    constructor( user_id, status, createDate) {
            this.user_id= user_id;
            this.status = status;
            this.createDate = createDate;
    }

    toLog() {
        return 'user_id: ' + this.user_id + ' status: ' + this.status + ' createDate ' + this.createDate ;
    }
}
