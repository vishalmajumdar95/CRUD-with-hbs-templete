module.exports = {
    insert: (conn, userData) => {
        return new Promise(function(resolve, reject) {
            conn.query(`INSERT INTO user set ?`, [userData], function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    },

    update: (conn, userData, user_id) => {
        return new Promise(function(resolve, reject) {
            conn.query(`UPDATE user set ? WHERE id = ?`, [userData, user_id], function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    },

    delete: (conn, user_id) => {
        return new Promise(function(resolve, reject) {
            conn.query(`DELETE FROM user WHERE id = ?`, [user_id], function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    },


    list: (conn, user_id = false) => {
        return new Promise(function(resolve, reject) {
            let query = `
                SELECT 
                    * 
                FROM 
                    user
            `
            if (user_id) {
                query += ` WHERE id = ${user_id}`
            }
            conn.query(query, function(error, rows) {
                if (error) {
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}