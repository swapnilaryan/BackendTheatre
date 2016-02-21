$(document).ready(function(){
    var i=1;
    $("#add_row").click(function(){
        $('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='id"+i+"' type='text' placeholder='Movie' class='form-control input-md'  /> </td><td><input   name='StartTime"+i+"' type='text' placeholder='Start Time'  class='form-control input-md'></td><td><input  name='EndTime"+i+"' type='text' placeholder='End Time'  class='form-control input-md'></td><td><input  name='ScreenNo"+i+"' type='text' placeholder='Screen No.'  class='form-control input-md'></td>><td><input  name='Date"+i+"' type='text' placeholder='Date'  class='form-control input-md'></td>>");

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row").click(function(){
        if(i>1){
            $("#addr"+(i-1)).html('');
            i--;
        }
    });

});