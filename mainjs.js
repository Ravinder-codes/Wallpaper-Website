var maxpageimage=18;





//Loading the load images in content
var contents = Array.from(document.getElementsByClassName("content"));
for (let i of contents)
{
    i.classList.add("load"+Math.floor((Math.random()*5)+1));
}


// Fetching data
fetch("page/page1.txt").then((response)=>{
    return response.text();
}).then(data=>{
    loadImages(data);
    
})
function loadImages(data)
{
    // Putting the images
    let imgar = data.split("\r\n");
    for (let i=0;i<maxpageimage;i++)
    {
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
}



// Slider working
let left=document.getElementById("sliderleft");
let right=document.getElementById("sliderright");
const slides= document.querySelectorAll(".slide");
var counter=0;

const slideImage=(slides)=>{
    slides.forEach((slide)=>{
        slide.style.transform=`translateX(-${counter*100}%)`
    })
}

var timer = setInterval(() => {
    counter++;
    if(counter>3)
    {
        counter=0;
    }
    
   slideImage(slides); 
}, 3000);


left.onclick=function(){
    clearInterval(timer);
    counter--;
    if(counter<0)
    {
        counter=3;
    }
    slideImage(slides);
    timer = setInterval(() => {
        counter++;
        if(counter>3)
        {
            counter=0;
        }
        
       slideImage(slides); 
    }, 3000);

}

right.onclick=function(){
    clearInterval(timer);
    counter++;
    if(counter>3)
    {
        counter=0;
    }
    slideImage(slides);
    timer = setInterval(() => {
        counter++;
        if(counter>3)
        {
            counter=0;
        }
        
       slideImage(slides); 
    }, 3000);

}

slides.forEach((slide,index)=>{
    slide.style.left= `${index*100}%`;
})