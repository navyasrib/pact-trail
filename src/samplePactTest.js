const path = require('path');
const chai = require('chai');
const Pact = require('pact');
const chaiAsPromised = require('chai-as-promised');
const wrapper = require('@pact-foundation/pact-node');
const sampleData = require('./SampleData');

const expect = chai.expect;

describe('Pact', () => {


    let provider;
    before(() => {
        provider = Pact({
            consumer: 'My Consumer',
            provider: 'Posts Provider',
            port: 9896,
            log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
            logLevel: 'INFO',
            dir: path.resolve(process.cwd(), 'pacts')

        });
        provider.setup();
    });

    after(() => {
        provider.finalize();
    });


    const reqBody = {
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
    };

    const expectedResponseBody = {
        metadata: {
            uuid: "12345"
        }
    };
    describe("test ", () => {
        before(() => {
            // Start mock server
            // Add interactions
            return provider.addInteraction({
                    state: 'should post sample data', //verify pact based on state-->provider
                    uponReceiving: 'posts sample data',
                    withRequest: {
                        method: 'POST',
                        path: '/sample/xyz/pid/8877/uid/3',
                        headers: {'Content-Type': 'application/json'},
                        body: reqBody
                    },
                    willRespondWith: {
                        status: 201,
                        headers: {'Content-Type': 'application/json'},
                        body: expectedResponseBody
                    }
                })

        });

// Verify service client works as expected
        it('successfully posts sample data', async () => {
            const result = await sampleData();
            expect(result).to.deep.equal(expectedResponseBody);
        });

        it('successfully verifies', () => provider.verify())
    });


});


// after(() => {
//     // Write pact files
//     console.log(path.resolve(__dirname, '../../../pacts'))
//     var opts = {
//         pactFilesOrDirs: [path.resolve(__dirname, '../../../pacts')],        // Array of local Pact files or directories containing them. Required.
//         pactBroker: 'https://elabor8.pact.dius.com.au/',            // URL to fetch the provider states for the given provider API. Optional.
//         pactBrokerUsername: 'sSR6cB6Jt8UE8dyx5pc5QD7V8x2Of',    //    Username for Pact Broker basic authentication. Optional
//         pactBrokerPassword: "krnrmVVeYYDEMmjeysh8r8GoK0iktOm",
//         consumerVersion: '1.0.0'        // A string containing a semver-style version e.g. 1.0.0. Required.
//     };
//
//     wrapper.publishPacts(opts).then(function () {
//         // do something
//     });
//
//     provider.finalize().then(() => {
//         wrapper.removeAllServers()
//     })
// });
