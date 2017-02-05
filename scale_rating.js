(function($) {

Drupal.behaviors.scaleRating = {
  attach: function (context, settings) {
    for (var fieldName in settings.scaleRating.fields) {
      var fieldSettings = settings.scaleRating.fields[fieldName];
      // var fieldName = settings.scaleRating.fields[i];
      $("input[name*='" + fieldName + "']").each(function() {
        // Use this <input .. /> field's id attribute value to generate the prefix
        // value for the slider element.
        var name = $(this).attr('id') + '-slider';
        // The slider element is created dynamically in the event that the user does
        // not have Javascript enabled, the fallback would allow for the <input ... />
        // to persist and be used for entering the value.
        var element = $('<div>');
        element.attr('id', name);
        // Add the slider element to this field's wrapper.
        $(this).parent().append(element);
        // Initialize the slider itself.
        element.slider({
          value: $(this).attr('value'),
          min: fieldSettings.minimum,
          max: fieldSettings.maximum,
          step: 1,
          slide: (function(input) {
            /**
             * Callback function to update the <input type="text" ... /> element
             * when the slider is moved.
             */
            return function(event, ui) {
              input.attr('value', ui.value);
            };
          })($(this))
        });
        // Do not display the <input type="text" .../> element.
        $(this).hide();
      });
    }
  }

};

})(jQuery);