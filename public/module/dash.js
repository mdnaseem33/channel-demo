$().ready(function(){
   $("#channel-save-btn").click(function(){
    console.log("clicked");
      const name = $("#first-name").val();
      const email = $("#email-id").val();
      const password = $("#password").val();
      const channel_id = $("#channel_id").val();

      $.ajax({
         url: "/user-create",
         type: "POST",
         data: {name: name, email: email, password: password, channel_id: channel_id},
         success: function (response) {
            if(response.status) window.location.href="/dashboard";
            else alert(response.message);
         }
      });
   });

});