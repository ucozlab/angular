var app={itemID:0};app.loadTemplate=function(e,a){var t=new XMLHttpRequest;t.open("GET","./templates/"+e+".html",!0),t.onreadystatechange=function(){4===this.readyState&&200===this.status&&(document.getElementById("content").innerHTML=this.responseText,a())},t.send()},app.changeView=function(e,a,t){app.loadTemplate(e,function(){var i=document.querySelectorAll('#nav ul li a[href="'+e+'"]')[0];"undefined"!=typeof i&&siblingsAddRemoveClass(i.parentElement,"active"),a?"photo"===e?location.hash="!/gallery#!/"+a:(location.hash="!/"+e+"#!/"+a,"gallery"===e&&app.buildCategories()):(location.hash="!/"+e,"gallery"===e&&(app.buildCategories(),app.buildContent()),"new"===e&&app.buildCategories2()),"function"==typeof t&&t(a)})},app.buildCategories=function(){if(localStorage.length)for(var e=0;e<localStorage.length;e++){var a=localStorage.key(e),t=JSON.parse(localStorage.getItem(a));if(a.indexOf("albums")>-1)for(var i=0;i<t.length;i++){var o=t[i];app.addGalleryCat(o)}}},app.buildCategories2=function(){if(localStorage.length)for(var e=0;e<localStorage.length;e++){var a=localStorage.key(e),t=JSON.parse(localStorage.getItem(a));if(a.indexOf("albums")>-1)for(var i=0;i<t.length;i++){var o=t[i];app.addFrontendCat(o)}}},app.addPhoto=function(e,a){var t=document.querySelector("#items .row");'<div class="col-xs-12">you don\'t have any photos yet</div>'===t.innerHTML&&(t.innerHTML=""),a=a||"item"+app.itemID;var i=document.createElement("div");i.className="col-md-3",i.innerHTML='<div class="block" id="'+a+'"><div class="b-img"><a href="javacript:void(0)" onclick="app.remove(\''+a+'\', event)" class="remove"><i class="material-icons">clear</i></a><a href="javacript:void(0)" onclick="app.photoPage(\''+a+'\',event)"><img id="myImage" src="'+e.img+'"></a></div><div class="b-name h2"><a href="javacript:void(0)" onclick="app.photoPage(\''+a+"',event)\">"+e.name+'</a></div><div class="b-cat additional"><i class="material-icons inline-block">folder</i> '+e.cat+'</div><div class="b-desc">'+e.desc+"</div></div>",append(i,"items")},app.addToStorage=function(e,a){a=a||"item"+app.itemID;try{localStorage.setItem("item"+app.itemID,JSON.stringify(e)),app.itemID++}catch(t){alert(t)}},app.photoPage=function(e,a){a&&a.preventDefault();var t=JSON.parse(localStorage.getItem(e));app.changeView("photo",""+t.cat+"#!/"+e,function(){document.getElementById("mainphoto").innerHTML='<div class="block"><img src="'+t.img+'"></div><div class="b-desc">'+t.desc+"</div>",document.getElementById("maindesc").innerHTML='<div class="b-name h2">'+t.name+'</div><div class="b-cat additional"><i class="material-icons inline-block">folder</i> '+t.cat+"</div>"})},app.buildContent=function(){if(cleardiv("#items .row"),localStorage.length)for(var e=0;e<localStorage.length;e++){var a=localStorage.key(e),t=JSON.parse(localStorage.getItem(a));a.indexOf("item")>-1&&(app.addPhoto(t,a),app.itemID=parseInt(a.split("item")[1]),app.itemID++)}checkIfEmpty("#items .row",function(){var e=document.querySelector("#items .row");e.innerHTML='<div class="col-xs-12">you don\'t have any photos yet</div>'})},app.onlySelected=function(e){cleardiv("#items .row");for(var a=0;a<localStorage.length;a++){var t=localStorage.key(a),i=JSON.parse(localStorage.getItem(t));t.indexOf("item")>-1&&i.cat===e&&app.addPhoto(i,t)}checkIfEmpty("#items .row",function(){var e=document.querySelector("#items .row");e.innerHTML='<div class="col-xs-12">there are no photos in this cat</div>'}),app.addActiveClassToAsideCats(e)},app.addActiveClassToAsideCats=function(e){for(var a=document.querySelectorAll("#catlist2 .catlist li a"),t=0,i=a.length;i>t;t++)a[t].text===e&&siblingsAddRemoveClass(a[t].parentElement,"active")},app.remove=function(e,a){a.preventDefault();var t=document.getElementById(e).parentElement;t.parentElement.removeChild(t),localStorage.removeItem(e);var i=location.hash.substr(3);i.indexOf("#")>0?checkIfEmpty("#items .row",function(){var e=document.querySelector("#items .row");e.innerHTML='<div class="col-xs-12">there are no photos in this cat</div>'}):checkIfEmpty("#items .row",function(){var e=document.querySelector("#items .row");e.innerHTML='<div class="col-xs-12">you don\'t have any photos yet</div>'})},app.addCat=function(e){e.preventDefault();var a=[],t=addform2.elements.inputcat.value;if(localStorage.getItem("albums")){a=JSON.parse(localStorage.getItem("albums"));for(var i=0;i<a.length;i++)if(t===a[i])return alert("This cat allready exists!"),!1}app.addFrontendCat(t),addform2.elements.inputcat.value="",a.push(t);try{localStorage.setItem("albums",JSON.stringify(a))}catch(o){alert(o)}},app.addFrontendCat=function(e){var a=document.querySelector("#catlist ul li:first-child"),t=document.createElement("li"),i=document.createElement("option");"you don't have any albums yet"===a.innerHTML&&a.parentNode.removeChild(a),t.innerHTML='<a href="javascript:void(0)" onclick="app.changeView(\'gallery\', this.text, app.onlySelected)">'+e+"</a>",i.innerHTML=e,append(t,"catlist"),append(i,"formselect")},app.addGalleryCat=function(e){var a=document.querySelector("#catlist2 ul li:first-child"),t=document.createElement("li"),i=document.createElement("li");"you don't have any albums yet"===a.innerHTML&&(a.parentNode.removeChild(a),i.innerHTML="<a href=\"javascript:void(0)\" onclick=\"app.changeView('gallery');siblingsAddRemoveClass(this.parentElement, 'active');\">All</a>",append(i,"catlist2")),t.innerHTML='<a href="javascript:void(0)" onclick="app.changeView(\'gallery\', this.text, app.onlySelected)">'+e+"</a>",append(t,"catlist2");var o=location.hash.substr(3);if(o.indexOf("#")>0){var n=o.split("/")[1];app.addActiveClassToAsideCats(n)}else"gallery"===o&&app.addActiveClassToAsideCats("All")},app.init=function(){function e(){if(/^\#\!/.test(location.hash)){var e={foo:"bar"};route=location.hash.substr(3),history.replaceState(e,""+capitalizeFirstLetter(route)+" - MyGallery SPA",location.hash),history.pathname=location.hash,document.title=""+capitalizeFirstLetter(route)+" - MyGallery SPA"}}function a(){var e=location.hash.substr(3);if(e.indexOf("#")>0)if(e.indexOf("item")>0){var a=e.split("/")[2];app.photoPage(a)}else{var t=e.split("/")[1];app.changeView("gallery",t,app.onlySelected)}else app.changeView(e)}window.addEventListener("hashchange",e,!1),window.addEventListener("popstate",function(e){e.state&&a()},!1),window.location.hash?(a(),e()):(app.changeView("home"),e())},app.init();
