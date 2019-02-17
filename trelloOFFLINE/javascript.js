function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    // document.getElementById("delem").css("bottom","0px");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var div = /div\[(\d+)\]\[(\d+)\]/gi;
    var card = /card\[(\d+)\]\[(\d+)\]/gi;
    var divm = div.exec(data);
    var cardm = card.exec(data);
    if(ev.target.id.includes('card') && !data.includes('list')){
        ev.target.before(document.getElementById(data));
    }else if(ev.target.id.includes('hed') && data.includes('card')){
        ev.target.after(document.getElementById(data));
    }else if(ev.target.id.includes('div') && !data.includes('list')){
        ev.target.appendChild(document.getElementById(data));
    }else if(ev.target.id.includes('list') && data.includes('list')){
        ev.target.before(document.getElementById(data));
    }else if(ev.target.id.includes('div') && data.includes('list')){
        var x = $(event.target).parent();
        x.before(document.getElementById(data));
    }else if(ev.target.id.includes('lhed') && data.includes('list')){
        var x = $(event.target).parent();
        x.before(document.getElementById(data));
    }else if(ev.target.id.includes('card') && data.includes('list')){
        var x = $(event.target).parent().parent();
        x.before(document.getElementById(data));
    }else if(ev.target.id.includes('card') && data.includes('hed')){
        ev.target.before(document.getElementById(data));
    }else if(ev.target.id.includes('hed') && data.includes('hed')){
        ev.target.before(document.getElementById(data));
    }else if(ev.target.id.includes('delme')){
        document.getElementById(data).remove();
    }
}
$(document).ready(function(){
    //---------------ADD-ID'S-TO-ALL-ELEMENTS--------------------------
    // run through .list's
    $("div.list").each(function(idx,elem){
        $(elem).attr("id",`list${idx+1}`);
    });
    // run through .mm's
    $("div.mm").each(function(idx,elem){
        $(elem).attr("id",`div${idx+1}`);
    });
    // run through .crad's
    $("span.card").each(function(idx,elem){
        $(elem).attr("id",`card${idx+1}`);
    });
    // run through headings inside .mm
    $(".mm h1").each(function(idx,elem){
        $(elem).attr("id",`hed${idx+1}`);
    });
    // run through headings inside of list
    $(".list h1").each(function(idx,elem){
        $(elem).attr("id",`lhed${idx+1}`);
    });
    //-----------------------------------------------------------------



    //for new card--------------------------------------------------------------------
    $("body").on('blur','span.newCard',function(){
        if(this.innerHTML != '' && this.innerHTML.charAt(0) != "#"){
            $(this).parent('.list').scrollTop('100000');
            var span = document.createElement("span");
            $(span).addClass("card");
            $(span).attr("contenteditable","true");
            $(span).attr("draggable","true");
            $(span).attr("spellcheck","false");
            $(span).attr("ondragstart","drag(event)");
            if(this.innerHTML.includes('*' && ',')){
                var innerText = this.innerHTML;
                var val = innerText.split('*');
                span.innerHTML = val[0];
                var starr = val[1].split(',');
                for (let index = 0; index < 2; index++) {
                    var classname = starr[index];
                    console.log(classname);
                    $(span).addClass(classname);
                }
            }else{
                $(span).addClass('nrml');
                span.innerHTML = this.innerHTML;
            }
            $(this).prev().append(span);
            $("span.card").each(function(idx,elem){
                $(elem).attr("id",`card${idx+1}`);
            });
            this.innerHTML = '+ ADD NEW CARD';
        }else if(this.innerHTML.charAt(0) == "#" && this.innerHTML.length > 1){
            $(this).parent('.list').scrollTop('100000');
            var h1 = document.createElement("h1");
            $(h1).attr("contenteditable","true");
            $(h1).attr("draggable","true");
            $(h1).attr("spellcheck","false");
            $(h1).attr("ondragstart","drag(event)");
            if(this.innerHTML.includes('*' && ',')){
                var innerText = this.innerHTML;
                var val = innerText.split('*');
                h1.innerHTML = val[0].substring(1,this.innerHTML.length);
                var starr = val[1].split(',');
                for (let index = 0; index < 2; index++) {
                    var classname = starr[index];
                    console.log(classname);
                    $(h1).addClass(classname);
                }
            }else{
                $(h1).addClass('hnrml');
                h1.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
            }
            $(this).prev().append(h1);
            $(".mm h1").each(function(idx,elem){
                $(elem).attr("id",`hed${idx+1}`);
            });
            this.innerHTML = '+ ADD NEW CARD';
        }else{
            this.innerHTML = '+ ADD NEW CARD';
        }
    }).on('focus','span.newCard',function(){
        this.innerHTML = '';
    }).on('keypress','span.newCard',function(e){
        if(e.which == 13 && this.innerHTML != '' && this.innerHTML.charAt(0) != "#"){
            $(this).parent('.list').scrollTop('100000');
            var span = document.createElement("span");
            $(span).addClass("card");
            $(span).attr("contenteditable","true");
            $(span).attr("draggable","true");
            $(span).attr("spellcheck","false");
            $(span).attr("ondragstart","drag(event)");
            if(this.innerHTML.includes('*' && ',')){
                var innerText = this.innerHTML.trim().replace(/\n|\r/g,'');
                var val = innerText.split('*');
                span.innerHTML = val[0];
                var starr = val[1].split(',');
                for (let index = 0; index < 2; index++) {
                    var classname = starr[index];
                    console.log(classname);
                    $(span).addClass(classname);
                }
            }else{
                $(span).addClass('nrml');
                span.innerHTML = this.innerHTML.trim().replace(/\n|\r/g,'');
            }
            $(this).prev().append(span);
            $("span.card").each(function(idx,elem){
                $(elem).attr("id",`card${idx+1}`);
            });

            this.innerHTML.replace(/\n|\r/g,'').trim();
            this.innerHTML = "";
            return e.which != 13;
        }else if(e.which == 13 && this.innerHTML.charAt(0) == "#" && this.innerHTML.length > 1){
            $(this).parent('.list').scrollTop('100000');
            var h1 = document.createElement("h1");
            $(h1).attr("contenteditable","true");
            $(h1).attr("draggable","true");
            $(h1).attr("spellcheck","false");
            $(h1).attr("ondragstart","drag(event)");
            if(this.innerHTML.includes('*' && ',')){
                var innerText = this.innerHTML;
                var val = innerText.split('*');
                h1.innerHTML = val[0].substring(1,this.innerHTML.length);
                var starr = val[1].split(',');
                for (let index = 0; index < 2; index++) {
                    var classname = starr[index];
                    console.log(classname);
                    $(h1).addClass(classname);
                }
            }else{
                $(h1).addClass('hnrml');
                h1.innerHTML = this.innerHTML.substring(1,this.innerHTML.length);
            }
            $(this).prev().append(h1);
            $(".mm h1").each(function(idx,elem){
                $(elem).attr("id",`hed${idx+1}`);
            });
            this.innerHTML = '';
        }
        return e.which != 13;
    });
    //---------------------------------------------------------------------




    // for new list--------------------------------------------------------
    $('.nlist').on('blur',function(){
        if(this.innerHTML != ''){
            var list = document.createElement("div");
            $(list).addClass('list');
            list.innerHTML = '<h1 spellcheck="false" contenteditable="true">'+this.innerHTML+'</h1><div class=\'mm\' ondrop="drop(event)" ondragover="allowDrop(event)"></div><span spellcheck="false" class="newCard" contenteditable="true">+ ADD NEW CARD</span>';
            $(list).attr("draggable","true");
            $(list).attr("ondragstart","drag(event)");
            this.before(list);
            $("div.mm").each(function(idx,elem){
                $(elem).attr("id",`div${idx+1}`);
            });
            $("div.list").each(function(idx,elem){
                $(elem).attr("id",`list${idx+1}`);
            });
            // run through headings inside of list
            $(".list h1").each(function(idx,elem){
                $(elem).attr("id",`lhed${idx+1}`);
            });
            this.innerHTML = "ADD NEW LIST";
        }else{
            this.innerHTML = 'ADD NEW LIST';
        }
    }).on('click focus',function(){
        this.innerHTML='';
    }).on('keypress',function(e){
        if(e.which == 13 && this.innerHTML != ''){
            var list = document.createElement("div");
            $(list).addClass('list');
            $(list).attr("draggable","true");
            $(list).attr("ondragstart","drag(event)");
            list.innerHTML = '<h1 spellcheck="false" contenteditable="true">'+this.innerHTML+'</h1><div class=\'mm\' ondrop="drop(event)" ondragover="allowDrop(event)"></div><span spellcheck="false" class="newCard" contenteditable="true">+ ADD NEW CARD</span>';
            this.before(list);
            $("div.list").each(function(idx,elem){
                $(elem).attr("id",`list${idx+1}`);
            });
            $("div.mm").each(function(idx,elem){
                $(elem).attr("id",`div${idx+1}`);
            });
            // run through headings inside of list
            $(".list h1").each(function(idx,elem){
                $(elem).attr("id",`lhed${idx+1}`);
            });
            this.innerHTML = "";
        }
    }).on('keypress',function(e){return e.which != 13;});

});
//-----------------------------------------------------------------------------------


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("main").style.marginLeft = "30%";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
