
/**
 * Some common function and properties for all item
 * @author Lixus3d <developpement@adreamaline.com>
 * @date 19 nov. 2011
 */

ABSTRACTS.itemAbstract = function(){

    /*
     * Default variables
     */
    this.id = 0; // unit "number" in the RTS
    this.x = 0;
    this.y = 0;
    this.unitSize = 64;
    this.centerOffset = this.unitSize/-2;
    this.yOffset = 0;
    this.zIndexOffset = 0;
    this.team = null;
    this.selected = false;

    /*
     * Life
     */
    this.inLife = true;
    this.life = 500;


    /*
     * Graphics orientation
     */
    this.orientation = 'default';
    this.lastOrientation = 'default';

    this.turretOrientation = 'default';
    this.lastTurretOrientation = 'default';

    /*
     * Jquery graphics
     */
    this.dom = null;
    this.jaugeDom = null;
    this.selectDom = null;

    this.graphicDom = null;
    this.turretDom = null;
    this.rotorDom = null;

    /*
     * Attack
     */
    this.target = null;

    // Weapons // bug if in the prototype ... ?
//    this.weapons = [];
//    this.weaponsTypeFire = [];

    /*
     * Methods
     */


    this.setId = function(id){
        this.id = id;
    };

    this.getId = function(){
        return this.id;
    };

    this.setPosition = function(x,y){
        this.x = x;
        this.y = y;
    };

    this.getPosition = function(){
        return {
            x: this.x,
            y: this.y
            };
    };

    /**
     * Init the unit object
     * @param {Number} x
     * @param {Number} y
     * @param {OBJECTS.team} team
     * @param {String} unitType
     * @param {Object} options
     * @author Lixus3d <developpement@adreamaline.com>
     * @date 20 nov. 2011
     */
    this.init = function(x,y,team,unitType,options){

    };

    /**
     * Initialize item weapons from the item vars
     */
    this.initWeapon = function(){

    };

    /**
     * Add a weapon to the item weapons
     */
    this.addWeapon = function(weapon){

    };


    this.draw = function(){
    };

    /**
     * Fire every weapons at a target
     * @param {RTSitem} target
     */
    this.fire = function(target){

    };

    /**
     * Triggered when the unit is touch and lose an amount of life
     * @param {number} amount
     */
    this.touched = function(amount){

    };


    /**
     * Indicate whether a position is inSight or not
     * when the unit stop, the maxSight is potentially maximize ( give advantage to fix item with same weapon )
     * @param {posObject} position
     */
    this.inSight = function(position){

    };

    /**
     * References the enemy actually inSight and returns the better for the sortKillingList function
     * @returns {Boolean|RTSitem}
     */
    this.enemyInSight = function(){

    };

    /**
     * Attack a particular target
     * TODO : Check if the target is still insight
     * @param {RTSitem} target
     */
    this.attack = function(target){

    };



    this.toString = function(){return 'itemAbstract';};
};
