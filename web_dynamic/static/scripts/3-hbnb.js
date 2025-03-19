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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data) {
      $('section.places').empty();
      $('section.places').append(data.map(place => {
        return `
<article>
  <div class="title_box">
    <h2>${place.name}</h2>
  <div class="price_by_night">$${place.price_by_night}</div>
  </div>
  <div class="information">
    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
  </div>
  ${place.user ? `<div class="user"><b>Owner:</b> ${place.user.first_name} ${place.user.last_name}</div>` : ''}
  <div class="description">${place.description}</div>
</article>`;
      }).join(''));
    }
  });
});
