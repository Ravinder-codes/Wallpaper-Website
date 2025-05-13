// Getting data from query
var data = window.location.search;
var params = new URLSearchParams(data);
var imgname=params.get("photo");


// Getting needed elements
var title = document.getElementById("title");
var about = document.getElementById("about");
var dimen = document.getElementById("dimension");
var download = document.getElementById("download");
var nfdown = document.getElementById("noofdown");
var size = document.getElementById("size");


// Setting elements
title.innerHTML = imgname;
if(localStorage.getItem(imgname)==null)
{
    localStorage.setItem(imgname,0);
}
nfdown.innerText=localStorage.getItem(imgname);
download.onclick=function(){
    localStorage.setItem(imgname,Number.parseInt(localStorage.getItem(imgname))+1);
    nfdown.innerText=localStorage.getItem(imgname);
}

let img = document.getElementById("image");
img.src="images/"+imgname+".jpg";
img.onload=function(){
    dimen.innerHTML = img.naturalWidth+" x "+img.naturalHeight;
}


fetch("files/"+imgname+".txt").then((response)=>{
    return response.text();
}).then(data=>{
    loaddetails(data)  ;
})


function loaddetails(data){
    // Adding entries
    data = data.split("\r\n");
    about.innerHTML=data[0];
    size.innerHTML=data[1];
    download.href="images/"+imgname+".jpg";
}


//related images
fetch("page/search.txt").then((response)=>{
    return response.text();
}).then(data=>{

    // Taking tags from image selected
    var tag=[];
    let num=0;
    let searchidx = data.split("\r\n");
    for (i of searchidx)
    {
        i=i.split(",");
        
        if(i[0]==imgname)
        {
            tag=i;
            break;   
        }
        num++;
    }


    // Getting preferences
    let preference = {};
    for (let i in searchidx){
            if(i!=num){
            searchidx[i]=searchidx[i].split(",");
            preference[searchidx[i][0]] = 0;
            let name = searchidx[i][0];
            for(let j in searchidx[i])
            {

                searchidx[i][j]=searchidx[i][j].split(" ").join("").toLowerCase();
                
                for (let k in tag)
                {
                    
                    if(searchidx[i][j].includes(tag[k]))
                    {
                        if(searchidx[i][j]==tag[k] || searchidx[i][j]==tag[k]+"s")
                        {
                            preference[name]=preference[name]+10;
                            break;
                        }
                        if(j>0)
                        {
                            preference[name]=preference[name]+3;
                        }
                        else{
                            preference[name]=preference[name]+0.5;
                        }
                    }
                }
            }
        }
    }


    // Sorting preferences
    preference = Object.entries(preference).sort((a,b)=>b[1]-a[1]);

    // if not related data
    if(preference[0][1]==0){
        let main=document.getElementById("main");
        let img = document.createElement("img");
        img.src="png/notfound.png";
        img.classList.add("img");
        main.bodyinnerHTML="";
        main.appendChild(img);
        let notfound=document.createElement("div");
        notfound.innerHTML= "Sorry! Ninja Wallipy did not find any related image";
        main.appendChild(notfound);
        main.classList.add("notfound");
    }
    else{
    let counter=0;
    for (let i of preference)
    {
        if(i[1]>0)
        {
        let div=document.createElement("div");
        div.classList.add("content");
        let anh=document.createElement("a");
        anh.href="/download.html?photo="+i[0];
        


        let img = document.createElement("img");
        img.src = "images/"+i[0]+".jpg";
        img.classList.add("blur");
        img.style.objectFit="cover";
        div.appendChild(img);
        div.classList.add("load"+Math.floor((Math.random()*5)+1));

        let butn = document.createElement("button");
        butn.innerHTML='<img src="png/download.png">';
        div.appendChild(butn);

        img.onload=function(){
            img.classList.remove("blur");
        }
        anh.appendChild(div);
        document.getElementById("c"+counter).appendChild(anh);
        counter=(counter+1)%3;
        }
    }
    }

    

})




