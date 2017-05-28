var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();
var $form = $('.box');
var $input    = $form.find('input[type="file"]'),
    $label    = $form.find('label'),
    showFiles = function(files) {
      $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
    };
$input.on('change', function(e) {
  showFiles(e.target.files);
});




if (isAdvancedUpload) {
	
	$form.addClass('has-advanced-upload').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	  })
	//var droppedFiles = false;
	
	
	  .on('dragover dragenter', function() {
	    $form.addClass('is-dragover');
	  })
	  .on('dragleave dragend drop', function() {
	    $form.removeClass('is-dragover');
	  })
	  .on('drop', function(e) {
	    droppedFiles = e.originalEvent.dataTransfer.files;
	    showFiles( droppedFiles );
	  });
}

