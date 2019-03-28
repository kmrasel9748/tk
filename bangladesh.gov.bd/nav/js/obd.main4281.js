/**
 * Created by Md. Munir Hossain
 */
 var host = 'https://bangladesh.gov.bd/';
function getSelectValue(officeType,officeTypeSubList){
                    var officeType = document.getElementById(officeType);
                    var officeTypeSubList = document.getElementById(officeTypeSubList);
                    officeTypeSubList.innerHTML = "";
                if(officeType.value=='divisional' || officeType.value=='districal' || officeType.value=='upazilaBatayon' || officeType.value=='unionBatayon'){
                    var optionArray = ["|বিভাগ নির্বচন করুন",
                                       "www.chittagongdiv.gov.bd|চট্টগ্রাম বিভাগ",
                                       "www.rajshahidiv.gov.bd|রাজশাহী বিভাগ",
                                       "www.khulnadiv.gov.bd|খুলনা বিভাগ",
                                       "www.barisaldiv.gov.bd|বরিশাল বিভাগ",
                                       "www.sylhetdiv.gov.bd|সিলেট বিভাগ",
                                       "www.dhakadiv.gov.bd|ঢাকা বিভাগ",
                                       "www.rangpurdiv.gov.bd|রংপুর বিভাগ",
                                       "www.mymensinghdiv.gov.bd|ময়মনসিংহ বিভাগ"
                                      ];
                }
                for(var option in optionArray){
                    var pair = optionArray[option].split("|");
                    var newOption = document.createElement("option");
                    newOption.value = pair[0];
                    newOption.innerHTML = pair[1];
                    officeTypeSubList.options.add(newOption);
                }
            }

jQuery(document).ready(function($){
    $('#newNavigation').html('<div id="selectValue"><div class="officeType"><select id="officeType" onchange="getSelectValue(this.id,\'officeTypeSubList\')"><option value="">অফিসের ধরণ</option><option value="ministry">মন্ত্রণালয়/বিভাগ</option><option value="directorate">অধিদপ্তর বাতায়ন</option><option value="divisional">বিভাগীয় বাতায়ন</option><option value="districal">জেলা বাতায়ন</option><option value="upazilaBatayon">উপজেলা বাতায়ন</option><option value="unionBatayon">ইউনিয়ন বাতায়ন</option><option value="otherOfficeList">অন্যান্য</option></select></div><div class="officeTypeSubList"><select id="officeTypeSubList"></select></div><div class="ministry-list"><select id="ministry-list"></select></div><div class="directorate-list"><select id="directorate-list"></select></div><div class="otherOffices-list"><select id="otherOffices-list"></select></div><div class="division-office-list"><select id="division-office-list"></select></div><div class="district-list"><select id="district-list"></select></div><div class="district-office-list"><select id="district-office-list"></select></div><div class="upazila-list"><select id="upazila-list"></select></div><div class="upazila-office-list"><select id="upazila-office-list"></select></div><div class="union-list"><select id="union-list"></select></div><div><button id="go">Go</button></div></div>');

    $('#officeType').select2().show();
    $('.officeTypeSubList').hide();
    $('.ministry-list').hide();
    $('.directorate-list').hide();
    $('.otherOffices-list').hide();
    $('.division-office-list').hide();
    $('.district-list').hide();
    $('.district-office-list').hide();
    $('.upazila-list').hide();
    $('.upazila-office-list').hide();
    $('.union-list').hide();

    $('#go').on('click',function(){
        var s;
        $('#newNavigation option:selected').each(function(){
            if($(this).css('display')!='none'){
                s = $(this).val();
            }
        });
        var link = 'http://'+s;
        var rem_link = '.portal';
        var replace_link = link.replace(rem_link,'');
        window.open (replace_link,'_self');
    });

    $('#officeType').on('change',function(){
         var value = $("#officeType option:selected").val();
         console.log(value);
         if(value == 'ministry'){
            loadAllMinistry('nav/all.ministry.php');
         }
         else if(value == 'directorate'){
            loadAllDirectorate('nav/all.directorate.php');
         }
         else if(value == 'otherOfficeList'){
            loadAllotherOffices('nav/all.other.offices.php');
         }
         else if(value == 'divisional' || value == 'districal' || value == 'upazilaBatayon' || value == 'unionBatayon'){
            $('.officeTypeSubList').show();
            $('.officeTypeSubList select').select2().show();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
         }
    });

    $('#officeTypeSubList').on('change',function(){
        var value1 = $("#officeType option:selected").val();         
        var value = $("#officeTypeSubList option:selected").val();
        if(value1 == 'divisional'){
            loadDivisionInfoList('nav/division.office.php',value); 
         }
        else if(value1 == 'districal' || value1 == 'upazilaBatayon' || value1 == 'unionBatayon'){
            loadDistrictInfoList('nav/district.list.php',value); 
         }        
    });    
});

