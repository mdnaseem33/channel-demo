$().ready(function(){
    const fullEditor = new Quill('#full-editor', {
        bounds: '#full-editor',
        modules: {
          formula: true,
          syntax: true,
          toolbar: [
            [
              {
                font: []
              },
              {
                size: []
              }
            ],
            ['bold', 'italic', 'underline', 'strike'],
            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            [
              {
                script: 'super'
              },
              {
                script: 'sub'
              }
            ],
            [
              {
                header: '1'
              },
              {
                header: '2'
              },
              'blockquote',
              'code-block'
            ],
            [
              {
                list: 'ordered'
              },
              {
                list: 'bullet'
              },
              {
                indent: '-1'
              },
              {
                indent: '+1'
              }
            ],
            [
              'direction',
              {
                align: []
              }
            ],
            ['link', 'image', 'video', 'formula'],
            ['clean']
          ]
        },
        theme: 'snow'
      });
    $("#save").click(function(){
        const content = fullEditor.root.innerHTML;
        const channel_id = $("#channel_id").val();
        $.ajax({
            url: "/channel-create",
            type: "POST",
            data: {content: content, channel_id: channel_id},
            success: function (response) {
                if(response.status) window.location.href="/channel";
                else alert(response.message);
            }
        }); 
    })
});