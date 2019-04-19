module.exports = (dbPool) => {


  // `dbPoolInstance` is accessible within this function scope


        //all comments for the  owner_user
        const allComments = (dataIn, callback) => {
            // console.log('INSIDE QUERYYY')
            // console.log(dataIn);
            // dataIn should give me the username of the profile page
            let query = `SELECT * FROM comments_userid WHERE owner_username = '${dataIn.username}'`;

            dbPool.query(query, ( err, r )=>{
                if( err ){
                    console.log( "Error!", err );
                } else {

                    const user = r.rows
                    callback( user );
                }
            })
        };

        const add = (dataIn, callback) => {
            //ADD DATE CREATED
            console.log("HOW TO SHAKE IT", dataIn);

            let queryInsert = `INSERT into comments_userid
                               (comments , comment_from_userid , owner_username)
                               VALUES ($1, $2, $3)
                               RETURNING *`;

            let valuesInsert = [dataIn.comment, dataIn.userId, dataIn.profileView];

            dbPool.query(queryInsert, valuesInsert, ( err, resultInsert) => {
                if( err ){
                    console.log( "Error!", err );
                } else {
                    console.log(resultInsert);
                    callback(resultInsert);
                }
            })


        }


        //usernams of all the user_id commenting



  return {

    allComments: allComments,
    add: add,
  };
}


  /**
   * ===========================================
   * Helper Functions
   * ===========================================
   */


var currentDateAndTime = function(){
    let date = new Date();
    let dateAndTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ` + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return dateAndTime;
}