function loadAllMinistry(fileName){
    // alert(host+fileName);
    $.ajax({
        type: 'POST',
        url: host+fileName,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').hide();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
        },
        success: function (data) {

            $('#newNavigation').find('.ministry-list select').html(data);
            $('#newNavigation').find('.ministry-list').show();
            $('#newNavigation').find('.ministry-list select').select2().show();
        }
    });
}

function loadAllDirectorate(fileName){
    // console.log(host+fileName);
    $.ajax({
        type: 'POST',
        url: host+fileName,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').hide();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
        },
        success: function (data) {
            $('#newNavigation').find('.directorate-list select').html(data);
            $('#newNavigation').find('.directorate-list').show();
            $('#newNavigation').find('.directorate-list select').select2().show();
        }
    });
}

function loadAllotherOffices(fileName){
    console.log(host+fileName);
    $.ajax({
        type: 'POST',
        url: host+fileName,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').hide();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide(); 
        },
        success: function (data) {
            $('#newNavigation').find('.otherOffices-list select').html(data);
            $('#newNavigation').find('.otherOffices-list').show();
            $('#newNavigation').find('.otherOffices-list select').select2().show();
        }
    });
}

function loadDivisionInfoList(fileName,domain){
    $.ajax({
        type: 'POST',
        url: host+fileName+'?domain='+domain,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').show();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
        },
        success: function (data) {
            $('#newNavigation').find('.division-office-list select').html(data);
            $('#newNavigation').find('.division-office-list').attr('parent-data-domain',domain).show();
            $('#newNavigation').find('.division-office-list select').attr('parent-data-domain',domain).select2().show();
        }
    });
}


function loadDistrictInfoList(fileName,domain){
    $.ajax({
        type: 'POST',
        url: host+fileName+'?domain='+domain,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').show();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').hide();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
        },
        success: function (data) {
            $('#newNavigation').find('.district-list select').html(data);
            $('#newNavigation').find('.district-list').attr('parent-data-domain',domain).show();
            $('#newNavigation').find('.district-list select').attr('parent-data-domain',domain).select2().show();

             $('#district-list').on('change',function(){
             var value = $("#district-list option:selected").val();
             var value1 = $("#officeType option:selected").val();
             console.log(value1);
        if(value1 == 'districal'){
             loadDistrictList('nav/district.office.php',value); 
         }
        else if(value1 == 'upazilaBatayon' || value1 == 'unionBatayon'){
             loadUpazilaInfoList('nav/upazila.list.php',value); 
         }
     });
        }
    })
}

function loadDistrictList(fileName,domain){
    $.ajax({
        type: 'POST',
        url: host+fileName+'?domain='+domain,
        beforeSend: function () {
            // $('#officeType').select2().show();
            $('.officeTypeSubList').show();
            $('.ministry-list').hide();
            $('.directorate-list').hide();
            $('.otherOffices-list').hide();
            $('.division-office-list').hide();
            $('.district-list').show();
            $('.district-office-list').hide();
            $('.upazila-list').hide();
            $('.upazila-office-list').hide();
            $('.union-list').hide();
        },
        success: function (data) {
            $('#newNavigation').find('.district-office-list select').html(data);
            $('#newNavigation').find('.district-office-list').attr('parent-data-domain',domain).show();
            $('#newNavigation').find('.district-office-list sele