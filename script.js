var max_item_row = 3;
var max_row_qtd= 4;
const max_elements = max_item_row*max_row_qtd

async function getdata() 
{
  let response = await fetch('https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72');
  let data = await response.json();
  return data;
}

getdata().then(data => show_options(data,1));


function show_options(data, page_index) 
{
  reset_page();
  let item_count = (max_elements * (page_index - 1));
  for(i = item_count; i < (page_index*max_elements);i++)
  {
    document.getElementById('menu').innerHTML += (
      '<div class=".col-md-4 .col-sm-12">' +
        '<div class="card">' +
          '<img class="card-img-top" src="' + data[item_count].photo + '">' +
          '<div class="card-body">' +
            '<h4>' + data[item_count].name + '</h4>' +
            '<h6>' + data[item_count].property_type + '</h6>' +
            '<p class="per_day">R$' + data[item_count].price + ',00/Noite</p>' +
            '<p class="total"></p>'+
          '</div>' +
        '</div>' +
      '</div>')
    item_count++;
  }

  let qtt_pages = Math.ceil(data.length/(max_row_qtd * max_item_row));
  for (i = 1; i <= qtt_pages; i++) 
  {
    document.getElementById('page_index').innerHTML += (
      '<li><a href="#" onclick="change(this)">' + i + '</a></li>'
    )
  }
}

function change(page_index)
{
  let index = parseInt($(page_index).text());
  getdata().then(data=>show_options(data,index));
}

function reset_page()
{
  document.getElementById('menu').innerHTML = '';
  document.getElementById('page_index').innerHTML = '';
}

setInterval(date_update,3000);

function date_update()
{
  let dat_ini = document.getElementsByClassName('form-control')[0].value;
  let dat_end = document.getElementsByClassName('form-control')[1].value;

  if(!(dat_ini == 0 || dat_end == 0))
  {
    let result = [0,0,0]
    let dif_time = 0;
    for(var i = 0; i < 3; i++)
    {
      result[i] = parseInt(dat_end.split('-')[i])-parseInt(dat_ini.split('-')[i]);
    }

    dif_time = (result[2]) + (30 * result[1]) + (365 * result[0])

    let price_total = document.getElementsByClassName('total');
    let price_day = document.getElementsByClassName('per_day');

    if(dif_time <= 0)
    {
      document.getElementById('messages').innerHTML = (
        '<div class="alert alert-danger" role="alert" style:text-align: center;>'+
        'Erro: Data inválida!'+
        '</div>'    
      )
      for(i=0; i < price_total.length;i++)
      {
        price_total[i].style.visibility = 'hidden';
      }
    }
    else if(dif_time > 0)
    {
      console.log(dif_time)
      document.getElementById('messages').innerHTML = '';
      let price;
      for(i=0;i<price_total.length;i++)
      {
        price = parseInt((price_day[i].textContent).match(/(\d+)/)[0])
        price_total[i].style.visibility = 'visible';
        price_total[i].textContent = 'Total R$'+ price*dif_time+',00'; 
      }
    }
  
  }
}
