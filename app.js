
$(document).ready(function(){
    
    var tr ='';
    $('#btn-create').click((e)=>{
        e.preventDefault();
        var name = $('#name').val();
        var rollNo = $('#rollNo').val();
        var address = $('#address').val();
        var data = {};
        data.name = name;
        data.rollNo = rollNo;
        data.address = address;
        console.log(data);

        create(data, (err, result)=>{
            if(err){
                console.log("fond err:",err);
            }else{
                console.log("success", result);
            }
           })

           
           readAll((err, result)=>{
            $(".tbody").empty();

            if(err){
                console.log(err);
            }else{
                console.log('result', typeof result);

                // for (const element in result){
                //     console.log("oo:",result[element].phio);
                result.forEach((value,indx) => {
                    
                     tr +=`<tr>
                     <td>${value.id}</td>
                    <td id='name${value.id}'>${value.name}</td>
                    <td id='rollno${value.id}'>${value.rollNo}</td>
                    <td id='address${value.id}'>${value.address}</td>
                    <td id="btnEdit" data-id='${value.id}'><i class=" text-success fa-regular fa-pen-to-square"></i></td>
                    <td id="deletebtn" data-id='${value.id}'><i class="fa-solid fa-trash text-danger"></i></td>
                </tr>`;
                tbody.innerHTML = tr;
                // $('.tbody').html(tr);
              
                });

            }
            window.location.reload();
           })

             $('#name').val("");
             $('#rollNo').val("");
             $('#address').val("");
    })
   
    $('#btn-read').click(readAll((err, result)=>{
        tbody.innerHTML = "";
        if(err){
            console.log(err);
        }else{
            console.log('result', typeof result);

            // for (const element in result){
            //     console.log("oo:",result[element].phio);
            result.forEach((value,index) => {
                
                 tr +=`<tr>
                 <td>${value.id}</td>
                 <td id='name${value.id}'>${value.name}</td>
                 <td id='rollno${value.id}'>${value.rollNo}</td>
                 <td id='address${value.id}'>${value.address}</td>
                 <td id="btnEdit" data-id='${value.id}'><i class=" text-success fa-regular fa-pen-to-square"></i></td>
                 <td id="deletebtn" data-id='${value.id}'><i class="fa-solid fa-trash text-danger"></i></td>
            </tr>`;
            tbody.innerHTML = tr;
            // $('.tbody').html(tr);
            });

        }

    }))

    $(document).on('click', '#deletebtn', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        console.log(id)
        deleteTask(id, (err, result) => {
            if(err){
                console.log(err);
            }else{
                console.log(result);
                window.location.reload();
            }
        });
    
    });

    $(document).on('click','#btnEdit', function (e) {
        e.preventDefault();
        var id = $(this).data('id') ;
        var nam = (document.getElementById("name"+id).innerText);
        var roll = (document.getElementById("rollno"+id).innerText);
        var add = (document.getElementById("address"+id).innerText);
        $('#userid').val(id);
        $('#name').val(nam);
        $('#rollNo').val(roll);
        $('#address').val(add);

    });

    $(document).on('click','#btn-update',function (e){
        e.preventDefault();
        var userId = $('#userid').val();
        var name = $('#name').val();
        var rollNo = $('#rollNo').val();
        var address = $('#address').val();
        var data = {};
        data.name = name;
        data.rollNo = rollNo;
        data.address = address;
        console.log(userId);


        update(data,userId, (err, result)=>{
            if(err){
                console.log("fond err:",err);
            }else{
                console.log("success", result);
                window.location.reload();
            }
           })
        
    });
   
});

