//Loading the load images
var contents = Array.from(document.getElementsByClassName("content"));
for (let i of contents)
{
    i.classList.add("load"+Math.floor((Math.random()*5)+1));
}

// Getting page no from url
var data = window.location.search;
var params = new URLSearchParams(data);
var num = params.get("goto");

// Checking page number
if(num==1)
{
    location.href="main.html";
}
else if(num>5 || num<1){
    // What if invalid page number
    let anh=document.createElement("a");
    anh.href="main.html";
    let b=document.createElement("button");
    anh.appendChild(b);
    b.classList.add("gohome");
    b.innerHTML="Consider Going home?";
    
    let img = document.createElement("img");
    img.src="png/notfound.png";
    img.classList.add("img");
    document.body.innerHTML="";
    document.body.appendChild(img);
    let notfound=document.createElement("div");
    notfound.innerHTML= "Ninja Wallipy is unable to find the page";
    document.body.appendChild(notfound);
    document.body.classList.add("notfound");

    document.body.appendChild(anh);
}
else{
    // if valid page number
    var upage="page"+num+".txt";
    let noshow = document.getElementById("noshow");
    noshow.innerHTML="Page "+num+" of 5";



// Getting elements
let prev = document.getElementById("prev");
let pg1 = document.getElementById("pg1");
let pg2 = document.getElementById("pg2");
let pg3 = document.getElementById("pg3");
let pg4 = document.getElementById("pg4");
let next = document.getElementById("next");


// Settings values
if(num==2)
{
    prev.parentElement.href="main.html";
}
else{
    prev.parentElement.href=`page.html?goto=${Number.parseInt(num)-1}`;
}
pg2.innerHTML=num;
if(num!=5){
    pg3.parentElement.href=`page.html?goto=${Number.parseInt(num)+1}`;
    next.parentElement.href=`page.html?goto=${Number.parseInt(num)+1}`
    pg3.innerHTML=Number.parseInt(num)+1;
    pg3.parentElement.href=`page.html?goto=${Number.parseInt(num)+1}`;
}
else{
    pg3.innerHTML=".";
    pg3.classList.add("highlight");
    pg3.parentElement.removeAttribute("href");
    pg4.classList.add("highlight");
    next.classList.add("highlight");
    pg4.parentElement.removeAttribute("href");
    next.parentElement.removeAttribute("href");
}


// Fetching data
fetch("page/page1.txt").then((response)=>{
    return response.text();
}).then(data=>{
    loadImages(data);
    
})
function loadImages(data)
{
    // loading images
    let imgar = data.split("\r\n");
    for (let i=0;i<10;i++)
    {
        // Adding images
        let img = document.createElement("img");
        img.src="images/"+imgar[i]+".jpg";
        img.classList.add("blur");
        contents[i].appendChild(img);
        
        contents[i].parentElement.href="/download.html?photo="+imgar[i];

        img.onload=function(){
           
            img.classList.remove("blur");
            let downloadb = document.createElement("button");
            downloadb.innerHTML="<img src='png/download.png'>";
            contents[i].append(downloadb);
            
            
        }
    }
}}