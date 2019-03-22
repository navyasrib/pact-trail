var Request = require("request");

module.exports = function () {
    return new Promise((resolve, reject) => {
         Request.post({
            "headers": {"content-type": "application/json"},
            "url": "http://localhost:8988/sample/xyz/pid/8877/uid/3",
            "body": JSON.stringify({
                "metadata": {
                    "installationid": "sone id",
                    "tenantid": "some id"
                },
                "data": {
                    "status": 21,
                    "code": "dba51f895c8b6bd1",
                    "uid": 5,
                    "lfdn": 0,
                    "last_page": 0,
                    "date_of_first_mail": "2019-03-15T06:10:21.167Z",
                    "date_of_first_access": "2019-03-15T06:10:21.167Z",
                    "sid": 8856,
                    "tester": 0,
                    "number_of_mails": 0,
                    "pid": 8855,
                    "iteration": 1,
                    "participation_id": 1,
                    "date_of_remind": "2019-03-15T06:10:21.167Z",
                    "page_mark": 2,
                    "extern_url": "url",
                    "date_of_expire": "2019-03-15T06:10:21.167Z"
                }
            })
        }, (error, response, body) => {
            if (error) {
              reject(error);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
};

