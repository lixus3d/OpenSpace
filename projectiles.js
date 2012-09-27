/**
 * Units list
 * @returns {OBJECTS.units}
 * @author Lixus3d <developpement@adreamaline.com>
 * @date 20 nov. 2011
 */

OBJECTS.projectiles = function(){

    var projectiles = this;

    /**
     * Add a projectile to the projectiles list and activate the unit
     */
    projectiles.addProjectile = this.addItem;

    /**
     * Destroy a projectile, update the list, update the current selection
     */
    projectiles.killProjectile = this.killItem;

};

OBJECTS.projectiles.prototype = new ABSTRACTS.itemListAbstract();