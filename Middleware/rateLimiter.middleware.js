const rateLimit = require('express-rate-limit')

const limiter=rateLimit({
    windowMs:60*1000,
    max:10,
    message:"Max Request Limit Has Been Exceeded"
});



module.exports={
    limiter
}