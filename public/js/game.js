var Game = {};
Game.init = function() {
  game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
  game.load.image('sprite', 'assets/sprites/sprite.png'); // player
};

Game.create = function() {
  var map = game.add.tilemap('map');
  map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

  var layer;
  for (var i = 0; i < map.layers.length; i++) {
    layer = map.createLayer(i);
  }
  layer.inputEnabled = true;  // Allows clicking on the map
};