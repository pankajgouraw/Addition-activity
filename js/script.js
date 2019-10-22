$(function() {

    let result;
    $("#headerText").text(headerText);
    // $("#instruction").text(InstructionText);
    $("#instruction").css({color:headerInstructionColor});


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
        let randA = Math.ceil(Math.random() * (max - min)+1) + min;
        let randB = Math.ceil(Math.random() * (max - min)+1) + min;
        $('#firstNo').html(randA);
        $('#secNo').html(randB);
        result = randA + randB;
        console.log('Result :' + result);
        console.log(typeof result);

        console.log('Result num length  :' + result.toString().length);
        // generate drop box 
        let dropTag='';
        for(let i = 0; i<result.toString().length; i++){
           let pTag = '<p class="drop"></p>';
           dropTag  += pTag;
        }
        $('.ansContainer').html(dropTag);
  }
  generateContent();
  dragDrop();

  $('#reload').click(function(){
     generateContent();
     dragDrop();
  });

  $('#check').click(function(){
     let dropTag = $('.ansContainer p');
     let userInput = '';
     $.each(dropTag , function(i, value){
        let userData = $(value).children().text();
        userInput += userData;
     });
     console.log(parseInt(userInput));
     if(parseInt(userInput) === result){
        console.log(true);
     }else{
        console.log(false);
     }
  })
});   // end document function 
