/* global $ */
$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    $('.amenities h4').text(Object.values(amenities).join(', '));
  });

  // Check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
