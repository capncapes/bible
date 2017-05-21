bibleBook = 'Genesis';
ch = 1;
translation = 'asv';

$('#chapters .ch_nr:first').addClass('active');

// jQuery API call for chapters
jQuery.ajax({
    url: 'http://getbible.net/json',
    dataType: 'jsonp',
    data: 'p=' + bibleBook,
    jsonp: 'getbible',
    success: function(json){
        // Set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr';
        }
        // Check response type
        if (json.type == 'book'){
            var output = '';
            jQuery.each(json.book, function(index, value) {
                output += '<span class="ch_nr">' + value.chapter_nr + '</span>';
                jQuery('#chapters').html(output);
        });
      }
    },
    error:function(){
        jQuery('#chapters').html('<h3>No chapters found! Please try again.</h3>');
     },
});

// Set the book of the Bible
$(document).on('click', '.bible_btn', function(){
    
});

// Set the book and chapter number
$(document).on('click', '.ch_nr', function(){
    $('#chapters').children().removeClass('active');
    $(this).addClass('active');
    var chNum = $(this).html();
    var num = parseInt(chNum);
    ch = num;
    
    // jQuery API call for scriptures
    jQuery.ajax({
        url: 'http://getbible.net/json',
        dataType: 'jsonp',
        data: 'p=' + bibleBook + ch + '&v=' + translation,
        jsonp: 'getbible',
        success: function(json){
            // Set text direction
            if (json.direction == 'RTL'){
                var direction = 'rtl';
            } else {
                var direction = 'ltr';
            }
            // Check response type
            if (json.type == 'verse'){
                var output = '';
                    jQuery.each(json.book, function(index, value) {
                        output += '<h2>' + value.book_name + ' ' + value.chapter_nr+'</h2><br/><p class="' + direction + '">';
                        jQuery.each(value.chapter, function(index, value) {
                            output += '<sup class="ltr">' + value.verse_nr + '</sup>';
                            output += value.verse;
                            output += '<br/>';
                        });
                        output += '</p>';
                    });
                jQuery('#scripture').html(output);
            } else if (json.type == 'chapter'){
                var output = '<h2>' + json.book_name + ' ' + json.chapter_nr + '</h2><br/><p class="' + direction + '">';
                jQuery.each(json.chapter, function(index, value) {
                    output += ' ' + '<sup class="ltr">' + value.verse_nr + '</sup>';
                    output += value.verse;
                    output += '<br>';
                });
                output += '</p>';
                jQuery('#scripture').html(output);
            } else if (json.type == 'book'){
                var output = '';
                jQuery.each(json.book, function(index, value) {
                    output += '<h2>' + json.book_name + ' ' + value.chapter_nr + '</h2><br/><p class="' + direction + '">';
                    jQuery.each(value.chapter, function(index, value) {
                        output += '  <sup class="ltr">' + value.verse_nr + '</sup>  ';
                        output += value.verse;
                        output += '<br/>';
                    });
                output += '</p>';
            });
          }
        },
        error:function(){
            jQuery('#scripture').html('<h3>No scripture found! Please try again.</h3>');
         },
    })
});


// jQuery API call for scriptures
jQuery.ajax({
    url: 'http://getbible.net/json',
    dataType: 'jsonp',
    data: 'p=' + bibleBook + ch + '&v=' + translation,
    jsonp: 'getbible',
    success: function(json){
        // Set text direction
        if (json.direction == 'RTL'){
        	var direction = 'rtl';
        } else {
        	var direction = 'ltr';
        }
        // Check response type
        if (json.type == 'verse'){
            var output = '';
            	jQuery.each(json.book, function(index, value) {
                	output += '<h2>' + value.book_name + ' ' + value.chapter_nr+'</h2><br/><p class="' + direction + '">';
                    jQuery.each(value.chapter, function(index, value) {
                        output += '<sup class="ltr">' + value.verse_nr + '</sup>';
                        output += value.verse;
                        output += '<br/>';
                    });
                    output += '</p>';
            	});
            jQuery('#scripture').html(output);
        } else if (json.type == 'chapter'){
            var output = '<h2>' + json.book_name + ' ' + json.chapter_nr + '</h2><br/><p class="' + direction + '">';
            jQuery.each(json.chapter, function(index, value) {
                output += ' ' + '<sup class="ltr">' + value.verse_nr + '</sup>';
                output += value.verse;
                output += '<br/>';
            });
            output += '</p>';
            jQuery('#scripture').html(output);
        } else if (json.type == 'book'){
            var output = '';
            jQuery.each(json.book, function(index, value) {
                output += '<h2>' + json.book_name + ' ' + value.chapter_nr + '</h2><br/><p class="' + direction + '">';
                jQuery.each(value.chapter, function(index, value) {
                    output += '  <sup class="ltr">' + value.verse_nr + '</sup>  ';
                    output += value.verse;
                    output += '<br/>';
                });
            output += '</p>';
        });
      }
    },
    error:function(){
        jQuery('#scripture').html('<h3>No scripture found! Please try again.</h3>');
     },
});