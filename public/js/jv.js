let progBar=document.getElementById("but");
let bar=document.getElementById("col_id");

$(".start").click(function(){
    $(".navbar-toggler").toggleClass("last");
    
    $(".logbut").toggleClass("check");
})

$("#but").click(function(){
   
    if($("#firstname").val()==""||$("#secondname").val()=="")
    {       
        alert("please fill name ");
        $(".bar_len").addClass("displaynone");
        $(".reset_but").addClass("displaynone");
       
        
        
    }else{
        progBar.disabled=true;
        say();
        $(".bar_len").removeClass("displaynone");
        $(".reset_but").removeClass("displaynone");
    }
    // afte click submit the bar meter will show up
    $(".bar_len").addClass("display");

    $(".sad_but").addClass("display");

    // it make that submit button inactive after submiting it
    
    

    // after clicking reset button the submit button will re-active
    $(".reset_but").addClass("displayy");

    $(".reset_but").click(function(){

        $(".sad").removeClass("display_emo");
        $(".normal").removeClass("display_emo");
        $(".happy").removeClass("display_emo");
        $(".extreme").removeClass("display_emo");
        $("p").removeClass("display_emo");
        progBar.disabled=false;
    })

    $(".reset_but").click(function(){
        $(".bar_len").addClass("displaynone");
        $(".per").addClass("displaynone");
        
        if(progBar.disabled==false)
    {
        $("#but").removeClass("togglecol");
        

    }
    }) 
   
    
});

$("#but").click(function(){
    if(progBar.disabled==true)
    {
        $("#but").addClass("togglecol");
    }
    $(this).parent().trigger('submit')
});




function say(){
    var target=Math.floor(Math.random()*100);
    // let target=100;

    if(target<20)
    {
        $(".sad").addClass("display_emo");
        
        
    }
    else if(target>=20 && target<50)
    {
        $(".normal").addClass("display_emo");
    }
    else if(target>=50 && target<85)
    {
        $(".happy").addClass("display_emo");
    }
    else if(target>=85 && target<100)
    {
        $(".extreme").addClass("display_emo");
    }

    
    let num=0;
    let numinter=setInterval(function(){
        if(num>=target)
        {
            clearInterval(numinter)
            return;
        }
        else{
            num++;
            $(".per").addClass("display_emo");
            $(".per").text(num+"%");
        }
    },50)
    let curr=0;
    let interval=setInterval(function(){
        if(curr>=target)
        {
            clearInterval(interval);
            return;
        }
        else{
            curr++;
            bar.style.width=curr+'%';
        }

    },50);
}



module.exports={
    target
}

