        /*R.  York, Web development with jQuery, 2nd ed. Indianapolis, Ind.: Wiley, 2015, pp. 294-308.*/
        $.fn.extend({
            outerHTML: function() {
                //creates first plugin
                var temporary = $("<div/>").append($(this).clone());
                var html = temporary.html();
                temporary.remove();
                return html;
            },
            enableDragAndDrop: function() {
                //creates second plugin
                return this.each(
                    function() {
                        if (typeof this.style.WebkitUserDrag != 'undefined') {
                            this.style.WebkitUserDrag = 'element';
                        }
                        if (typeof this.draggable != 'undefined') {
                            this.draggable = true;
                        }
                        //makes sure draggable can be done on browser
                        if (typeof this.dragDrop == 'function') {
                            this.dragDrop();
                        }
                    }
                );
            }
        });
        var fileCount = 0;
        var rowCount = 0;
        dragAndDrop = {
            files: [],
            /**
             * Displays a div that aligns all of the currently uploaded images
             * in a grid pattern to the user along with use current location 
             * button, type location of images and finish upload.
             * @param  {File} files the File object of the images to be changed
             */
            openProgressDialogue: function(files) {
                $('div#finderDragAndDropDialogue').fadeIn('fast');
                this.files = [];
                for (var i = 0; i < files.length; i++) {}
                $(files).each(
                    function(key, file) {
                        fileCount++;
                        dragAndDrop.addFileToQueue(file);
                    }
                );
                if (this.files.length) {
                    $(files).each(function(index, file) {
                        setTimeout(upload(file), 30000);
                    });
                }
            },
            /**
             * Adds images to a queus to be verified and converted.Also this 
             * function establishes where each image will be positioned, in 
             * progress dialogue, based on the order of uploaded.
             * @param {File} file the image to be added to queue.
             */
            addFileToQueue: function(file) {
                var imagesRow = $("div.dialogueFileImage");
                var namesRow = $("div.dialogueFileName");
                $("div.dialogueFileImage").show();
                $("div.dialogueFileName").show();

                if (!file.name && file.fileName) {
                    file.name = file.fileName;
                }

                if (!file.size && file.fileSize) {
                    file.size = file.fileSize;
                }
                checkFile(file.name);
                this.files.push(file);
                if (isRowFull()) {
                    imagesRow.removeClass('dialogueFileImage');
                    namesRow.removeClass('dialogueFileName');

                    var filenameRowCount = rowCount + 1;
                    imagesRow.css({
                        "order": rowCount,
                        "display": "flex",
                        "flex-direction": "row",
                        "justify-content": "space-around"
                    });
                    namesRow.css({
                        "order": filenameRowCount,
                        "display": "flex",
                        "flex-direction": "row",
                        "justify-content": "space-around"
                    });
                    $("div.dialogueFooter").css("order", rowCount + 2);
                    rowCount++;
                    imagesRow = $("div.dialogueFileImageTemplate").clone(true);
                    namesRow = $("div.dialogueFileNameTemplate").clone(true);

                    imagesRow.removeClass('dialogueFileImageTemplate');
                    namesRow.removeClass('dialogueFileNameTemplate');

                    imagesRow.addClass('dialogueFileImage');
                    namesRow.addClass('dialogueFileName');
                }
                // Preview image uploads by showing a thumbnail of the image
                if (file.type.match(/^image\/.*$/) && FileReader) {
                    addImageToCell(imagesRow, file);
                    addNameToCell(namesRow, file);
                }
                $('div#finderDragAndDropDialogueFiles').append(imagesRow);
                $('div#finderDragAndDropDialogueFiles').append(namesRow);
            },
            http: null,
            getFileName: function(file) {
                var last = file.lastIndexOf('.');
                if (last == -1) {
                    console.log("last was -1");
                    return null;
                }
                var result = file.slice(0, last);
                if (result.localeCompare('""') == 0) {
                    console.log("blank ");
                    return null;
                }
                return result;
            },

            applyEvents: function() {
                var context = null;
                if (arguments[0]) {
                    context = arguments[0];
                } else {
                    context = $('div.finderDirectory, div.finderFile');
                }
                context.on(
                    'dragstart.finder',
                    function(event) {
                        event.stopPropagation();
                        var html = $(this).outerHTML();
                        var dataTransfer = event.originalEvent.dataTransfer;
                        dataTransfer.effectAllowed = 'copyMove';
                        try {
                            dataTransfer.setData('text/html', html);
                            dataTransfer.setData('text/plain', html);
                        } catch (error) {
                            dataTransfer.setData('Text', html);
                        }
                    }
                ).on(
                    'dragend.finder',
                    function(event) {
                        if ($('div.finderDirectoryDrop').length) {
                            $(this).removeClass('finderDirectoryDrop');
                            $(this).remove();
                        }
                    }
                ).on(
                    'dragenter.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                ).on(
                    'dragover.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if ($(this).is('div.finderDirectory')) {
                            $(this).addClass('finderDirectoryDrop');
                        }
                    }
                ).on(
                    'dragleave.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).removeClass('finderDirectoryDrop');

                    }
                ).on(
                    'drop.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var dataTransfer = event.originalEvent.dataTransfer;
                        var drop = $(this);
                        if (drop.hasClass('finderDirectory')) {
                            if (dataTransfer.files && dataTransfer.files.length) {
                                // Files dropped from outside the browser
                                dragAndDrop.openProgressDialogue(dataTransfer.files);
                            } else {
                                try {
                                    var html = dataTransfer.getData('text/html');
                                } catch (error) {
                                    var html = dataTransfer.getData('Text');
                                }
                                html = $(html);
                                var dontAcceptTheDrop = (
                                    drop.is('div.finderFile')
                                );
                                if (dontAcceptTheDrop) {
                                    // Prevent file from being dragged onto itself
                                    drop.removeClass('finderDirectoryDrop');
                                    return;
                                }
                                if (html.hasClass('finderDirectory finderFile')) {
                                    // Do something with the dropped file
                                    console.log(html);
                                }
                            }
                        }
                    }
                ).on(
                    'click',
                    function(event) {
                        var files = dragAndDrop.files;
                        //finishe of not done
                    }
                );
            }
        };

        /*Determins what cell the image should be added to.
        imagesRow: the row the image is to be added to
        file: the image file to be added and displayed in the row.*/
        function addImageToCell(imagesRow, file) {
            var numberQueue = fileCount % 4;
            var img = document.createElement('img');
            switch (numberQueue) {
                case 1:
                    //first image A1
                    imagesRow.find('div.dialogueFileImageA1')
                        .html(img);
                    break;
                case 2:
                    //second image B1
                    imagesRow.find('div.dialogueFileImageB1')
                        .html(img);
                    break;
                case 3:
                    //3rd image C1
                    imagesRow.find('div.dialogueFileImageC1')
                        .html(img);
                    break;
                case 0:
                    //4th image D1
                    imagesRow.find('div.dialogueFileImageD1')
                        .html(img);
                    break;
            }
            img.file = file;
            var reader = new FileReader();
            reader.onload = function(event) {
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
            imagesRow.attr('title', file.name);
        }

        /*Determins the cell to add the image name to.
        namesRow: the row to add the image names to
        file: the image file to name.*/
        function addNameToCell(namesRow, file) {
            var numberQueue = fileCount % 4;
            var img = document.createElement('img');
            switch (numberQueue) {
                case 1:
                    //first image A1
                    namesRow.find('div.dialogueFileNameA2')
                        .text(dragAndDrop.getFileName(file.name));
                    $("div.dialogueFileNameA2").attr('title', file.name);
                    break;
                case 2:
                    //second image B1
                    namesRow.find('div.dialogueFileNameB2')
                        .text(dragAndDrop.getFileName(file.name));
                    $("div.dialogueFileNameB2").attr('title', file.name);
                    break;
                case 3:
                    //3rd image C1
                    namesRow.find('div.dialogueFileNameC2')
                        .text(dragAndDrop.getFileName(file.name));
                    $("div.dialogueFileNameC2").attr('title', file.name);
                    break;
                case 0:
                    //4th image D1
                    namesRow.find('div.dialogueFileNameD2')
                        .text(dragAndDrop.getFileName(file.name));
                    $("div.dialogueFileNameD2").attr('title', file.name);
                    break;
            }
        }

        /*Checks if there are 4 images in the current row, if there is the function 
        returns true, else false.*/
        function isRowFull() {
            var rowLength = (fileCount - 1) % 4;
            if (rowLength == 0) {
                return true;
            } else {
                return false;
            }
        }

        function upload(file) {
            imgur.upload(file);
        }

        /*Checks a file to see if it is a image. Displays a alert to the user the file 
        is not a image.
        Parameters:
            file - a file name with attatched file extension.
        Returns:
            true if the file is a image, false is not a image*/
        function checkFile(file) {
            var extension = file.lastIndexOf('.');
            if (extension == -1) {
                console.log("%c problem reading file extension", "color: red");
                return false;
            }
            var ext = file.slice(extension);
            if (!isImage(ext)) {
                var message = "Sorry, we only accept images of type png, jpg, " +
                    "and gif and not '" + ext + "'"
                errorMessage(message);
                return false;
            }
            return true;
        }

        /*Takes a given file extension and determins if it is a image. If fileExtension
        is image returns true else false.
        Parameters:
            fileExtension - String file a file extension
        Returns:
            true if fileExtension is png, jpg, or gif, false otherwise.*/
        function isImage(fileExtension) {
            switch (fileExtension.toLowerCase()) {
                case ".jpg":
                case ".png":
                case ".gif":
                    return true;
            }
            return false;
        }

        /*Is given a message and creates a alert to display to the user on the website
        Parameters:
            message - A string that contains the message to be displayed.
        Returns:
            false to indicate function being completed.*/
        function errorMessage(message) {
            alert(message);
            return false;
        }

        function finalUpload(locationId, photoId) {
            // for (var i = 0; i < photoId.length; i++) {
            $.post('backend/finalUpload.php', {
                "locationId": locationId,
                "photoId": photoId
            }, function(data) {
                /*optional stuff to do after success */
            });
            // }
        }


        $(document).ready(
            function() {
                var currentLocationUsed = false;
                var locationId;
                var userUploads = new Array();
                $(document).on(
                    'mousedown.finder',
                    'div.finderDirectory, div.finderFile',
                    function(event) {
                        $(this).enableDragAndDrop();

                        $('div.finderIconSelected')
                            .removeClass('finderIconSelected');

                        $('span.finderDirectoryNameSelected')
                            .removeClass('finderDirectoryNameSelected');

                        $(this).find('div.finderIcon')
                            .addClass('finderIconSelected');

                        $(this).find('div.finderDirectoryName span')
                            .addClass('finderDirectoryNameSelected');
                    }
                );
                dragAndDrop.applyEvents();
                $('div#finderFiles').on(
                    'dragenter.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        //added myself
                        $(this).css({
                            "background-color": "#ffffff",
                            "border-style": "solid"
                        });

                    }
                ).on(
                    'dragover.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).addClass('finderDirectoryDrop');
                    }
                ).on(
                    'dragleave.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).removeClass('finderDirectoryDrop');
                        //added myself
                        $(this).css({
                            "background-color": "#e7e6e6",
                            "border-style": "dashed"
                        });
                    }
                ).on(
                    'drop.finder',
                    function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        var dataTransfer = event.originalEvent.dataTransfer;
                        var drop = $(this);
                        if (dataTransfer.files && dataTransfer.files.length) {
                            dragAndDrop.openProgressDialogue(dataTransfer.files);
                        } else {
                            try {
                                var html = dataTransfer.getData('text/html');
                            } catch (error) {
                                var html = dataTransfer.getData('Text');
                            }
                            html = $(html);
                            if (!html.hasClass('finderDirectory finderFile')) {
                                return;
                            }
                            if (!fileExists) {
                                dragAndDrop.applyEvents(html);
                                drop.append(html);
                            }
                        }
                    }
                );
                $('#fileChooserButton').on('click', function() {
                    $("#fileChooserInput").click();
                });
                $("input:file").change(function() {
                    var input = $("input:file");
                    var fileNumber = input[0].files.length;
                    var fileNames = [];
                    for (var i = 0; i < fileNumber; i++) {
                        var currentName = input[0].files[i].name;
                        fileNames.push(dragAndDrop.getFileName(currentName));
                        if (currentName === "") {
                            //error deal with here
                        }
                    }
                    dragAndDrop.openProgressDialogue(input[0].files);
                });
                $("#add").on('click', function() {
                    $("#fileChooserInput").click();
                });
                /**
                 * When the "Use current Location" button is clicked, using 
                 * HTML5 geolocationthe current users location is received and 
                 * then sent off to the database to be stored in the Location 
                 * table. 
                 */
                $("#currentLocation").on('click', function() {
                    currentLocationUsed = true;
                    getCurrentLocation();
                    navigator.geolocation.getCurrentPosition(function(location) {
                        $.post('backend/location.php', {
                            "lat": location.coords.latitude,
                            "lng": location
                                .coords.longitude
                        }, function(response) {
                            locationId = response;
                        });
                    });
                });
                $("#finish-button").click(function() {
                    var count = 0;
                    if ($("input[name=locationSet]").prop('checked')) {
                        $.post('backend/location.php', {
                                'lat': locationJson.lat,
                                'lng': locationJson.lng
                            }, function(data) {
                                locationId = data;
                            })
                            .done(function(data) {
                                for (var i = 0; i < imgur.numberOfFiles; i++) {
                                    console.log("%c locationId-if: " + locationId,
                                        "color: orange");
                                    $.post('backend/uploadPhotos.php', {
                                            "photoAddress": imgur.array[i],
                                            "locationId": locationId
                                        }, function(response) {
                                            potato = response;
                                            userUploads.push(potato);
                                        })
                                        .done(function(data) {
                                            console.log(userUploads);
                                            finalUpload(locationId, userUploads[count]);
                                            count++;
                                        });
                                }
                            });
                    } else {
                        for (var i = 0; i < imgur.numberOfFiles; i++) {
                            console.log("%c locationId-else: " + locationId,
                                "color: orange");
                            $.post('backend/uploadPhotos.php', {
                                    "photoAddress": imgur.array[i],
                                    "locationId": locationId
                                }, function(response) {
                                    potato = response;
                                    userUploads.push(potato);

                                })
                                .done(function(data) {
                                    console.log(userUploads);
                                    finalUpload(locationId, userUploads[count]);
                                    count++;
                                });
                        }
                    }
                });
            }
        );
