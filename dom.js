$(async () => {

  settings = await $.getJSON("./settings.json");
  $("#play").click(() => {
    $("#buttons").fadeOut(500, async () => {
      $("#play-settings").fadeIn(500);
    });
  });

  $("#play-game").click(() => {
    $("#play-settings").fadeOut(1000, () => {
      game = new Game();
      loop();
    });
  });

  $("#settings-button").click(() => {
    $("#buttons").fadeOut(500, () => {
      $("#settings").fadeIn(500);
    });
  });

  $("#how-to-play-button").click(() => {
    $("#buttons").fadeOut(500, () => {
      $("#how-to-play").fadeIn(500);
    });
  });

  $(".back").click(function () {
    $(this).parents("#how-to-play, #play-settings, #settings")
      .fadeOut(500, () => {
        $("#buttons").fadeIn(500);
      });
  });

  $(".player-div").each(function () {
    const display = settings[this.id].display;
    const colors = settings[this.id].colors;
    for (const row of display) {
      const rowdom = $("<div><div>").appendTo(this);
      for (const pixel of row) {
        const color = pixel == 0 ? [0, 0, 0, 0] : colors[pixel - 1];
        rowdom.append(`<div class="pixel" style="background: rgb(${color.join()});"><div>`);
      }
    }
  });

  $(".player-div").click(function () {
    if (players.has(this.id)) {
      if (players.size == 3) {
        $(this).removeClass("player-selected");
        players.delete(this.id);
      }
    } else {
      $(this).addClass("player-selected");
      players.add(this.id);
    }
  });

});