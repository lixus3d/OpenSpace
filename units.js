/**
 * Units list
 * @returns {OBJECTS.units}
 * @author Lixus3d <developpement@adreamaline.com>
 * @date 20 nov. 2011
 */

OBJECTS.units = function(){

    var units = this;

    /**
     * Add a unit to the units list and activate the unit
     */
    units.addUnit = this.addItem;

    /**
     * Kill a unit, update the list, update the current selection
     */
    units.killUnit = this.killItem;


};

OBJECTS.units.prototype = new ABSTRACTS.itemListAbstract();