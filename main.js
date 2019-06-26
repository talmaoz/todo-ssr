
const ansService = require('./services/ans.service')

console.log('Hi Node!!!');

ansService.getAns()
    .then(ans => console.log(ans))

