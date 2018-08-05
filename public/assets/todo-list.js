$(document).ready(()=>{
    $('form').on('submit', ()=>{
        let inputItem = $('form input');
        let todoItem = {item: inputItem.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todoItem,
            success: (data)=>{
                location.reload();
            }
        });
        return false;        
    });

    $('li').on('click', function(){
        let thisItem = $(this).text().replace(/ /g, "-");
        
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + thisItem,
            success: (data)=>{
                location.reload();
            }
        });
    });
});