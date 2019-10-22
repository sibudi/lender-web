








var segment_str = window.location.pathname;
var segment_array = segment_str.split( '/' );
var last_segment = segment_array.pop();
switch(last_segment) {
case 'it.html':
    var response = {
        "status": 200,
        "status_message": "Item Found",
        "data": [
            {
                "object_id": "72",
                "term_taxonomy_id": "6",
                "term_order": "0",
                "ID": "72",
                "post_author": "1",
                "post_date": "2019-06-24 09:42:12",
                "post_date_gmt": "2019-06-24 09:42:12",
                "post_content": "<ul>\n \t<li class=\"sans\">\n<pre>Requirment:</pre>\n</li>\n \t<li class=\"sans\">\n<pre>Deskripsi :</pre>\n</li>\n</ul>",
                "post_title": "IT Support",
                "post_excerpt": "",
                "post_status": "publish",
                "comment_status": "closed",
                "ping_status": "closed",
                "post_password": "",
                "post_name": "it-support",
                "to_ping": "",
                "pinged": "",
                "post_modified": "2019-06-30 13:42:02",
                "post_modified_gmt": "2019-06-30 13:42:02",
                "post_content_filtered": "",
                "post_parent": "0",
                "guid": "https://reddish-tolerance.000webhostapp.com/?post_type=job_listing&#038;p=72",
                "menu_order": "0",
                "post_type": "job_listing",
                "post_mime_type": "",
                "comment_count": "0",
                "term_id": "6",
                "name": "IT",
                "slug": "it",
                "term_group": "0"
            }
        ]
    }
    break;
case 'collection.html':
    var response = {
        "status": 200,
        "status_message": "Items Not Found",
        "data": null
    };
    break;
case 'finance.html':
    var response=
    {
        "status": 200,
        "status_message": "Items Not Found",
        "data": null
    };
    break;
case 'hr-legal.html':
    var response = {
        "status": 200,
        "status_message": "Items Not Found",
        "data": null
    };
    break;
case 'marketing.html':
    var response = {
        "status": 200,
        "status_message": "Items Not Found",
        "data": null
    };
    break;
case 'risk.html':
    var response = {
        "status": 200,
        "status_message": "Items Not Found",
        "data": null
    };
    break;

  default:
  
}




     if (response.status_message!="Item Found"){
          var tr=document.createElement('tr');
          var td_notFound=document.createElement('td');
          $(td_notFound).attr("colspan", "3");
          td_notFound.innerHTML='Maaf Data Tidak Ditemukan';
          (tr).append(td_notFound);
          document.getElementById("insert").appendChild(tr);   

      }

      else{
    myLength = Object.keys(response.data).length;
  

  for (count=0;count<myLength;count++){
                  var tr_1=document.createElement('tr');
                  var tr_2=document.createElement('tr');
                      tr_2.id='detailsRow_12'+count;
                      tr_2.className='collapse';
                  var td_1=document.createElement('td');
                      td_1.innerHTML=response.data[count].post_title;
                  var td_2=document.createElement('td');
                      td_2.innerHTML='Full Time';
                  var a_1=document.createElement('a');
                      a_1.className='add_toggle';
                      $(".add_toggle").attr("data-toggle", "collapse");
                  var b_1=document.createElement('b');
                      b_1.classList.add('btn','btn-primary');
                      b_1.id='b_1';
                      $(b_1).attr("data-toggle", "modal");
                      $(b_1).attr("data-target", "#informationModal");
                      b_1.innerHTML='&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspApply&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
                  var a_2=document.createElement('a');
                      a_2.id='a_2';
                      $(a_2).attr("data-toggle", "collapse");
                      a_2.href='#detailsRow_12'+count;
                      $(a_2).attr("aria-expanded", "false");
                      $(a_2).attr("aria-controls", "detailsRow_12"+count);
                  var b_2=document.createElement('b');
                      b_2.classList.add('btn','btn-warning');
                      b_2.innerHTML='See Position';
                  var td_4=document.createElement('td');
                      td_4.id='td_4';
                      $(td_4).attr("colspan", "5");
                      td_4.className="sans"
                      td_4.innerHTML=response.data[count].post_content;
                  var td_3=document.createElement('td');
                  a_1.appendChild(b_1);
                  a_2.appendChild(b_2);
                  td_3.appendChild(a_1);
                  td_3.appendChild(a_2);
                  tr_1.appendChild(td_1);
                  tr_1.appendChild(td_2);
                  tr_1.appendChild(td_3);
                  tr_2.appendChild(td_4);     
                  count++; 
                  document.getElementById("insert").appendChild(tr_1);
                  document.getElementById("insert").appendChild(tr_2);     
  }
  
  
    }



