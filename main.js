let frases = ['Nice one!', 'Ooof, right in the face', 'Greenpeace gonna loooove this', "Darling, you're making history", 'Iconoclast!!!!!!!', 'Today, soup is being served..... oddly','Who cares about art anyway', 'Try pumpkin soup next time!', "You're on the Europe's most wanted List!!!!!"]

$(document).ready(function(){


    var getArtworkList = function(){
        let randomArt = Math.floor((Math.random() * 124) + 1);
        let artId = 0;
        console.log(randomArt);
        fetch( "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&departmentId=11&q=painting")
        .then((response) => response.json())
        .then((json) => { 
            console.log(json.objectIDs[randomArt]);
            artId = json.objectIDs[randomArt];
            getArtwork(artId);
        })
        .catch((error) => {
            console.error('Error:', error);
          });
        }
getArtworkList();

$('.child').click(function(event) {
        let x = event.pageX;
        let y = event.pageY;
        let splash = $('#splash');
        console.log(splash);
        console.log(splash.height, splash.width);
        splash.css("display","");
        splash.css("left", (x-300)+"px");
        splash.css("top",(y-235)+"px");
        splash.css("transform","rotate("+ Math.floor((Math.random() * 359) + 1) +"deg)");
        $('#message').html(
            '<p class="comment">' + frases[Math.floor((Math.random() * 9))] + '</p>');

    });

var getArtwork = function(artId){
    $('.comment').css("display","none");
    $('#splash').css("display","none");
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/"+ artId)
    .then((response) => response.json())
    .then((json) => { 
        $('#artframe').html(
        '<img id="artwork" src="'
        +json.primaryImageSmall+
        '"/><h2 class="title">' + json.title + '</h2><h2 class="author">' + json.artistDisplayName + ' , ' +json.objectDate + '</h2>');
        })
        .catch((error) => {
            console.error('Error:', error);
          });
        }


 $('#newArt').click(getArtworkList);
 });

