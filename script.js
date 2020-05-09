var max_item_row = 3;
var max_row_qtd= 4;

function getdata()
{
  fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
    .then(res => res.json())
    .then(data => show_options(data, 1))
}

fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72')
  .then(res => res.json())
  .then(data => show_options(data,1))

function show_options(data,page_index)
{
  console.log(data);
  let item_count= 0;
  for (var i = 0; i < max_row_qtd; i++)
  {
    for (var k = 0; k < max_item_row; k++)
    {
      document.getElementById('menu').innerHTML += (
        '<div class=".col-md-4 .col-sm-12">' +
          '<div class="card">' +
            '<img class="card-img-top" src="'+data[item_count].photo+'">' +
              '<div class="card-body">' +
                '<h4>'+data[item_count].name+'</h4>' +
                '<h6>'+data[item_count].property_type+'</h6>' +
                '<p>R$'+data[item_count].price+'/Noite</p>' +
              '</div>' +
            '</div>' +
        '</div>')
      item_count++;
    }
  }
  
 
  let qtt_pages = Math.ceil(data.length/(max_row_qtd*max_item_row));
  for(i = 1; i <= qtt_pages;i++)
  {
    document.getElementById('page_index').innerHTML+= (
      '<li><a href="#" onclick="change_page(this)">'+i+'</a></li>'
    )
  }
}

function change_page(page_index)
{
  
  console.log(parseInt($(page_index).text()));
}