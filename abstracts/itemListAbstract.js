/**
 * RTSitem list abstract
 * @returns {OBJECTS.items}
 * @author Lixus3d <developpement@adreamaline.com>
 * @date 20 nov. 2011
 */

ABSTRACTS.itemListAbstract = function(OpenSpaceObject){

    var items = this;

    items.OpenSpace = null;

    items.list = [];  // list of item
    items.list = {};
    items.listLength = 0;

    //items.idList = [];


    this.init = function(OpenSpaceObject){
        items.OpenSpace = OpenSpaceObject;
    };

    /**
     * Add a item to the items list and activate the item
     * @param {RTSitem} item
     */
    this.addItem = function(item){

        if(item.getId()===0){
            uid = items.generateId();
            item.setId(uid);
        } else uid = item.getId();

        items.list[uid] = item;
        items.listLength++;

		// add item to the list
		//this.list.push(item);
		// compute itemId
		//itemId = this.list.length-1;
		// set the itemId
        //item.setId(itemId);
        // push the id to the idList
        //this.idList.push(itemId);

        item.activate();
    };

    this.generateId = function(){
        var uid = Math.random()*100+':'+Math.random()*100;
        return uid;
    }

    /**
     * Kill a item, update the list, update the current selection
     * @param {number} itemId
     */
    this.killItem = function(itemId){

        // get normal list position
        if( items.list[itemId] !== undefined){
            delete items.list[itemId];
            items.listLength--;
        }
        /*
        var index = this.idList.indexOf(itemId);
        if(index!=-1){
            this.list.splice(index,1);
            this.idList.splice(index,1);
        }
         */
    };

    /**
     * Return a item by its Id
     */
    this.getItemById = function(itemId){
        if(items.list[itemId] !== undefined ) return items.list[itemId];
        return null;
    };

    /**
     * Execute every item tick when tick is triggered by the motor tick
     */
    this.tick = function(){
        //log(items.list);
        for( uid in items.list){
            items.list[uid].tick();
        }
        /*
        $.each(items.list,function(k,item){
            if(item){
                item.tick();
            }
        });
         */
    };

    this.init(OpenSpaceObject);
};
