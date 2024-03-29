loginStatusCheck(() => { }, () => { flushRightPage("introduction-in.html") })
document.insertPoints = initInsertPoints()
// InitDivPosition()
flushRecommendation()
flushActivities()
showNavBackground(true)

function insertRecommendation(title, subtitle, description, bottomline, imgurl, redirect = "#") {
    try {
        var rawhtml = "<div class=\"cards\"><div class=\"mdc-card info-card\"><div class=\"mdc-card__primary-action info-card__primary-action\" tabindex=\"0\" onclick=\"top.location='#redirect'\"><div class=\"mdc-card__media mdc-card__media--16-9 info-card__media\"style=\"background-image: url(&quot;$img$&quot;);\"></div><div class=\"info-card__primary\"><h2 class=\"info-card__title mdc-typography mdc-typography--headline6\">$title$</h2><h3 class=\"info-card__subtitle mdc-typography mdc-typography--subtitle2\">$subtitle$</h3></div><div class=\"info-card__secondary mdc-typography mdc-typography--body2\">$description$</div></div><div class=\"mdc-card__actions\"><div class=\"mdc-typography--body\" style=\"width: 100%;padding-right: 15px;text-align: right;\">$bottomline$</div></div></div></div>"
        document.insertPoints.exploreInCards.html(document.insertPoints.exploreInCards.html() + rawhtml.replace("<script>", "</script>").replace("$img$", imgurl).replace("$title$", title).replace("$subtitle$", subtitle).replace("$description$", description).replace("$bottomline$", bottomline).replace("#redirect", redirect))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}

function flushRecommendation() {
    getRecommendations(document.userid, document.sessionid, document.token, (recs) => {
        // console.log(recs)
        document.insertPoints.exploreInCards.html("")
        for (var x = 0; x < recs.length; x++) {
            obj = recs[x]
            // [TODO]
            switch (obj.type) {
                case "Group":
                    insertRecommendation(obj.title, obj.subtitle, obj.description, obj.bottomline, obj.imgURL, obj.groupURL)
                    break
                case "Chat":
                    insertRecommendation(obj.title, obj.subtitle, obj.description, obj.bottomline, obj.imgURL, obj.chatURL)
                    break
                case "Story":
                    insertRecommendation(obj.title, obj.subtitle, obj.description, obj.bottomline, obj.imgURL, obj.storyURL)
                    break
                default:
                    console.log("Invalid", obj)
                    insertRecommendation(obj.title, obj.subtitle, obj.description, obj.bottomline, obj.imgURL, obj.groupURL)
                    break
            }
        }
    })
}

function insertActivities(title,subtitle,description){
    rawhtml="<div class=\"act-container\"><section class=\"card\"><div class=\"card-detail\"><h3 class=\"card-title\">$title$</h3><h4 class=\"card-subtitle\">$subtitle$</h4><p class=\"card-description\">$dec$</p></div></section></div>"
    document.insertPoints.activities.html(document.insertPoints.activities.html()+rawhtml.replace("$title$",title).replace("$subtitle$",subtitle).replace("$dec$",description).replace("<script>","").replace("</script>",""))
}

function flushActivities(){
    getActivities(document.userid,document.sessionid,document.token,(d)=>{
        document.insertPoints.activities.html("")
        for(var x=0;x<d.length;x++){
            insertActivities(d[x].title,d[x].subtitle,d[x].description)
        }
        if(d.length==0){
            insertActivities("Everything is clear","","No activity was found.")
        }
    })
}

// ___DEV = () => {
//     insertRecommendation("Recommendation A", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
//     insertRecommendation("Recommendation B", "Geobraphy, History and Chemistry", "Win a special price by joining!", "3 Groups Available", "https://yyjlincoln.github.io/istweb/Media/disable.jpg", "https://yyjlincoln.github.io/istweb/Media/disable.jpg")
//     insertRecommendation("Random Stuff", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
//     insertRecommendation("Too tired", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
//     insertRecommendation("I hate testing", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
//     insertRecommendation("Okay demo ends here", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
//     insertRecommendation("Debug is below", "English, Maths and Science", "Join a competition!", "1 Group Available", "https://yyjlincoln.github.io/istweb/Media/learn.jpg", "https://yyjlincoln.github.io/istweb/Media/learn.jpg")
// }

_DEV()
// ___DEV()
// $.get("testload.html", (text) => { insertToInsertPoint("exploreInCards", text) })