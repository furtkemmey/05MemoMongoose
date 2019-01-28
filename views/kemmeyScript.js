$(document).ready(function() {
    getMessage(1);
    getAoumnt();
    //-------------------------------------------------------------
    
    function getMessage(page) {
        // 取得留言 /message
        $.get('/message?page=' + (page-1), function(result){
            // console.log(result);
            // console.log(result[0].message);

            // 傳回來的是string type 在轉date()
            var showDate = new Date(result[0].messageDate);
            // console.log(showDate.toLocaleString());

            var compiled = _.template( $("#moban").html() ); 
            // 清空節點
            $("#quanbuliuyan").html("");
            for(var i= 0; i < result.length; i++) {
                // console.log(result[i].messageDate.toLocaleString());
                var html = compiled(
                    {
                        name : result[i].name,
                        message : result[i].message,
                        messageDate : showDate.toLocaleString(),
                        id : result[i]._id
                    }
                );
                $("#quanbuliuyan").append($(html));
            }
        });
    }
    //-------------------------------------------------------------

    // 取得總共幾頁
    function getAoumnt() {
        $.get('/pageamount', function(amount) {
            // console.log('amount' + amount);
            var compiled = _.template( $("#navMoban").html() ); 
            $('#navTop').html('');
            for(var i= 1; i < amount; i++) {
                var html = compiled({
                    i : i
                });
                $('#navTop').append($(html));
            }
            // 第一頁 設定active
            $(".yemaanniu:first").addClass("active");
        });
    }
    //-------------------------------------------------------------
    
    // nav click()事件
    // 因為是動態生成的 所以用on 去監聽上層的 <ul class="pagination"
    $('.pagination').on('click', 'li', function() {
        // console.log('yemaanniu clicked');
        // console.log(this);
        // this 就是現在被click的<li>
        currentPage = parseInt($(this).attr("data-page")); // 取得屬性 得到現在被click()的頁碼
        // console.log('currentPage ' + currentPage);
        getMessage(currentPage);
        $(this).addClass("active").siblings().removeClass("active");
    });
    //-------------------------------------------------------------

    // 按鈕事件 送出留言   
    $("#tijiao").click(function() { // <button id="tijiao" 按鈕click事件
        $("#chenggong").hide();
        $("#shibia").hide();
        // window.alert('tijiao');
        $.post("/tijiao", {
                // post 上傳資料
                "xingming": $("#xingming").val(), // 姓名
                "liuyan": $("#liuyan").val() // 留言 
            }, function(result) {
                // console.log(result);
                // 回傳 結果
                if (result == 0) {
                    $("#chenggong").fadeIn();
                    // 從新取得留言
                    getMessage(1);
                    // 清空表格
                    $("#xingming").val("");
                    $("#liuyan").val("") ;                      
                } else {
                    $("#shibia").fadeIn();
                }
            }
        );
    });    
    //-------------------------------------------------------------
});