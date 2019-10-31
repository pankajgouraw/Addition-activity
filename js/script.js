$(function() {

    let result='';
    let userAns = 0;
    var chance = 0;
    $("#headerText").text(headerText);
    $("#instruction").css({color:headerInstructionColor});
    $('body').css({'background-image':bg});
    generateContent();
    dragDrop();

    // function for drag and drop
  function dragDrop(){

      $('.drag').draggable({
            revert: 'invalid',
            snapMode: 'inner',
            helper: 'clone'
      });

      $(".drop" ).droppable({
            accept:".drag",
            // tolerance: 'intersect',
            drop: function(event, ui) {

             $(this).append($(ui.draggable).clone());

             if($(this).children("span").length > 1){
                $(this).children("span:nth-child(1)").remove(); 
             }
            },
      }); 

  }  //end here drag and drop 

  function generateContent(){
        // generate random numbers
        let randA = Math.ceil(Math.random() * (maxA - minA)+1) + minA;
        let randB = Math.ceil(Math.random() * (maxB - minB)+1) + minB;

        // convert random number into array
        carryRandA = Array.from(randA.toString(), Number);
        carryRandB = Array.from(randB.toString(), Number);

        //generate span tag for numbers
        carrySpanA = '';
        carrySpanB = '';
        

        //add span tag to the number
        $.each(carryRandA, function(i,value){
            var spanA = `<span>${value}</span>`
            carrySpanA += spanA;
        }); 

        $('#firstNo').html(carrySpanA);
        $('#secNo').html(randB);

        // append carried value
        result = randA + randB;

        // console.log('random A ', carryRandA)
        // console.log('random B ', carryRandB)


        // append the carried value
        for(let i=carryRandB.length-1; i>=0; i--){
          let sum =  carryRandA[i] + carryRandB[i];
          if(sum >9){
                    let x =$('#firstNo span')[i];
                    $(x).append('<span>1</span>');
          } 
          //console.log('sum : ',sum)
        }



        // generate drop box 
        let dropTag='';
        for(let i = 0; i<result.toString().length; i++){
           let pTag = '<p class="drop"></p>';
           dropTag  += pTag;
        }
        $('.ansContainer').html(dropTag);
  }


  $('#next').click(function(){
    chance =0;
     $(this).hide();
     $('#check').fadeIn();
     $('#showAns').hide();
     generateContent();
     dragDrop();
  });

  $('#reload').click(function(){
    window.location.href = 'main.html';
  })


 
  $('#check').click(function(){
    // console.log('chance', chance)
     let dropTag = $('.ansContainer p');
     let userInput = '';
     $.each(dropTag , function(i, value){
        let userData = $(value).children().text();
        userInput += userData;
     });
     // console.log(parseInt(userInput));
     let output = $('.output');
     // console.log(output)
     if(userInput == ''){
        return false;
     } 
       $(this).show();
      // $('#next').fadeIn();
      

     if(parseInt(userInput) === result){
       // console.log(true);
        wellDone();
        $(output[userAns]).css("background-image", "url(" + 'img/happy.png' + ")");
        $('#next').show();
        $('#check').hide();
        chance = 0;
        userAns++;
     }else{
        
        if(chance==0){
          oopsTryAgain();
          chance++;
          $('.ansContainer .drop').empty();
          return false;
        }
        
        $(this).hide();
        $('#showAns').show();
        $('#next').show();
        $(output[userAns]).css("background-image", "url(" + 'img/sad.png' + ")");
        userAns++;
     }

     if(userAns > 9){
        $('#next').hide();
        $('#reload').fadeIn();
     }
  })
  

  function oopsTryAgain(){
      $('.oops').removeClass('zoomOut');
      $('.oops').addClass('animated zoomIn oopsHW');

      setTimeout(function(){
        $('.oops').removeClass('zoomIn');
        $('.oops').addClass('zoomOut')
        setTimeout(function(){
        $('.oops').removeClass('oopsHW');
        },500);
      },2000)
  }

function wellDone(){
      $('.wellDone').removeClass('zoomOut');
      $('.wellDone').addClass('animated zoomIn oopsHW');

      setTimeout(function(){
        $('.wellDone').removeClass('zoomIn');
        $('.wellDone').addClass('zoomOut')
        setTimeout(function(){
        $('.wellDone').removeClass('oopsHW');
        },500);
      },2000)
};


  $('#showAns').click(function(){
     //console.log(result);
    // generate answer
        let dropTag = '';
        let ansArray = Array.from(result.toString(), Number);
        // console.log('result',result);
        // console.log('result',ansArray);
        for(let i = 0; i<ansArray.length; i++){
           let pTag = `<p class="drop"><span>${ansArray[i]}</span></p>`;
           dropTag  += pTag;
        }
        $('.ansContainer').html(dropTag);
  })

});   // end document function 
