//Getting queries of url
var data = window.location.search;
var params = new URLSearchParams(data);
var usearch=params.get("query");


// fetching data
fetch("page/search.txt").then((response)=>{
    return response.text();
}).then(data=>{
    searchImage(data,usearch);
})

// Loading functions
function searchImage(data,usearch){
    usearch=usearch.toLowerCase().split(" ");
    for(let i in usearch)
    {
        if(usearch[i].length<3) 
        {
            usearch.pop(i);
            console.log(usearch);
        }
    }
    
    // Getting preferences
    let preference = {};
    let searchidx = data.split("\r\n");
    for (let i in searchidx){
        searchidx[i]=searchidx[i].split(",");
        preference[searchidx[i][0]] = 0;
        let name = searchidx[i][0];
        for(let j in searchidx[i])
        {
            searchidx[i][j]=searchidx[i][j].split(" ").join("").toLowerCase();
            
            for (let k in usearch)
            {
                
                if(searchidx[i][j].includes(usearch[k]))
                {
                    if(searchidx[i][j]==usearch[k] || searchidx[i][j]==usearch[k]+"s")
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
    

    // Sorting preferences
    preference = Object.entries(preference).sort((a,b)=>b[1]-a[1]);
    if(preference[0][1]==0){

        // What if not data
        let anh=document.createElement("a");
        anh.href="main.html";
        let b=document.createElement("button");
        anh.appendChild(b);
        b.classList.add("gohome");
        b.innerHTML="Consider Going home?";

        let main=document.getElementById("main");
        let img = document.createElement("img");
        img.src="png/notfound.png";
        img.classList.add("img");
        main.bodyinnerHTML="";
        main.appendChild(img);
        let notfound=document.createElement("div");
        notfound.innerHTML= "Sorry! Ninja Wallipy did not find anything related to the search";
        main.appendChild(notfound);
        main.classList.add("notfound");
        main.appendChild(anh);
    }
    else{

        // load images
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
}

