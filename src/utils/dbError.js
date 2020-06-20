class DbError extends Error {
    constructor(message , errorCode){
        super(message);
        this.errorCode = errorCode || 500 ;
    }
    errorCode(){
        return this.errorCode;
    }

}
module.exports = DbError;
