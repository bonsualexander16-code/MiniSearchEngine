let main = document.getElementById("main");
let searchText = document.getElementById("search") ;
let status = document.getElementById("status") ;

document.body.style.maxWidth = "500px" ;

let spans = document.querySelectorAll("span") ;

 async function search() {
    if(searchText.value === ""){
        alert("search area is empty") ;
        return ;
    }
    
    
        
    try {
        
         spans.forEach((span)=>{
                span.classList.toggle("load") ;
            })
        
        let response = await fetch(`https://bexesearch.onrender.com/search?q=${searchText.value.trim()}`) ;
        
        if(!response.ok){
            status.innerHTML = "Failed to search" ;
            return ;
        }
        
        let data = await response.json() ;
        
        main.innerHTML = "" ;
        
        if(data.length == 0){
            status.innerHTML = "No result found" ;
            return ;
        }
        
        data.forEach((item)=>{
           let div = document.createElement("div") ;
           
           
            if(item.image !== null){
            div.innerHTML =  `
            <div>
               <h3>${item.title}</h3>
               <img src="${item.image}" class="thumbnail"/>
            </div>   
               <a
               style="
               color:blue;
                  text-decoration:none;
                 display:block;
                 overflow:hidden;
                 white-space:nowrap;
                 text-overflow:ellipsis;
               "
               href="${item.link}" target="_blank">${item.link}</a>
               <p>${item.snippet}</p>
            `;
            }else{
               div.innerHTML  = `
               <h3
               style="
                font-size:20px;
                margin-bottom:8px;
                color:#222;
               "
               >${item.title}</h3>
               <a 
               style="
               color:blue;
    text-decoration:none;

    display:block;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;"
               href="${item.link}" target="_blank">${item.link}</a>
               <p>${item.snippet}</p>
            `;
            }
            
            div.style.margin = "10px" ;
            div.style.maxWidth = "500px"
            div.style.padding = "10px 15px" ;
            div.classList.add("info") ;
            main.appendChild(div) ;
             spans.forEach((span)=>{
                span.classList.remove("load") ;
            })
        })
        
        status.innerHTML = `${data.length} results found` ;
        
        
        console.log(data) ;
    } catch (e) {
        status.innerHTML = "Something went wrong" ;
        console.log(e) ;
         spans.forEach((span)=>{
                span.classList.remove("load") ;
            })
    }
}
