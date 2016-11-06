import { EventEmitter } from 'events';
import { register } from 'appDispatcher';

export default class BaseStore extends EventEmitter {

    constructor() {
        super();
        this.CHANGE_EVENT = 'CHANGE';
    }

    subscribe(actionSubscribe) {
        this._dispatchToken = register(actionSubscribe());
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    emitChange() {
        this.emit(this.CHANGE_EVENT);
    }

    addChangeListener(cb) {
        this.on(this.CHANGE_EVENT, cb)
    }

    removeChangeListener(cb) {
        this.removeListener(this.CHANGE_EVENT, cb);
    }

}
