const partners = require("../data/partner.json"); 


function matchPartners({ location, requiredServices }) {
    return partners
        .filter(p => p.location.toLowerCase() === location.toLowerCase())
        .filter(p => requiredServices.some(service => p.services.includes(service)))
        .sort((a, b) => a.emissionScore - b.emissionScore); // lower score = better
}

module.exports = { matchPartners };
