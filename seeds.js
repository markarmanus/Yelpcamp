var mongoose = require("mongoose");
var Campground = require("./models/campground");
var data = [
    {name:"Cloud's Rest",image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg",description:" Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {name:"Deseret Masa",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    {name:"caiyan floor",image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",description:"bla bla blaLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
];
var Comment =  require("./models/comment");
function seedDb() {
    Comment.remove({},function(err){
        if(!err){
        console.log("comment deleted");
        }
            
        });
    Campground.remove({},function(err){
    if (err){
        console.log(err);
        
    } else{
        console.log("removed campgrounds");
    }
        data.forEach(function(camp){
            Campground.create(camp,function(err,campground){
                if (err){
                    console.log(err);
                } else{
                    console.log("added campground");
                }
                Comment.create({
                    text:"i wish it was much better than this man so bad discusting",
                    author:"mark Armanious"
                },function(err,comment){
                    if (err){
                        console.log(err);
                    } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("comment created");
                    }
                })
             }); 
        });
    });


}

module.exports = seedDb;


