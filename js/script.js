$(function() {

    let result='';
    let userAns = 0;
    var chance = 0;
    $("#headerText").text(headerText);
    $("#instruction").css({color:headerInstructionColor});
    $('body').css({'background-image':bg});
    $('#firstNo, #secNo, .sign').css({color:questColor});
     $('.options p span').css({color:numColor});
    // $('.drop span').css({color:ansColor});
    generateContent();
    dragDrop();
   // $('.drop span').css({color:ansColor});
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
               // $('.drop span').css({color:ansColor});

             $(this).append($(ui.draggable).clone().css({color:ansColor}));
             $(event.target).attr('data-user',ui.draggable.text());

             if($(this).children("span").length > 1){
                $(this).children("span:nth-child(1)").remove(); 
             }
            },
      }); 

  }  //end here drag and drop 

  function generateContent(){
        let rand1 = '';
        let rand2 = '';
        // generate random numbers
        let randA = Math.ceil(Math.random() * (maxA - minA)+1) + minA;
        let randB = Math.ceil(Math.random() * (maxB - minB)+1) + minB;


        let arrayA = Array.from(randA.toString(), Number);
        let arrayB = Array.from(randB.toString(), Number);
      

        for(let i=0; i<arrayA.length; i++){
          let x = Math.ceil(Math.random() * (5));
          rand1 +=x
        }

        for(let i=0; i<arrayB.length; i++){
          let x = Math.ceil(Math.random() * (4));
          rand2 +=x
        }

        console.log('rand1', rand1)
        console.log('rand2', rand2)

        randA = Number(rand1);
        randB= Number(rand2);




        // convert random number into array
        carryRandA = Array.from(randA.toString(), Number);
        carryRandB = Array.from(randB.toString(), Number);
        let carrySpanA = '';
        let carrySpanB = ''
        //add span tag to the number
        $.each(carryRandA, function(i, value) {
            var spanA = `<span>${value}</span>`
            carrySpanA += spanA;
        });

        // add span tag to second number
        $.each(carryRandB, function(i, value) {
            var spanB = `<span>${value}</span>`
            carrySpanB += spanB;
        });

        $('#firstNo').html(carrySpanA);
        $('#secNo').html(carrySpanB);

        // append carried value
        result = randA + randB;
        resultArray = Array.from(result.toString(), Number);
        // generate drop box 
        let dropTag='';
        for(let i = 0; i<resultArray.length; i++){
           let pTag = `<p class="drop" data-original="${resultArray[i]}" data-user=' '></p>`;
           dropTag  += pTag;
        }
        $('.ansContainer').html(dropTag);
  } //end generatecontent function


  $('#next').click(function(){
    chance =0;
     $(this).hide();
     $('#check').fadeIn();
     $('#showAns').hide();
     generateContent();
     dragDrop();
      let Width = $('.drop').width();
      $('#firstNo span').width(Width);
      $('#secNo span').width(Width);
      generatePlaceValue();
  });

  $('#reload').click(function(){
    window.location.href = 'main.html';
  })


 
  $('#check').click(function(){
    // console.log('chance', chance)
    showError()
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

     

     // showError();

  })


function showError(){
  let dataAttr = $('.drop');
  console.log(dataAttr)
  $.each(dataAttr, function(index, value){
    let dataUser = $(value).attr('data-user');
    let dataOriginal = $(value).attr('data-original');
    if(dataUser == dataOriginal){
      $(value).css({'borderColor':'#fff'})
    }else{
      $(value).css({'borderColor':errorColor})
    }

  })
}
  

  function oopsTryAgain(){
      $('.oops').removeClass('zoomOut');
      $('.oops').addClass('animated zoomIn oopsHW');

      setTimeout(function(){
        $('.oops').removeClass('zoomIn');
        $('.oops').addClass('zoomOut')
        setTimeout(function(){
        $('.oops').removeClass('oopsHW');
        // $('.ansContainer .drop').empty();
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
    // generate answer
    $(this).hide();
        let dropTag = '';
        let ansArray = Array.from(result.toString(), Number);
        // console.log('result',result);
        // console.log('result',ansArray);
        for(let i = 0; i<ansArray.length; i++){
           let pTag = `<p class="drop"><span style='color:${ansColor}'>${ansArray[i]}</span></p>`;
           dropTag  += pTag;
        }
        $('.ansContainer').html(dropTag);
  })



 
  // function to generate the place value
  function generatePlaceValue(){
    let Arr = (Array.from($('#firstNo span')).reverse());
    for(let i= 0; i <Arr.length; i++){
       if(i==0){$(Arr[i]).append(`<span class='placeValue'>o</span>`);} 
       if(i==1){$(Arr[i]).append(`<span class='placeValue'>t</span>`);} 
       if(i==2){$(Arr[i]).append(`<span class='placeValue'>h</span>`);} 
       if(i==3){$(Arr[i]).append(`<span class='placeValue'>th</span>`);} 
       if(i==4){$(Arr[i]).append(`<span class='placeValue'>t.th</span>`);} 
       if(i==5){$ (Arr[i]).append(`<span class='placeValue'>l</span>`);} 
    }
  }
  generatePlaceValue()
  // function to generate the place value end
  

  let Width = $('.drop').width();
  $('#firstNo span').width(Width);
  $('#secNo span').width(Width);


});   // end document function 
