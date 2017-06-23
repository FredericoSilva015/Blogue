
window.onload = loadBlogue();

function loadBlogue() {

      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/5844238035868473137/posts?fetchBodies=false&fetchImages=false&orderBy=published&status=live&view=READER&key=AIzaSyAV7brZF-F8ZxonIzqova14F6jtyKZ71wc');
      xhr.onload = function() {
          if (xhr.status === 200) {
              successData(JSON.parse(xhr.responseText));
          }
          else {
              // alert('Request failed.  Returned status of ' + xhr.status);
          }
        };
      xhr.send();

  }
/*===================================================================================*/
// work the data on success event
/*===================================================================================*/
function successData(val) {
// console.log(val);
  var inf = (val),
      focus = [],
      fullList =[];

  for (var i = 0, len = inf.items.length; i < len; i++) {

      if (i < 4) {
        focus.push(inf.items[i]);
      }
        fullList.push(inf.items[i]);
  }

  buildMain(focus);
  buildList(fullList);

}
/*===================================================================================*/
// on fail event
/*===================================================================================*/
function failData() {


}
/*===================================================================================*/
// build main content
/*===================================================================================*/
function buildMain(val) {
  // console.log(val);

    var focusEle = document.getElementById("MainFocus");

    //main post in focus, with content
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/5844238035868473137/posts/'+val[0].id+'?fetchBody=true&fetchImages=true&maxComments=0&view=READER&key=AIzaSyAV7brZF-F8ZxonIzqova14F6jtyKZ71wc');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var content = JSON.parse(xhr.responseText);
            // console.log(content);
            focusEle.appendChild(buildH(content.title));
            focusEle.appendChild(buildImg(content.images));
            focusEle.appendChild(buildContent(content.content));
            focusEle.appendChild(buildLink(content.url));
        }
        else {
            // alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
    xhr.send();

    // minor post below the main
    for (var i = 1, len = val.length; i < len; i++) {
      minorPost(val[i].id,i);
    }

}
/*===================================================================================*/
// build list of all posts links
/*===================================================================================*/
function buildList(val) {
  // console.log(val);
  var listElemn = document.getElementById("list");
  for(var i = 0, len = val.length; i < len; i++){
          var li = document.createElement("li"),
              a = document.createElement("a");
          a.setAttribute('href',val[i].url);
          a.appendChild(document.createTextNode(val[i].title));
          li.appendChild(a);
          listElemn.appendChild(li);
      }
}
/*===================================================================================*/
// function to build Img tag
/*===================================================================================*/
function buildImg(val){
    // console.log(val);
      var blogImg = document.createElement("img");
      blogImg.setAttribute('src', val[0].url);

      return blogImg;
}
/*===================================================================================*/
// function to build h2 tag
/*===================================================================================*/
function buildH(val){
  // console.log(val);
      var blogHeading = document.createElement("h2");
       blogHeading.appendChild(document.createTextNode(val));
       return blogHeading;
}
/*===================================================================================*/
// function to build content
/*===================================================================================*/
function buildContent(val){
      // console.log(val);


       var parser=new DOMParser(),
       htmlDoc = parser.parseFromString(val, "text/html"),
       divs = htmlDoc.getElementsByTagName("div"),
       blogWrap = document.createElement("div");

      for(var i = 0, len = divs.length; i < len; i++){
          var blogP = document.createElement("p");
          blogP.appendChild(document.createTextNode(divs[i].textContent));
          blogWrap.appendChild(blogP);
      }

      return blogWrap;
}
/*===================================================================================*/
// function to build a tag
/*===================================================================================*/
function buildLink(val){
      var blogLink = document.createElement("a");

      blogLink.setAttribute('href', val);
      blogLink.appendChild(document.createTextNode('Read more ...'));

      return blogLink;
}
/*===================================================================================*/
// function to build minor posts
/*===================================================================================*/
function minorPost(val,i){
  // console.log(val);
    var Ele = document.getElementById(i),
        xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://www.googleapis.com/blogger/v3/blogs/5844238035868473137/posts/'+val+'?fetchBody=false&fetchImages=true&maxComments=0&view=READER&key=AIzaSyAV7brZF-F8ZxonIzqova14F6jtyKZ71wc');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var content = JSON.parse(xhr.responseText);
            // console.log(content);
            Ele.appendChild(buildH(content.title));
            Ele.appendChild(buildImg(content.images));
            Ele.appendChild(buildLink(content.url));
        }
        else {
            // alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
    xhr.send();

}
