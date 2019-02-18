function groupBy(array, f) {
  var groups = {};
  array.forEach(o => {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(group => {
    return groups[group];
  });
}

const regExID = str => {
  let convertedString = str.replace(/[^\w\.@-]/g, "");
  return convertedString;
};

const regExURL = str => {
  let convertedString = str.match(
    /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g
  );
  if (convertedString) {
    return convertedString[0];
  }
  return "#";
};

const regExNoURL = str => {
  const conv = str.split(
    /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g
  );
  return conv[0];
};

$(document).ready(() => {
  $("#download-button").click(() => {
    $("html, body").animate(
      {
        scrollTop: $("#scroll-here").offset().top
      },
      2000
    );
  });
  $.ajax({
    url: "https://hale-treat-133723.appspot.com/calendar",
    type: "GET",
    dataType: "JSON",
    "Access-Control-Allow-Origin": "*"
  }).done(response => {
    if (!response.items || response.items.length === 0) {
      $("#calendarFill").append(
        '<div class="row"><div class="col s12 center"><h3 class="brown-text">Upcoming Productions listed here</h3></div></div>'
      );
      return;
    }
    let operas = groupBy(response.items, item => {
      return [item.summary];
    });
    for (let i = 0; i < operas.length; i++) {
      console.log(operas[i]);
      $("#calendarFill").append(
        '<div class="row" id="' +
          regExID(operas[i][0].summary) +
          '"><div class="col s12 center"><h5 class="brown-text">' +
          operas[i][0].summary +
          "</h5><p>" +
          regExNoURL(operas[i][0].description) +
          "</p></div></div>"
      );
      let activeID = operas[i];
      let url = undefined;
      if (activeID[0] && activeID[0].description) {
        console.log(activeID[0].description);
        url = regExURL(activeID[0].description);
      }
      for (let k = 0; k < activeID.length; k++) {
        $("#" + regExID(activeID[k].summary)).append(
          '<div class="col s12 m6 l4 center calendar-ajax ' +
            regExID(activeID[k].summary) +
            '"><div class="card teal lighten-1 z-depth-2 text-black"><div class="card-content white-text"><span class="card-title">' +
            activeID[k].summary +
            '</span><p class="calendar-date">' +
            moment(activeID[k].start.dateTime, moment.ISO_8601).format(
              "MMM-DD-YYYY",
              "en"
            ) +
            '</p><p class="calendar-time">' +
            moment(activeID[k].start.dateTime, moment.ISO_8601).format(
              "hh:mm a"
            ) +
            `</p><div class="card-action"><a class="btn waves-effect waves-light brown lighten-1" href="${url}">Info and Tickets</a></div></div></div>`
        );
      }
    }
  });
});
