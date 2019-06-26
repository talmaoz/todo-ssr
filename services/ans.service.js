
const axiush = require('axios');

function getAns() {
    return axiush.get(`https://yesno.wtf/api`)
        .then(res => res.data)

}


module.exports = {
    getAns
}