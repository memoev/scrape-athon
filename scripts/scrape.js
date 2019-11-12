// scraping
// ========

var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("http://www.elsalvador.com", function(err, res, body) {
        
        var $ = cheerio.load(body);
        var articles = [];
        // console.log(body);
        
        $(".secondary").each(function(i, element) {
            
            console.log("found!");
            var head = $(this).children(".detail-content").children(".main").children("a").text().trim();
            console.log(head);
            
            var sum = $(this).children(".detail-content").children("p").text().trim();
            console.log(sum);
            
            if(head && sum) {
                
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
    
                var dataToAdd = {
                    headline: headNeat, 
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;